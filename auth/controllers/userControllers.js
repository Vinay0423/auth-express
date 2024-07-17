import bcrypt from 'bcryptjs'
import userSchema from '../models/userSchema.js'
import jwt from 'jsonwebtoken'

//signup

export const signup = async (req, res, next) => {

   const { name, email, password, confirmPassword } = req.body

   try {
      let existingEmailId = await userSchema.findOne({ email })
      if (existingEmailId) {
         return res.status(400).json("user exists already")
      }

      //creating new user
      let newUser = await userSchema.create({
         name, email, password, confirmPassword
      })

      //to create a json web token
      let token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
         expiresIn: 24 * 60 * 60
      })

      //projecting only required fields
      let user = await userSchema.findById(newUser._id).select("-password -confirmPassword")

      //   res.status(200).json(newUser)
      res.status(201).json({ user, token })
   } catch (error) {
      res.status(400).json(error.message)
   }


}


export const login = async (req, res, next) => {
   const { name,email, password,} = req.body
   try {
      let existingEmailId = await userSchema.findOne({ email })

      if (existingEmailId) {

         const pwd= await userSchema.findOne({email})
        
         bcrypt.compare(password, pwd.password, function(err, isres) {
            if(err) res.status(401).json(err.message)

               if(isres===true){
                  res.status(200).json('pwd matched')
               } else{
                  res.status(401).json('pwd not matched')
               }
           console.log(isres);
          
        });

      } else {
         res.status(400).json("Please register to use.")
      }


   } catch (error) {
      res.status(400).json(error.message)
   }
}
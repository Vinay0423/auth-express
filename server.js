import http from 'http';
import app from './app.js'

let server= http.createServer(app)
let PORT= process.env.PORT

server.listen(PORT, err=> {
    if(err) console.log(err);
    console.log(`Server is running in ${PORT}`);
})
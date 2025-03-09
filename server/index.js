import express, { request, response } from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import UserRoute from './routes/user-route.js'
import AuthRoute from './routes/auth-route.js'
import PostRoute from './routes/post-route.js'

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
   origin: (origin, callback) => {
      callback(null, true);
   },
   credentials: true
}));

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('public'))

app.use(UserRoute);
app.use(AuthRoute);
app.use(PostRoute);

app.listen(3000, () => console.log("Server running..."));
app.get('/', (request, response) => {
   response.send("Hello from express!")
})
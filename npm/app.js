import express from 'express';
import postRouter from './router/post.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';


const app = express();

//  body 부분에 해당하는것을 얻어온다.
app.use(express.json());

// 쿠키 데이터를 얻어온다.
app.use(cookieParser);

// HTML Form 데이터를 얻어온다.
app.use(express.urlencoded({extended:false}));

// public이라는 폴더에 자동으로 접근가능하게 만든다.
app.use(express.static("public"));

// 보안 설정
app.use(helmet());

// cors 설정
const corsOption = {
    orgin: ['http://localhost:3000'],
}
app.use(cors(corsOption))


app.use('/posts', postRouter);

app.listen(8080);




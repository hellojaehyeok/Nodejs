import express from "express";
import 'express-async-errors';
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import tweetRouter from './router/tweets.js'

// 미들웨어 
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

// 라우터 연결
app.use("/tweets", tweetRouter);


// 찾을수 없는 api일때 
app.use((req, res, next) => {
    res.sendStatus(404);
});

// 에러처리
app.use((error, req, res, next) => {
    console.error(error)
    res.sendStatus(500);
});

app.listen(8080);
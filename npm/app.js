import express from 'express';
const app = express();

app.get("/test/:id", ( req, res, nex) => {
    console.log(req.params) // :id 에 속하는 부분
    console.log(req.query) // 
    res.send("hello")
});
app.listen(8080);
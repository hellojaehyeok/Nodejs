import express from "express";
import 'express-async-errors';

// 테스트 데이터
let tweets = [
    {
        id:"1",
        text:"재혁 채팅 1",
        createdAt: Date.now().toString(),
        name:"sjh",
        username:"sjh",
        url:"https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
    },
    {
        id:"2",
        text:"솔 채팅 1",
        createdAt: Date.now().toString(),
        name:"sol",
        username:"sol",
        url:"https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
    },
]

const router = express.Router();

// 쿼리로 유저의 이름이 들어오면 filter함수로 해당 유저만 가져오고 아니면 모두 다 가져온다.
router.get('/', (req, res, next) => {
    const username = req.query.username;
    const data = username
    ? tweets.filter(e => e.username == username)
    :
    tweets;

    res.status(200).json(data);
});

// params로 아이디가 들어오면 find함수로 해당 데이터를 찾고 아니면 404에러를 보낸다.
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweets.find(e => e.id == id);
    tweet
    ?
    res.status(200).json(tweet)
    :
    res.status(404).json({msg:`id(${id})를 찾을수 없음`});
});

// body에 있는 데이터를 받아와 tweets에 추가한다.
router.post("/", (req, res, next) => {
    const { text, name, username } = req.body;
    const tweet = {
        id:Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username,
    };
    tweets = [tweet, ...tweets];
    res.status(201).json({msg:"tweet 추가 성공", content:tweet});
})

router.put("/:id", (req, res, next) => {
    const id = req.params.id;
    const newText = req.body.text;
    let tweet = tweets.find(e=>e.id==id);
    if(tweet){
        tweet.text = newText;
        res.status(200).json({msg:"tweet 수정 성공", content:tweet});
    }else{
        res.status(404).json({msg:`id(${id})를 찾을수 없음`});
    }
})

router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    tweets = tweets.filter(e=>e.id!==id);
    res.status(200).json({msg:"tweet 삭제 성공"});
})


export default router
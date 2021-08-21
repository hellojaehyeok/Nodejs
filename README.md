# Nodejs
Node.js 정리 

## npm 시작

기본적인 정보들이 저절로 입력          

    npm init --yes 

원하는 정보들을 순차적으로 입력

    npm init --yes 

## 설치된 라이브러리 삭제 

    npm un --라이브러리이름--
    npm uninstall --라이브러리이름--

## type module
package.json

    "type": "module",


## nodemon
파일이 변경되면 자동으로 재시작한다.          
개발할 때만 필요하기 때문에 --save-dev를 뒤에 붙인다.          

    npm i nodemon --save-dev

nodemon으로 app을 실행하기 위하여 package.json에          
node app이 아닌 nodemon app으로 바꿔준다.          

    "scripts": {
        "start": "nodemon app" 
        ...
    },

npm start가 아닌 nodemon app으로 시작한다.          

    nodemon app

## process
노드가 동작하는 프로세스 정보를 가져온다.          
          
process.argv -> 시작 시 실행 경로, 인자들을 받아온다.          
          
process.nextTick(() => {---}) -> 현재 수행되고 있는 코드가 완료된 다음 태스크 큐에다가 넣는다.          
          
## os
노드가 동작하는 운영체제 정보를 가져온다.          

    const os = require('os');


os.homedir() -> 기본 디렉토리를 받아온다.          


## path
파일의 경로에 접근하거나 경로에 대해 무언가를 처리할 때 사용한다.          

    const path = require('path');


path.join(os.homedir()) -> 인자로 받은 경로에 접근한다.          
(여러 가지 인자를 전달하면 자동으로 묶어서 전달해 준다.)           
          
path.basename( file ) -> file의 정보만 읽어온다.           
path.basename( file , ".js") -> file의 확장자를 제거하고 이름만 가져온다.           
          
path.extname( file , ".js") -> file의 확장자를 가져온다.           



## fs
사용자의 파일에 접근하고 싶을 때 사용한다.          

    const fs = require('fs');


총 세 가지 타입이 있다          
1. fs.rename(oldPath, newPath, console.error);          
 -> rename(예전경로, 새로운경로, 에러콜백);          


2. fs.renameSync(oldPath, newPath);          
 -> renameSync는 에러 콜백을 받지 않는다.          
 그렇기에 try catch를 이용해야 한다.          

    try{
        fs.renameSync(oldPath, newPath);
    }catch (error){
        consol.error(error);
    }
 

3. fs.promises.rename(oldPath, newPath).then().catch();            
fs의 promises를 활용하여 rename을 한다.          
          
exists(파일경로) -> 해당 경로가 존재하는지 판단한다.          
          
mkdir(파일경로) -> 해당 경로에 파일을 만든다.          
          
readdir(파일경로) -> 경로에 있는 파일들을 읽어온다.          
          


## express
express 설치

    npm i express

express 시작

    // express import
    import express from 'express';
    const app = express();

    // get method
    app.get("/test/:id", ( req, res, next) => {
        // http://localhost:8080/test/hi?keyword=song
        // { id: 'hi' }
        console.log(req.params) 
        // { keyword: 'song' }
        console.log(req.query) 

        // 클라이언트에게 정보를 보낸다.
        res.send("hello")
    });
    
    // 8080포트로 서버를 실행한다.
    app.listen(8080);



## cors
cors에러 -> 서버에서 허용하지 않은 도메인에서 서버통신을 하려할때 나타난다.             
cors에러를 해결하기 위하여 cors를 다운받는다.            

    npm i cors

그후 아래 코드를 app.js에 사용한다.

    import cors from 'cors';

    app.use(cors({
        orgin: ['도메인 주소'],
        
    }));

## cookie-parser  
body를 보려면 express.json()를 써야 하듯이            
쿠키를 보려면 cookie-parser를 사용하여야 한다.            

    npm i cookie-parser

    app.use(cookieParser);
    
## helmet
보안 설정

    npm i helmet

    app.use(helmet());
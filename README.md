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


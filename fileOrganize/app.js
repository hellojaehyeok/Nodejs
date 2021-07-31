const path = require('path');
const os = require('os');
const fs = require('fs');

// nodemon app test
// nodemo app을 실행하면서 원하는 파일명(test)을 전달한다. test는 즉 인자다) 

// process.argv - 시작시 실행 경로, 인자들을 받아온다.
const folder = process.argv[2];

// os.homedir() - 현재 플랫폼의의 기본 디렉토리를 가르킨다..
// path.join() - 경로를 설정하여 준다 ( 플랫폼별로 구분자가 달라진다. ) 
const workingDir = path.join(os.homedir(), "Pictures", folder);

// 만약 인자가 없거나 해당경로에 test(인자)파일이 없으면 조건문을 실행한다.
if(!folder || !fs.existsSync(workingDir)){
    console.error('please enter folder name in picture');
    return;
}

console.log(workingDir);


const path = require('path');
const os = require('os');
const fs = require('fs');

// nodemon app test
// nodemo app을 실행하면서 원하는 파일명(test)을 전달한다. test는 즉 인자다) 

// process.argv - 시작시 실행 경로, 인자들을 받아온다.
const folder = process.argv[2];

// os.homedir() - 현재 플랫폼의의 기본 디렉토리를 가르킨다..
// path.join() - 경로를 설정하여 준다 ( 플랫폼별로 구분자가 달라진다. ) 
// 작업을 실행 할 디렉토리를 연결한다.
const workingDir = path.join(os.homedir(), "Pictures", folder);

// 만약 인자가 없거나 해당경로에 test(인자)파일이 없으면 조건문을 실행한다.
if(!folder || !fs.existsSync(workingDir)){
    console.error('please enter folder name in picture');
    return;
}

// test라는 폴더안에 video, captured, duplicated라는 폴더를 만든다.
// join으로 파일경로에 접근
const videoDir = path.join(workingDir, 'video'); 
const capturedDir = path.join(workingDir, 'captured'); 
const duplicatedDir = path.join(workingDir, 'duplicated'); 

// 설정한 경로에 해당하는 파일이 없다면 파일을 만든다.
// existsSync 파일이 있는지 체크한다.
// mkdirSync 파일을 만든다. Sync 동기를 사용한 이유는 폴더를 만든 후 처리를 해야하기 때문이다.
fs.existsSync(videoDir) || fs.mkdirSync(videoDir);
fs.existsSync(capturedDir) || fs.mkdirSync(capturedDir);
fs.existsSync(duplicatedDir) || fs.mkdirSync(duplicatedDir);

const processFiles = files => {
    files.forEach(file => {
        if(isVideo(file)){
            move(file, videoDir)
        }else if(isCaptured(file)){
            move(file, capturedDir)
        }else if(isDuplicated(files, file)){
            move(file, duplicatedDir)
        } 
    })
}

// !! 값이 있다면 true, 없다면 false
const isVideo = file => {
    const regExp = /(mp4|mov)$/gm;
    const match = file.match(regExp);
    return !!match;
}
const isCaptured = file => {
    const regExp = /(png|aae)$/gm;
    const match = file.match(regExp);
    return !!match;
}
const isDuplicated = (files, file) => {
    // IMG_ 는 duplicated 파일로 넘기고 IMG_E 는 남긴다.
    // IMG_ 로 시작하지 않거나 IMG_E로 시작하면 조건문 실행 
    if(!file.startsWith("IMG_") || file.startsWith("IMG_E")){
        return false;
    }

    // split("_")를 사용하여 _를 기준으로 나눈 후 뒤 이름을 가져온다.
    // IMG_1234 => 1234
    const edited = `IMG_E${file.split("_")[1]}`
    // files.find() 로 하나씩 돌며 비교한다.
    // edited와 같으면 참을 반환한다.
    const found = files.find(f => f.includes(edited));
    return !!found;
}

const move = (file, newFileDir) => {
    // 예전경로와 옮겨질 경로를 설정한다.
    const oldPath = path.join(workingDir, file);
    const newPath = path.join(newFileDir, file);
    
    fs.promises
    .rename(oldPath, newPath) //
    .catch(console.error);
}

// readdir 경로안에있는 파일들을 다 읽어온다. 
fs.promises
.readdir(workingDir) // 
.then(processFiles)
.catch(console.log)


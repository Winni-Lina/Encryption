let save_board = [];
let point_answer = [];
let save_how = [];

function Encryption(){
    let key = document.getElementById('key').value.toLowerCase();
    let sentence = document.getElementById('sentence').value.replace(/ /gi,"").toLowerCase();
    let text = document.getElementById('text');
    let result = document.getElementById('result');
    let btn = document.getElementById('btn');
    let div_table = document.getElementById('div_table');
    

    btn.disabled = true;
    div_table.style.opacity='0%';

    // pw board 만들기
    let board = MakePwBoard(key);
    save_board = board

    // sentence 변환
    let text_list = SentenceToList(sentence);
    text.innerHTML = text_list.join(" ");

    // 암호화
    result.innerHTML = MakePw(board, text_list).join(' ')
    
    btn.disabled = false;
}

function MakePwBoard(key){
    let array = key.split('')
    let eng = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y'];
    let temp = [];
    let board = [];
    let key_result = [...new Set(array.concat(eng))];   // 암호판을 만들기 위한, 값 초기화 (암호키와 알파벳들을 합친 후, 중복된 글자 제거)

    for (let a in key_result){                          // 암호판 생성 (temp로 배열 하나를 만들고, 그 배열을 board에 추가함(2차원 배열) )
        temp.push(key_result[a]);
        if (temp.length == 5){
            board.push(temp);
            temp = [];
        }
    }
    return board
}

function SentenceToList(sentence){
    let new_text = sentence[0];
    let text_list = [];

    for (let i = 1; i<sentence.length; i++){            // 띄어쓰기 제거, 중복 값 사이 x 넣기 (이전 값이 현재 값과 같을 경우 x 추가)
        if (sentence[i]==sentence[i-1]){
            new_text += 'x' + sentence[i];
        }else{
            new_text += sentence[i];
        }
    }
    if (new_text.length%2== 1){                         // 길이가 홀수면 뒤에 x 추가 (두 글자씩 나눌 때, 한 글자만 남지않기 위함)
        new_text+='x';
    }
    for (let i = 1; i<new_text.length; i+=2){           // 글자를 두 글자씩 나눔
        text_list.push(new_text.substr(i-1, 2));
    }

    return text_list                                    // 두 글자씩 나눈 리스트를 리턴
}

function MakePw(board, sentence){
    let pw = [];
    let x1, y1, x2, y2;
    point_answer = [];
    save_how = [];

    for (let i in sentence){
        let words = sentence[i];
        
        for(let line in board){

            if(board[line].indexOf(words[0]) > -1){
                x1 = parseInt(line);
                y1 = board[line].indexOf(words[0]);
            }
            if(board[line].indexOf(words[1]) > -1){
                x2 = parseInt(line);
                y2 = board[line].indexOf(words[1]);
            }
        }
        save_how.push([[x1,y1], [x2,y2]]);
        if(x1 == x2){
            if (y1+1>=board[0].length){
                y1=0
            }else{
                y1+=1
            }
            if (y2+1>=board[0].length){
                y2=0
            }else{
                y2+=1
            }
            point_answer.push([[x1,y1], [x2,y2]]);
            pw.push([board[x1][y1]+board[x2][y2]]);
            continue;
        }else if(y1 == y2){
            if (x1+1>=board.length){
                x1=0
            }else{
                x1+=1
            }
            if (x2+1>=board.length){
                x2=0
            }else{
                x2+=1
            }
            point_answer.push([[x1,y1], [x2,y2]]);
            pw.push([board[x1][y1]+board[x2][y2]]);
            continue;
        }
        point_answer.push([[x2,y1], [x1,y2]]);
        pw.push([board[x2][y1]+board[x1][y2]]);
        
    }
    return pw;
}


function Decryption(){
    let key = document.getElementById('key').value.toLowerCase();
    let sentence = document.getElementById('sentence').value.toLowerCase();
    let text = document.getElementById('text');
    let result = document.getElementById('result');
    let btn = document.getElementById('btn');
    let div_table = document.getElementById('div_table');
    

    btn.disabled = true;
    div_table.style.opacity='0%';
    // pw board 만들기
    let board = MakePwBoard(key);
    save_board = board

    // pw_sentence 변환
    let text_list = PwSentenceToList(sentence);

    // 복호화
    
    result.innerHTML =MakeSentence(board, text_list).join('') 
    
    btn.disabled = false;
}

function PwSentenceToList(sentence){
    let text_list = [];
    text_list = sentence.split(' ');

    return text_list                                    // 두 글자씩 나눈 리스트를 리턴
}

function MakeSentence(board, sentence){
    let temp = [];
    let pw = [];
    let x1, y1, x2, y2;
    point_answer = [];
    save_how = [];

    for (let i in sentence){
        let words = sentence[i];
        
        for(let line in board){

            if(board[line].indexOf(words[0]) > -1){
                x1 = parseInt(line);
                y1 = board[line].indexOf(words[0]);
            }
            if(board[line].indexOf(words[1]) > -1){
                x2 = parseInt(line);
                y2 = board[line].indexOf(words[1]);
            }
        }
        save_how.push([[x1,y1], [x2,y2]]);

        if(x1 == x2){
            if (y1-1<0){
                y1=board[0].length-1
            }else{
                y1-=1
            }
            if (y2-1<0){
                y2=board[0].length-1
            }else{
                y2-=1
            }
            point_answer.push([[x1, y1], [x2, y2]]);
            temp.push([board[x1][y1]+board[x2][y2]]);
            continue;
        }else if(y1 == y2){
            if (x1-1<0){
                x1=board.length-1
            }else{
                x1-=1
            }
            if (x2-1<0){
                x2=board.length-1
            }else{
                x2-=1
            }
            point_answer.push([[x1, y1], [x2, y2]]);
            temp.push([board[x1][y1]+board[x2][y2]]);
            continue;
        }
        point_answer.push([[x2, y1], [x1, y2]]);
        temp.push([board[x2][y1]+board[x1][y2]]);
        
    }

    new_sentence = temp.join('')
    pw.push(new_sentence[0]);
    for(let index = 1; index<new_sentence.length-1; index++){
        if (new_sentence[index-1] == new_sentence[index+1]){
            console.log(new_sentence[index-1], new_sentence[index+1]);
            if(new_sentence[index] == 'x'){
                continue;
            }
        }
        console.log(new_sentence[index]);
        pw.push(new_sentence[index]);
    }
    if (new_sentence[new_sentence.length-1] != 'x') pw.push(new_sentence[new_sentence.length-1]);
    

    return pw;
}

function show_board(){
    let div = document.getElementById('div_table');
    let view_table = document.getElementById('table');
    let table = "<table style='width: 100%; height: 100%; border-spacing: 0px; padding: 0px;' border='1'>";
    let page = document.getElementById('page');
    
    for (let i = 0; i<save_board.length; i++){
        table += "<tr align = 'center'>" 
        for(let l = 0; l<save_board[0].length; l++)[
            table += `<td class='${i} ${l}'>`+save_board[i][l]+"</td>"
        ]
        table += "</tr>"
    }
    table += "</table>"

    view_table.innerHTML = table;
    div.style.opacity = '100%';
}

function click_next(){
    show_board();

}
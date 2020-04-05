let canvas;
let c;

//in-game variables
let ballRadius = 8;
let ball_x = 50;
let ballSpeed_x = 10;
let ball_y = 50;
let ballSpeed_y = 10;

const PADDLE_HEIGHT = 100;
let leftPaddle_y = 250;
let rightPaddle_y = 250;

let leftPlayerScore = 0;
let rightPlayerScore = 0;

const WINNING_SCORE = 3;
let winScreen = false;

function calculateMouseMovePosition(evt){
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouse_x = evt.clientX - rect.left - root.scrollLeft;
    let mouse_y = evt.clientY - rect.top - root.scrollTop;

    return{
        x: mouse_x,
        y: mouse_y
    }
}

function handleWin(){
    if(winScreen){
        leftPlayerScore = 0;
        rightPlayerScore = 0;
        winScreen = false;
    }
}

function leftPaddleMove(evt){
    let mousePosition = calculateMouseMovePosition(evt);
    leftPaddle_y = mousePosition.y - (PADDLE_HEIGHT / 2);
}

window.onload = function(){
    canvas = document.querySelector('canvas');
    c = canvas.getContext('2d'); 
        
    let framesPerSecond = 30;
    let frameRate = canvas.width / framesPerSecond;

    this.setInterval(function(){
        movement();
        draw();
    }, frameRate);

    canvas.addEventListener('mousemove', leftPaddleMove);
    canvas.addEventListener('mousedown', handleWin);

}

function ballReset(){
    if(leftPlayerScore >= WINNING_SCORE ||
        rightPlayerScore >= WINNING_SCORE){
            winScreen = true;
        }
    ballSpeed_x = -ballSpeed_x;
    ball_x = canvas.width / 2;
    ball_y = canvas.height / 2;
}

function computerMove(){
    let rightPaddleCenter = rightPaddle_y + (PADDLE_HEIGHT / 2);
    if(rightPaddleCenter < ball_y - 40){
        rightPaddle_y += 8;
    }
    else if(rightPaddleCenter > ball_y + 40){
        rightPaddle_y -= 8;
    }
}

function movement(){
    if(winScreen){
        return;
    }
    let delta_y;
    ball_x += ballSpeed_x;
    ball_y += ballSpeed_y;

    computerMove();

    if((ball_x + ballRadius) > canvas.width){
        if(ball_y > rightPaddle_y && ball_y < (rightPaddle_y + PADDLE_HEIGHT)){
            ballSpeed_x = -ballSpeed_x;
            delta_y = ball_y - (rightPaddle_y + PADDLE_HEIGHT / 2);
            ballSpeed_y = delta_y * 0.35;
        }
        else{
            leftPlayerScore++;
            ballReset();
        }
    }
    else if((ball_y + ballRadius) > canvas.height){
        ballSpeed_y = -ballSpeed_y;
    }

    if((ball_x - ballRadius) < 0){
        if(ball_y > leftPaddle_y && ball_y < (leftPaddle_y + PADDLE_HEIGHT)){
            ballSpeed_x = -ballSpeed_x;
            delta_y = ball_y - (leftPaddle_y + PADDLE_HEIGHT / 2);
            ballSpeed_y = delta_y * 0.35;
        }
        else{
            rightPlayerScore++;
            ballReset();
        }
    }
    else if((ball_y - ballRadius) < 0){
        ballSpeed_y = -ballSpeed_y;
    }
}

function drawNet(){   
    for(let i = 0; i < canvas.height - 39; i += 34.5){        
        drawRect(canvas.width / 2 -1, i + 10, 2, 28, 'white');
    }
}


function draw(){
    let center = 450;

    //turf    
    drawRect(0, 0, canvas.width, canvas.height, 'green');
    
    c.beginPath()
    c.strokeStyle = 'white';
    drawLine(10, 10, canvas.width - 10, 10);
    drawLine(canvas.width - 10, 10, canvas.width - 10, canvas.height - 10);
    drawLine(canvas.width - 10, canvas.height - 10, 10, canvas.height - 10);
    drawLine(10, canvas.height - 10, 10, 10);
    c.stroke()
    

    if(winScreen){
        c.fillStyle = 'white';
        if(leftPlayerScore >= WINNING_SCORE){
            c.fillText('Left Player Won!!!', center, 100);
        }
        else if(rightPlayerScore >= WINNING_SCORE){
            c.fillText('Right Player Won!!!', center, 100);
        }
        c.fillText('click to reset game', center, 400);
        return;
    }


    //paddles   
    drawRect(2, leftPaddle_y, 10, PADDLE_HEIGHT, 'white');
    drawRect(canvas.width - 12, rightPaddle_y, 10, PADDLE_HEIGHT, 'white')

    //players score
    c.fillText(leftPlayerScore, 100, 100);
    c.fillText(rightPlayerScore, canvas.width - 100, 100);

    drawNet()   

    //center
    drawCircle(canvas.width / 2, canvas.height / 2, 80,'green', 'white'); 

    //ball    
    drawCircle(ball_x, ball_y, ballRadius,'white', 'white');   
   
}

function drawLine(from_x, from_y, to_x, to_y){
    c.moveTo(from_x, from_y);
    c.lineTo(to_x, to_y);    
}

function drawCircle(center_x, center_y, radius, fillcolor, lineColor){    
    c.beginPath();   
    c.strokeStyle = lineColor;
    c.fillStyle = fillcolor; 
    c.arc(center_x, center_y, radius, 0, Math.PI * 2, true);
    c.fill();    
    c.stroke();
}

function drawRect(left_x, top_y, width, height, fillColor, lineColor){
    c.strokeStyle = lineColor;
    c.fillStyle = fillColor;
    c.fillRect(left_x, top_y, width, height);
}
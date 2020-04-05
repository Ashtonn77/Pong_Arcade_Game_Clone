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

}

function ballReset(){
    
}


function movement(){
    ball_x += ballSpeed_x;
    ball_y += ballSpeed_y;

    if((ball_x + ballRadius) > canvas.width){
        ballSpeed_x = -ballSpeed_x;
    }
    else if((ball_y) > canvas.height){
        ballSpeed_y = -ballSpeed_y;
    }

    if((ball_x - ballRadius) < 0){
        ballSpeed_x = -ballSpeed_x;
    }
    else if((ball_y) < 0){
        ballSpeed_y = -ballSpeed_y;
    }
}


function draw(){

    //turf
    c.fillStyle = 'green';
    c.fillRect(0, 0, canvas.width, canvas.height);

    //paddles
    c.fillStyle = 'white';
    c.fillRect(2, leftPaddle_y, 10, PADDLE_HEIGHT);
    c.fillRect(canvas.width - 12, rightPaddle_y, 10, PADDLE_HEIGHT)


    //ball
    c.fillStyle = 'white';
    c.beginPath();    
    c.arc(ball_x, ball_y, ballRadius, 0, Math.PI * 2, true);
    c.fill();

}
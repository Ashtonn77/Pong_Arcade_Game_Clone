let canvas;
let c;

//in-game variables
let ballRadius = 8;
let ball_x = 50;
let ballSpeed_x = 10;
let ball_y = 50;
let ballSpeed_y = 10;

const PADDLE_HEIGHT = 100;

window.onload = function(){
    canvas = document.querySelector('canvas');
    c = canvas.getContext('2d'); 
        
    let framesPerSecond = 30;
    let frameRate = canvas.width / framesPerSecond;

    this.setInterval(function(){
        movement();
        draw();
    }, frameRate);

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
    c.fillRect(2, 100, 10, PADDLE_HEIGHT);
    c.fillRect(canvas.width - 12, 100, 10, PADDLE_HEIGHT)


    //ball
    c.fillStyle = 'white';
    c.beginPath();    
    c.arc(ball_x, ball_y, ballRadius, 0, Math.PI * 2, true);
    c.fill();

}
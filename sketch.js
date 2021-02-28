let w = 630;
let h = 400;
let box;
let ball;
let player;
let ballSize = 20;
let playerSize = 20;
let start = false;
let plates = [];
let cols = w/30;
let rows = (h/2)/10;
let msg = document.querySelector("h1");

function setup()
{
    let myCanvas = createCanvas(w, h);
    myCanvas.parent("canvas");

    ball = new Ball(width, height, ballSize);
    player = new Player( (width / 2) - (playerSize/2 * 5.5), height - playerSize, playerSize);
    

    for(let i = 0; i < 40; i++)
    {
        let x = floor(random(cols)) * 30;
        let y = floor(random(rows)) * 10;
        let h = floor(random(3)) + 1;
        plates.push(new Plate(x, y, 30, 10, h));
    }
}

function draw()
{
    background(50, 100);
    
    ball.show();
    ball.update();
    player.display();

    for(let i = plates.length - 1; i >= 0; i--)
    {
        plates[i].show();
        if(plates[i].kill(ball))
        {
            if(plates[i].health <= 0)
                plates.splice(i,1);
        }
    }
    
    if(ball.y >= height - (playerSize * 1.5) && start === true)
    {
        player.hits(ball);
    }  
    
    if(ball.y > height + ballSize / 2)
    {
        msg.style.visibility = "visible";
        noLoop();
        reset();
    }
}

function reset()
{
    start = false;
    ball.xspeed = 0;
    ball.yspeed = 0;
    ball = new Ball(width, height, ballSize);
    player = new Player( (width / 2) - (playerSize/2 * 5.5), height - playerSize, playerSize);
    
}
function keyPressed()
{
    if(start === false &&  keyCode === RETURN)
    {
        ball.xspeed = 0;
        ball.yspeed = -1.5;
        start = true;
        msg.style.visibility = "hidden";
        msg.innerHTML = "Press Space to try Again";
    }
    if(keyCode === RIGHT_ARROW)
    {
        player.update(1);
        if(start === false)
        {
            ball.x = ball.x + playerSize/2;
        }
    }else if(keyCode === LEFT_ARROW)
    {
        player.update();
        if(start === false)
        {
            ball.x = ball.x - playerSize/2;
        }
    }
}

function keyTyped()
{
    if(key === " ")
    {
        loop();
        msg.style.visibility = "hidden";
    }
}


class Box {

    constructor(x, y, w, h, health)
    {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.health = health;
        
        
    }


    show()
    {   
        let c1;
        switch(this.health)
        {
            case 1: c1 = color(217,0,0); break;
            case 2: c1 = color(217,65,0); break;
            case 3: c1 = color(217,110,0); break;
            default : c1 = color(255);
        }
        fill(c1);
        rect(this.x, this.y, this.width, this.height);
    }

    kill(ball)
    {
        

            let c1 = dist(this.x, this.y, ball.x, ball.y);
            let c2 = dist((this.x + this.width), this.y, ball.x, ball.y);
            let c3 = dist(this.x, (this.y + this.height), ball.x, ball.y);
            let c4 = dist((this.x + this.width),(this.y + this.height), ball.x, ball.y);

            if(ball.x - (ball.size / 2) >= this.x && ball.x + (ball.size / 2) <= this.x + this.width )
            {
                if(ball.y + (ball.size / 2) >= this.y && ball.y - (ball.size / 2) <= this.y + this.height)
                {
                    this.health--;
                    if(ball.x <= this.x || ball.x >= (this.x + this.width))
                    {
                        ball.xspeed = -(ball.xspeed);
                    } else
                    {
                        ball.yspeed = -(ball.yspeed);
                    }
                    return true;
                    
                }
            }

            if (( c1 <= ball.size / 2) || (c2 <= ball.size / 2) || (c3 <= ball.size / 2) || (c4 <= ball.size / 2) )
            {
                this.health--;
                if(ball.x <= this.x || ball.x >= (this.x + this.width))
                    {
                        ball.xspeed = -(ball.xspeed);
                    } else
                    {
                        ball.yspeed = -(ball.yspeed);
                    }
                return true;
            }
        
        
    }

}

class Plate extends Box {

     
     constructor(x, y, w, h, health)
     {
        super(x, y, w, h);
        this.health = health;
     } 

}

class Player {
    
   
    constructor(x, y, size)
    {
        this.x = x;
        this.y = y;
        this.h = size;
        this.w = size / 2;
        this.parts = [];
        
       
        for( let i = 0; i < 11; i++)
        {
            this.parts.push(new Box(this.x, this.y, this.w, this.h, 10));
            this.x = this.x + this.w;
        }
    }

   display()
   {
       
        for( let i = 0; i < this.parts.length; i++)
        {
           this.parts[i].show();
        }   
   }

   update(dir)
   {
        if(dir)
        {
            if(this.parts[this.parts.length - 1].x < width - this.w)
            {
                this.x = this.parts[this.parts.length - 1].x + this.w;
                this.parts.shift();
                this.parts.push(new Box(this.x, this.y, this.w, this.h));
            }
            
        }
        else
        {
            if(this.parts[0].x > 0)
            {
                this.x = this.parts[0].x - this.w;
                this.parts.pop();
                this.parts.unshift(new Box(this.x, this.y, this.w, this.h));
            }
        }
    }

    hits(ball)
    {
        let i;
        let flag = false;

        for(i = 0; i < this.parts.length; i++)
        {
            
           if(ball.x >= this.parts[i].x && ball.x <= this.parts[i].x + this.w)
           {
                ball.yspeed = -(ball.yspeed);
                
                flag = true;
                break;
           }
        }
        if(flag === true)
        {
            console.log(i);
            switch(i)
            {
                case 0 : ball.xspeed = -2.8; break; 
                case 1 : ball.xspeed = -2.2; break;
                case 2 : ball.xspeed = -1.6; break;
                case 3 : ball.xspeed = -1; break;
                case 4 : ball.xspeed = -.4; break;
                case 5 : ball.xspeed = 0; break;
                case 6 : ball.xspeed = .4; break;
                case 7 : ball.xspeed = 1; break;
                case 8 : ball.xspeed = 1.6; break;
                case 9 : ball.xspeed = 2.2; break;
                case 10 : ball.xspeed = 2.8; break;
                default :;
            }
        }
        
        
    }
}

class Ball {
 

    constructor(width, height, size)
    {
        this.x = width / 2;
        this.y = height - (1.5 * size); 
        this.yspeed = 0;
        this.xspeed = 0;
        this.size = size;
    }
    

    show()
    {
        fill(0,255,0);
        ellipse(this.x, this.y, this.size , this.size);
    }

    update()
    {
        this.x += this.xspeed;
        this.y += this.yspeed; 

        this.x = constrain(this.x, this.size / 2, width - (this.size / 2));
        this.y = constrain(this.y, this.size / 2, height + this.size*2);

        if(this.x == this.size/2 || this.x == width - this.size/2)
        {
            this.xspeed = -(this.xspeed);
        }
        if(this.y == this.size/2)
        {
            this.yspeed = -(this.yspeed);
        }
    }
}


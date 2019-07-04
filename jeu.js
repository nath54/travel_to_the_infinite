
canvas=document.getElementById("MyCanvas");
ctx=canvas.getContext("2d");

var tex=canvas.width;
var tey=canvas.height;

var keypressed=[false,false,false,false];
//0=up 1=down 2=left 3=right

var clbackground="darkblue";

class Cube{
    constructor(){
        this.px=500;
        this.py=300;
        this.tx=25;
        this.ty=25;
        this.cl="black";
        this.vies=3
        this.speedx=0
        this.speedy=0
        this.speedmax=10
        this.acc=5;
        this.vies=3;
    }
    move(aa){
        if(aa=="up"){
            this.speedy-=this.acc;
            if(this.speedy<-this.speedmax){
                this.speedy=-this.speedmax;
            }
        }
        else if(aa=="down"){
            this.speedy+=this.acc;
            if(this.speedy>this.speedmax){
                this.speedy=this.speedmax;
            }
        }
        else if(aa=="left"){
            this.speedx-=this.acc;
            if(this.speedx<-this.speedmax){
                this.speedx=-this.speedmax;
            }
        }
        else if(aa=="right"){
            this.speedx+=this.acc;
            if(this.speedx>this.speedmax){
                this.speedx=this.speedmax;
            }
        }
    }
    update(){
        this.px+=this.speedx;
        this.py+=this.speedy;
        if(this.speedx>0){
            this.speedx-=1;
        }
        if(this.speedx<0){
            this.speedx+=1;
        }
        if(this.speedy>0){
            this.speedy-=1;
        }
        if(this.speedy<0){
            this.speedy+=1;
        }
        if(this.py+this.ty>tey){
            this.py=0;
        }
        if(this.py<0){
            this.py=tey-this.ty;
        }
        if(this.px+this.tx>tex){
            this.px=tex-this.tx;
        }
        if(this.px<0){
            this.px=0;
        }
    }
}

class Rock{
    constructor(){
        this.px=parseInt(tex+Math.random()*tex);
        this.py=parseInt(Math.random()*tey);
        this.tx=parseInt(15+Math.random()*45);
        this.ty=this.tx
        this.cl="brown";
        this.vit=parseInt(3+Math.random()*8);
        this.delet=false;
    }
    update(cub){
        this.px-=this.vit;
        if(this.px<0){
            this.delet=true
        }
        var cond1=this.px >= cub.px && this.px <= cub.px+cub.tx && this.py>= cub.py && this.py <= cub.py+cub.ty
        var cond2=this.px+this.tx >= cub.px && this.px+this.tx <= cub.px+cub.tx && this.py>= cub.py && this.py <= cub.py+cub.ty
        var cond3=this.px >= cub.px && this.px <= cub.px+cub.tx && this.py+this.ty>= cub.py && this.py+this.ty<= cub.py+cub.ty
        var cond4=this.px+this.tx >= cub.px && this.px+this.tx <= cub.px+cub.tx && this.py+this.ty >= cub.py && this.py+this.ty <= cub.py+cub.ty
        if(cond1 || cond2 || cond3 || cond4){
            cub.vies-=1;
            this.delet=true;
        }
    }
}

function aff(rocks,cub){
    ctx.fillStyle=clbackground;
    ctx.fillRect(0,0,tex,tey);
    ctx.fillStyle="grey";
    ctx.fillRect(cub.px,cub.py,cub.tx,cub.ty);
    document.getElementById("text").innerHTML = cub.ty;
    for(x=0;x<rocks.length;x++){
        ctx.fillStyle=rocks[x].cl;
        ctx.fillRect(rocks[x].px,rocks[x].py,rocks[x].tx,rocks[x].ty);    
    }
    ctx.fillStyle="red";
    for(x=0;x<cub.vies;x++){
        ctx.fillRect(100+x*30,20,20,20);
    }
    if(keypressed[0]){ ctx.fillStyle="red"; }
    else{ ctx.fillStyle="black"; }
    ctx.fillRect(20,0,20,20);
    if(keypressed[1]){ ctx.fillStyle="red"; }
    else{ ctx.fillStyle="black"; }
    ctx.fillRect(20,40,20,20);
    if(keypressed[2]){ ctx.fillStyle="red"; }
    else{ ctx.fillStyle="black"; }
    ctx.fillRect(0,20,20,20);
    if(keypressed[3]){ ctx.fillStyle="red"; }
    else{ ctx.fillStyle="black"; }
    ctx.fillRect(40,20,20,20);
}

function checkKeyUp(e) {
    e = e || window.event;
    if (e.keyCode == '38') { keypressed[0]=!keypressed[0]; }
    else if (e.keyCode == '40') { keypressed[1]=!keypressed[1]; }
    else if (e.keyCode == '37') { keypressed[2]=!keypressed[2];  }
    else if (e.keyCode == '39') { keypressed[3]=!keypressed[3];  }
}






//////////////////////////////

var rocks=[];
var nbrocks=5;
 
cub=new Cube();
encour=true;

function main(){
    document.onkeyup = checkKeyUp;
    if(keypressed[0]){ cub.move("up"); }
    if(keypressed[1]){ cub.move("down"); }
    if(keypressed[2]){ cub.move("left"); }
    if(keypressed[3]){ cub.move("right"); }
    aff(rocks,cub);
    cub.update();
    for(x=0;x<rocks.length;x++){
        rocks[x].update(cub)
        if(rocks[x].delet){
            rocks.splice(x,1);
        }
    }
    while(rocks.length<nbrocks){
        rocks.push( new Rock() );
    }
    if(cub.vies<=0){
        encour=false;
        ctx.font = "60px Arial";
        ctx.fillStyle="darkred"
        ctx.fillText("Perdu", 300, 300);
    }
    if(encour){
        window.requestAnimationFrame(main);
    }
}

window.requestAnimationFrame(main);











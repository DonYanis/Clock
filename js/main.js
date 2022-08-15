let numbers=document.querySelectorAll('.number');
const sec=document.querySelector('.second');
const min=document.querySelector('.minute');
const hour=document.querySelector('.hour');
const timeElement = document.querySelector('.time');
const analog = document.querySelector('.analog_clock');
const numeric = document.querySelector('.numeric_clock');
const items=[analog,numeric];

//setting up rotation degs for analog clock numbers
for (let num = 0; num < numbers.length; num++) {
    let r=(num+1)*30;
    numbers[num].style.transform=`rotate(${r}deg)`;
}

//lunch analog clock
clock();
setInterval(clock,1000);

//lunch numeric clock
digitalTime()
setInterval(digitalTime,1000);

//handle dragging
for (let i = 0; i < items.length; i++) {
    //device uses mouse
        items[i].addEventListener("mousedown", ()=>{
            items[i].style.cursor='grabbing';
            items[i].style['z-index']=1000;
            items[i].addEventListener("mousemove",Drag);
        });

        document.addEventListener("mouseup", ()=>{
            items[i].style.cursor='grab';
            items[i].style['z-index']=999;
            items[i].removeEventListener("mousemove",Drag)
        }); 
    //if device uses digital screen (touches)
        items[i].addEventListener("touchstart", ()=>{
            items[i].style.cursor='grabbing';
            items[i].style['z-index']=1000;
            items[i].addEventListener("touchmove",Drag);
        });

        document.addEventListener("touchend", ()=>{
            items[i].style.cursor='grab';
            items[i].style['z-index']=999;
            items[i].removeEventListener("touchmove",Drag)
            previousTouch=0
        }); 
}

function clock(){
    const date=new Date();
    const seconds_rot=date.getSeconds() / 60;
    const minutes_rot=(seconds_rot+date.getMinutes()) / 60;
    const hours_rot=(minutes_rot+date.getHours()) / 12;
    Rotate(sec,seconds_rot);
    Rotate(min,minutes_rot);
    Rotate(hour,hours_rot);
}

function Rotate(e,rotation) {
    e.style.setProperty('--rotation',rotation*360);
}

function digitalTime(){
    let date=new Date();
    let time=[date.getHours(),date.getMinutes(),date.getSeconds(),'PM'];
    if(time[0]>12){
        time[0]-=12;
        time[3]='PM'
    }else{
        time[3]='AM'
    }
    if(time[0]<10){
        time[0]='0'+time[0];
    }
    if(time[1]<10){
        time[1]='0'+time[1];
    }
    if(time[2]<10){
        time[2]='0'+time[2];
    }
    timeElement.innerHTML=`${time[0]}:${time[1]}:${time[2]} ${time[3]} `;
}

var previousTouch   //for mobile devices
function Drag(event){
    for (let i = 0; i < items.length; i++) {
        if(items[i].style.cursor=='grabbing'){
            //get old position of the div   
            let left=parseInt(window.getComputedStyle(items[i]).left)
            let top=parseInt(window.getComputedStyle(items[i]).top)
        
            //check if device is digital screen:
            if(event.type==='touchmove'){
                const touch=event.touches[0]
                if(previousTouch){
                event.movementX=touch.pageX-previousTouch.pageX||0
                event.movementY=touch.pageY-previousTouch.pageY||0                    
                }
                previousTouch=touch
            }
            //setting the new position
            items[i].style.left=`${left+event.movementX}px`
            items[i].style.top=`${top+event.movementY}px`
        }   
    }
}
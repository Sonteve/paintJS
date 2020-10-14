const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = '#ffffff';
ctx.fillRect(0,0, CANVAS_SIZE,CANVAS_SIZE);


ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;


function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;    
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting = true;
}

function onMouseUp(event){    
    stopPainting();
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;  
    console.log('color',color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;        
}

function handleFillMode(){
    if(filling){
        filling = false;
        mode.innerHTML = 'Fill';
    }else{
        filling = true;
        mode.innerHTML = 'Paint';
    }
}

function handleClickCanvas(){
    if(filling){
        ctx.fillRect(0,0, CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){    
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'yourImage';
    link.click();
}

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleClickCanvas);
    canvas.addEventListener('contextmenu', handleCM);
}

if(colors){
    Array.from(colors).forEach(color => {
        color.addEventListener('click', handleColorClick);
    })
}

if(range){
    range.addEventListener('input',(e) => {
        console.log('range',e.target.value);
        ctx.lineWidth = e.target.value;
    })
}

if(mode){
    mode.addEventListener('click',handleFillMode)
}

if(saveBtn){
    saveBtn.addEventListener('click', handleSaveClick)
}
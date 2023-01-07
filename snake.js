const welcomeScreen = document.getElementById('welcome-screen');// diálogo de bienvenida al juego
welcomeScreen.showModal();
const startButton = document.getElementById('start-button');// botón hide para quitar welcome-screen
startButton.addEventListener('click', () => {
  welcomeScreen.close();
});

const box =32;// La caja donde se ejecuta el juego, tiene 32px de base.

const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');


// cargar imágenes

const ground = new Image();
ground.src = "img/ground.png";// tiene 17 x 15 espacios en el cuadro donde se ejecuta el juego, + 3 de margen en el eje y

const foodImg = new Image();
foodImg.src = "img/food.png";

// crear audios

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";


let snake = [];
snake[0]= {
    x: 9*box,
    y: 10*box
};


let food={
    x: Math.floor(Math.random()*17 + 1)*box,// obetner una posición en x entre 1 y 17
    y: Math.floor(Math.random()*15 + 3)*box// obtener una posición en y entre 3 y 18(15)
}
// El floor() method coje un número sin decimales al azar y devuelve el resultado



//control de la snake

let control;//dirección

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && control != "RIGHT"){
        left.play();
        control = "LEFT";
    }else if(key == 38 && control != "DOWN"){
        control = "UP";
        up.play();
    }else if(key == 39 && control != "LEFT"){
        control = "RIGHT";
        right.play();
    }else if(key == 40 && control != "UP"){
        control = "DOWN";
        down.play();
    }
}

// comprobar colisiones
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// crear el contador
let score=0;
// mostrar en el canvas
function init(){
    
    ctx.drawImage(ground,0,0);// mostrar imagen del suelo en el canvas
    
    // propiedades de la snake
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";// color de relleno de la serpiente
        ctx.fillRect(snake[i].x,snake[i].y,box,box);// posición de la snake
        
        ctx.strokeStyle = "red";// bordes rojos
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);// mostrar contador de comida en el canvas
    //score properties
    ctx.fillStyle = "white";
    ctx.font = "45px Helvetica one";
    ctx.fillText(score,2*box,1.6*box);
    
    // posición de la cabeza de la snake anterior al movimiento
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // mover snake en el juego
    if( control == "LEFT") snakeX -= box;
    if( control == "UP") snakeY -= box;
    if( control == "RIGHT") snakeX += box;
    if( control == "DOWN") snakeY += box;
    
    // la snake se come la manzana
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // la cola sigue mostrandose
    }else{
        // quitamos la cola
        snake.pop();
    }
    
    // añadir nueva cabeza a la snake
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(gameStart);
        dead.play();
        welcome = document.querySelector('#IronHacker');
        welcome.innerHTML = "Game Over - Push Space for Reset";
    }
    // cambiar posición de la cabeza
    snake.unshift(newHead);// añadir elemento al principio del array snake
    
    window.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            location.reload()
        }
        ctx.init
    }); 
}


//dibujar cada 100 ms
let gameStart = setInterval(init,100);

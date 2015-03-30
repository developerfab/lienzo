//lienzo del programa
var lienzo = document.getElementById('lienzo');
var contexto = lienzo.getContext('2d');
tamano();
//buffer para evitar el parpadeo
var buffer = document.createElement('canvas');
buffer.width = lienzo.width;
buffer.height = lienzo.height;
var bufferCtx = buffer.getContext('2d');
//botones para cambiar el color
var rojo = document.getElementById('rojo');
var verde = document.getElementById('verde');
var azul = document.getElementById('azul');
var tamano_punto = document.getElementById('tamano_punto');

var color = 'black';
var radio = 1;
contexto.lineWidth = 4;
tamano_punto.innerHTML=radio;
var xCoord, yCoord="";
lienzo.draw = function(){

}
//funcion que dibuja un circulo
function circulo(posx, posy){
	bufferCtx.beginPath();
	bufferCtx.arc(posx,posy, radio, 0, 2*Math.PI, false);
	bufferCtx.fillStyle=color;//"#"+parseInt(posx/2)+""+parseInt(posy/2);
	bufferCtx.lineWidth = 0.5;
  	bufferCtx.strokeStyle = color;
	bufferCtx.stroke();
	bufferCtx.closePath();
	bufferCtx.fill();
	contexto.drawImage(buffer,0,0);
}

//funcion se calcula las coordenadas de posicion del mouse
function getPositionMouse(canvas, evento){
	var rect = canvas.getBoundingClientRect();
    return {
        x: evento.clientX - rect.left,
        y: evento.clientY - rect.top
    };
}
//funcion que escucha el movimiento del mouse en el canvas y pinta en las coordenadas señaladas
lienzo.addEventListener('mousemove', function(evento){
	var posicion = getPositionMouse(lienzo, evento);
	circulo(posicion.x, posicion.y);
	contexto.beginPath();
	contexto.moveTo(posicion.x,posicion.y);
	contexto.strokeStyle=color;
	contexto.lineTo(xCoord, yCoord);
	contexto.stroke();
	contexto.closePath();
	var pos = getPositionMouse(lienzo,evento);
	xCoord=pos.x;
	yCoord=pos.y;
});
//funciones para modificar el color del punto
function color_rojo(recibido){
	return color = 'red';
}

function color_verde(recibido){
	return color = 'green';
}

function color_azul(recibido){
	return color = 'blue';
}
function borrar(recibido){
	return color = 'white';
}
//funcion que asigna el tamaño del canvas deacuerdo al tamaño de la pantalla
function tamano(){
	lienzo.width = screen.width-300;
	lienzo.height = screen.height-300;
}

//funcion que aumenta el radio del punto pintado

function aumentar(){
	radio++;
	contexto.lineWidth=contexto.lineWidth+2;
	tamano_punto.innerHTML=radio;
}

function disminuir(){
	if(radio>1){
		radio--;
		contexto.lineWidth=contexto.lineWidth-2;
	}
	tamano_punto.innerHTML=radio;
}
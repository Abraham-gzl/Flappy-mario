let x = 0
let y = 0
let dx = 0
let dy = 3
let py = 50
let imagenFondo
let imagenInicio
let imagenBird
let imagenPared
let estado = 0 // 0 = Pantalla inicial; 1 = Jugando
let record = 0
let marcador = 0
let wx = [600,900]
let wy = [400,600]

function preload() {
  imagenFondo = loadImage('./images/fondo2.jpg')
  imagenInicio = loadImage('./images/inicio.JPG')
  imagenPared = loadImage('./images/pared.png')
  imagenBird = loadImage('./images/toad.png')
}

function setup() {
  // put setup code here
  createCanvas(600,800)
  textSize(40)
}

function draw() {
  // put drawing code here
  //background(120)
  //rect(x+dx,y,10,20)
  //dx += 2
  //if ((x+dx) > width) {
  //  dx = 0
  //}
  if (estado == 1) {  
    fill(255)
    imageMode(CORNER)
    image(imagenFondo,x,0)
    image(imagenFondo,x+imagenFondo.width,0)

    x -= 6 //Desplazamiento negativo para la imagen de fondo
    dy += 1 //Desplazamiento adicional para el personaje
    py = py + dy //Posición actual del personaje en Y

    if (abs(x)>=imagenFondo.width) x = 0 //Si el desplazamiento de la imagen llego al ancho de la misma, reiniciar 

    //print("WX: " + wx)
    //print("WY: " + wy)

    //Paredes de obstáculo
    for (i = 0; i < 2; i++) {
      imageMode(CENTER)
      image(imagenPared, wx[i], wy[i] + (imagenPared.height/2+100)) //Mueve tubo hacia abajo
      image(imagenPared, wx[i], wy[i] - (imagenPared.height/2+100)) //Mueve hacia arriba

      if (wx[i] < 0) {
        wx[i] = width
        wy[i] = random(200,height-200)
      }
      if (wx[i] == width / 2) {
        marcador++
        record = max(marcador,record)
      }
      if (py > height || py < 0 || (abs(width/2 - wx[i])<50 && abs(py-wy[i])>100)) {
        estado = 0
        cursor()
      }
      wx[i] -= 6  //Desplazamiento de los tubos
    }
    //console.log()
    //print("Hola amigos")

    //Desplegamos al personaje y el puntaje
    //text("👻",width/2, py) //Personaje en emoticon
    image(imagenBird,width/2, py) //Personaje en imagen
    text("Puntaje: "+marcador,width/2-50,50)

  } else {
    fill(0,0,255)
    imageMode(CENTER)
    image(imagenInicio,width/2,height/2)
    text("Record: " + record, 200,100)
    text("¿Podras lograrlo?", 130,150);
  }
}

function mousePressed() {
  dy = -15
  if (estado == 0) {
    estado = 1
    x = 0
    marcador = 0
    py = height / 2
    wx = [600,900]
    wy = [400,600]    
    noCursor()
  }
}

function touchStarted() {
  dy = -15
  if (estado == 0) {
    estado = 1
    x = 0
    marcador = 0
    py = height / 2
    wx = [600,900]
    wy = [400,600]    
  }
}
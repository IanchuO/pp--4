var bg,bgImg;

var player, shooterImg, shooter_shooting;

var maria, mariaImg, maria_shooter;

var zombie, zombieImg, zombieKilled = 0 ;

var score = 0;

var life = 3;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var bullets = 70;

var gameState = "fight";


  function preload(){
    
    heart1Img = loadImage("assets/heart_1.png")
    heart2Img = loadImage("assets/heart_2.png")
    heart3Img = loadImage("assets/heart_3.png")

    shooterImg = loadImage("assets/shooter_2.png")
    shooter_shooting = loadImage("assets/shooter_3.png")

    maria = loadImage("assets/maria archera.png")
    maria_shooter = loadImage("assets/maria disparando.png")

    zombieImg = loadImage("assets/zombie.png")

    bgImg = loadImage("assets/bg.jpeg")

  }

  function setup() {

    
    createCanvas(windowWidth,windowHeight);

    // Agregando las imagenes de fondo
    bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
    

  // Creando el sprite del jugador
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
    player.scale = 0.3
    player.debug = true
    player.setCollider("rectangle",0,0,300,300)


    // Creando sprites para representar la vida restante 
    heart1 = createSprite(displayWidth-150,40,20,20)
    heart1.visible = false
      heart1.addImage("heart1",heart1Img)
      heart1.scale = 0.4

      heart2 = createSprite(displayWidth-100,40,20,20)
      heart2.visible = false
      heart2.addImage("heart2",heart2Img)
      heart2.scale = 0.4

      heart3 = createSprite(displayWidth-150,40,20,20)
      heart3.addImage("heart3",heart3Img)
      heart3.scale = 0.4
    

      // Creando los grupos para los zombis y las balas
      bulletGroup = new Group()
      zombieGroup = new Group()



  }

  function draw() {
    background(0); 
    textSize(100)
    fill("lightBlue")
    text("your score is :"+ score, 400, 400)

    if(gameState === "fight"){

        // Mover al jugador arriba y abajo. Haciendo el juego compatible con entrada táctil
      if(keyDown("UP_ARROW")||touches.length>0){
        player.y = player.y-30
      }
      if(keyDown("DOWN_ARROW")||touches.length>0){
      player.y = player.y+30
      }


      // Liberar balas y cambiar la imagen del tirador a posición de tiro cuando se presiona la barra espaciadora.
      if(keyWentDown("space")){
        bullet = createSprite(displayWidth-1150,player.y-30,20,10)
        bullet.velocityX = 20
        
        bulletGroup.add(bullet)
        player.depth = bullet.depth
        player.depth = player.depth+2
        player.addImage(shooter_shooting)
        bullets = bullets-1
      }

      // El jugador regresa a la posición original una vez qeu se deja de presionar la barra espaciadora 
      else if(keyWentUp("space")){
        player.addImage(shooterImg)
      }

      // Inicia el estado de juego (gameState) "bullet" cuando el jugador se queda sin balas. 
      if(bullets==0){
        gameState = "bullet"
          
    }

  // Destruye al zombi cuando una bala lo toca
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i++){     
        
    if(zombieGroup[i].isTouching(bulletGroup)){
          zombieKilled = zombieKilled + 1
          zombieGroup[i].destroy()
          bulletGroup.destroyEach()
          score += 5 
          } 
    
    }
  }

  // Destruye al zombi cuando el jugador lo toca 
  if(zombieGroup.isTouching(player)){

    for(var i=0;i<zombieGroup.length;i++){     
          
        if(zombieGroup[i].isTouching(player)){
            if (life !== 0) {
              life = life - 1
              if (life === 2) {
                heart3.visible = false
                heart2.visible = true
              }
              if (life === 1) {
                heart2.visible = false
                heart1.visible = true
              }
              if (life === 0) {
                heart1.visible = false
                gameState = "lost"
              }
            }
            zombieGroup[i].destroy()  
          } 
    
      }
      }
      console.log (zombieKilled)
      if (zombieKilled >= 70) {     
      gameState = "won"
      }
      // Llama a la función para generar zombis
      enemy();
  }

  drawSprites();

  // Destruye al jugador y al zombi. Muestra el mensaje en el estado de juego "lost"
  if(gameState == "lost"){
    
    textSize(100)
    fill("red")
    text("You Lost ",400,400)
    zombieGroup.destroyEach();
    player.destroy();

  }

  // Destruye al jugador y al zombi. Muestra el mensaje en el estado de juego "won"
  else if(gameState == "won"){
  
    textSize(100)
    fill("yellow")
    text("You Won ",400,400)
    zombieGroup.destroyEach();
    player.destroy();

  }

  // Destruye al jugador, al zombi y a las balas. Muestra el mensaje en el estado de juego "bullet"
  else if(gameState == "bullet"){
  
    textSize(50)
    fill("yellow")
    text("You ran out of bullets!!!",470,410)
    zombieGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();

  }

  }


  // Creando la función para generar zombis
  function enemy(){
    if(frameCount%50===0){

      // Da posiciones aleatorias "x" e "y" para que aparezca el zombi
      zombie = createSprite(random(1000,1500),random(500,800),40,40)

      zombie.addImage(zombieImg)
      zombie.scale = 0.15
      zombie.velocityX = -3
      zombie.debug= true
      zombie.setCollider("rectangle",0,0,400,800)
    
      zombie.lifetime = 400
    zombieGroup.add(zombie)
    }

  }

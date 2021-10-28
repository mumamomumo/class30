const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit, rope;
var fruit_con;

var backgroundImg, cutbutton, melon, rabbit;
var rabbitSprite;
var button;
function preload(){
  backgroundImg = loadImage("background.png");
  melon = loadImage("melon.png");
  rabbit = loadImage("Rabbit-01.png");
}
function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  rabbitSprite = createSprite(160, 360, 100, 100);
  rabbitSprite.addImage(rabbit);
  rabbitSprite.scale = 0.2;
  button = createImg('cut_button.png');
  button.position(220, 30);
  button.size(50, 50);

  button.mouseClicked(drop);
}

function draw() 
{
  background(51);
  image(backgroundImg, 0, 0, displayWidth, displayHeight);

  
  rope.show();
  ellipse(fruit.position.x,fruit.position.y,20,20);
  image(melon, fruit.position.x, fruit.position.y, 70, 70);
  Engine.update(engine);
  ground.show();

 
   drawSprites();
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}
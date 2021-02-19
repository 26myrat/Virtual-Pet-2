var dog,dogimg,dogHappy,foodStock,foods;
var database;
var food1;
var feedButton, addfoodButton;
var foodObj;

function preload(){
dogimg = loadImage("Image/dogImg.png");
dogHappy = loadImage("Image/dogImg1.png");

}

function setup() {
  createCanvas(800, 700);
  
  
  dog = createSprite(400,500,50,50);
  dog.addImage(dogimg);
  dog.scale = 0.3;

  database = firebase.database();
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

 feedButton = createButton("Feed")
 feedButton.position(600, 100)
 addfoodButton = createButton("Add Food")
 addfoodButton.position(600, 300)
 
 foodObj = new Food()
}


function draw() {
  background(46,139,87); 
  
  foodObj.foodStock = foods
  foodObj.display();
  feedButton.mousePressed(function(){
    getFoodStock(); 
    feedDog(); }) 
    addfoodButton.mousePressed(function(){ 
      getFoodStock() 
      addFood(foods) })

  drawSprites();

  textSize(30);
  text("Food remaining: "+foods,300,250);
  text("press the up arrow key to feed the dog",250,150);
  
}


function readStock(data){
  foods = data.val();
}

function writeStock(x){
  if (x<=0){
    x = 0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  });
}

function addFood(f){ 
  f++; 
  database.ref('/').update({ food : f }) 
} 
  function getFoodStock(){ 
    database.ref("food").on("value",function(data){ 
      foods = data.val(); 
      console.log(foodS) }) } 
    function feedDog(){ foodS-- 
      database.ref("/").update({ FeedTime:hour(), food:foods }) }




$(document).ready(function()
                  {
  //canvas variables
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  var w = $("#canvas").width();
  var h = $("#canvas").height();
  
  //game variables
  var food;
  var score;
  var level;
  var snake_array;
  var cw = 20;
  var d;
  var game_loop;
  var can_input;
  var pause = false;
  var interval = 100;

                  
function initial()
{
  d = "right";
  score = 0;
  level = 1;
  interval = 100;
  create_snake();
  create_food();
  
  
  if(typeof game_loop != "undefined") clearInterval(game_loop);
      game_loop = setInterval(paint, interval);
}
initial();


function create_snake()
{
  var length = 5;
  snake_array = [];
  
  for(var i = length-1; i>=0; i--)
    {
      snake_array.push({x:i, y:0});
    }
}

function create_food()
{
  food = {
    x: Math.round(Math.random()*(w-cw)/cw),
    y: Math.round(Math.random()*(h-cw)/cw),
  };
}

//create paint function
function paint()
{
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,w,h);
  ctx.strokeStyle = "black";
  ctx.strokeRect(0,0,w,h);
  
  //movement of snake
  var head_x = snake_array[0].x;
  var head_y = snake_array[0].y;
  
  if (d == "right") head_x++;
  else if (d == "left") head_x--;
  else if (d == "down") head_y++;
  else if (d == "up") head_y--;
  
  //when to restart game
  if(head_x < 0 || head_x+1 >= w / cw || head_y < 0 || head_y+1 >= h / cw || collision(head_x, head_y, snake_array))
    {
      initial()
      return;
    }
  
  if(head_x == food.x && head_y == food.y)
    {
      var tail = {x: head_x, y: head_y}
      score++;
      create_food()
      
      if (score % 10 == 0) {
        level++;
        interval *= 0.85;
        clearInterval(game_loop);
        game_loop = setInterval(paint, interval);
      }
      
    }
  else
    {
      var tail = snake_array.pop();
      tail.x = head_x; tail.y = head_y;
    }
  
  snake_array.unshift(tail);
  
  for(var i = 0; i < snake_array.length; i++)
    {
      var c = snake_array[i];
      paint_cell(c.x,c.y,"darkgreen")
    }
  
  paint_cell(food.x,food.y,"darkred");
  
  var score_text = "Score: " + score;
  var level_text = "Level: " + level;
  ctx.fillText(score_text,5,h-5);
  ctx.fillText(level_text,60,h-5);
  can_input = true;
}


function paint_cell(x,y,color)
{
  ctx.fillStyle = color;
  ctx.fillRect(x*cw,y*cw,cw,cw)
  ctx.strokeStyle = "white";
  ctx.strokeRect(x*cw,y*cw,cw,cw)
}


function collision(x,y,array)
{
  for(var i=0; i < array.length; i++)
    {
      if(array[i].x == x && array[i].y == y)
        return true;
    }
  return false;
}

$(document).keydown(function(e)
                    {
  var key = e.which;
  
  if(key == "32"){
      if(pause == false){
        pause = true;
        clearInterval(game_loop)
        can_input = false;
      }
      else if(pause == true){
        pause = false;
        game_loop = setInterval(paint,interval)
        can_input = true;
      }
      
    }
  
  if (can_input == true){
    if(key == "37" && d != "right"){
      d = "left"
      can_input = false;
    }
    else if(key == "38" && d != "down"){
      d = "up"
      can_input = false;
    }
    else if(key == "39" && d != "left"){
      d = "right"
      can_input = false;
    }
    else if(key == "40" && d != "up"){
      d = "down"
      can_input = false;
    }
    //console.log(d)
    
    
  }
  
})
  
})

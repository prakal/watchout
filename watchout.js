// start slingin' some d3 here.
var width = 800;
var height = 800;
var asteroidR = 25;
var playerR = 20;
var bangs = 0;
var currentScore = 0;
var highScore = 0;
var gameOver = false;
//var healthV = width;

// this is the svg for our canvas
var svg = d3.select("body")
  .append("svg")
    .style({"position":"absolute","top":100, 'left':020})
    .attr("width", width)
    .attr("height", height)
    .attr('class','canvas')
  .append("g");

// this is the asteroid
// svg.append("image")
//   .attr("xlink:href","asteroid.png")
//   .attr("width", '100')
//   .attr("height", '100');

// svg.append("image")
//   .attr("xlink:href","asteroid.png")
//   .attr("width", '200')
//   .attr("height", '200')
//   .attr("x",230)
//   .attr("y",'230');



// collection of asteroid locations. each element of object contains x and y coordinates
var asteroidLocation = [{x:50, y:50},{x:100,y:100}];



console.log(svg);

var randomCoordinates = function(n){
  asteroidLocation = [];
  var px = parseInt(player.attr("cx"));
  var py = parseInt(player.attr("cy"));
  for (var i = 0; i < n; i++){
    asteroidLocation.push({
      x:px+Math.random()*width-width*0.5,
      y:py+Math.random()*height-height*0.5
    });
  }
  // asteroidLocation = [{x:100, y:100}];
};

var updateLocation = function(){
  var asteroids = svg.selectAll(".shuriken").data(asteroidLocation);


  asteroids.enter()
      .append("image")
      .attr("width", asteroidR*2)
      .attr("class", "shuriken")
      .attr("xlink:href","http://www.pubzi.com/f/lg-Shuriken.png")
      .attr("height", asteroidR*2)
      .attr("x",function(d){return d.x;})
      .attr("y",function(d){return d.y;});

  asteroids.transition().duration(2000).ease("circle")
    .attr("x",function(d){return d.x;})
    .attr("y",function(d){return d.y;})
    .tween("custom", tweenFactory);

  asteroids.exit().remove();



};


var player = svg.append("circle");

var collect = svg.append("image")
  .attr('class','collect')
  .attr("xlink:href","http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/3d-transparent-glass-icons-signs/089099-3d-transparent-glass-icon-signs-first-aid1.png")
  .attr("width", asteroidR*2)
  .attr("height", asteroidR*2)
  .attr('x',100)
  .attr('y',100);

var healthBar = svg.append('rect')
  .attr('class','health')
  // .attr('x','50')
  // .attr('y','50')
  .attr('width',width)
  .attr('height',"20")
  .style('fill','red');

var banged = false;

var dragged = function () {
  //console.dir(d3.event);
  var setX = d3.event.x;
  var setY = d3.event.y;

  if (setX < 50 ){
    setX = 50;
  }
  if (setX > width - 50) {
    setX = width - 50;
  }
  if (setY < 50 ){
    setY = 50;
  }
  if (setY > height - 50) {
    setY = height - 50;
  }
  // allow player to collect item and regain health:

  if (Math.sqrt((Math.pow((setX -   parseInt(collect.attr("x"))    ),2) + Math.pow((setY - parseInt(collect.attr("y"))    ),2)))<40){
    // console.log("cx "+ parseInt(collect.attr("cx") ));
    // console.log("cy "+parseInt(collect.attr("cy") ));
    // console.log("setX " +setX);
    // console.log("setY " +setY);
    // console.log("setY - cy " ,setY-parseInt(collect.attr("cy")));
    // console.log("setX - cx ", setX-parseInt(collect.attr("cx")));
    // console.log(Math.sqrt((Math.pow((setX -   parseInt(collect.attr("cx"))    ),2) + Math.pow((setY - parseInt(collect.attr("cy"))    ),2))));
    // player can collect item
    if (banged === false){
      bangs-=100;
      banged = true;
      healthBar.attr("width",width-bangs);
      collect.remove();

    }

  }

  d3.select(this).attr("cx", setX).attr("cy", setY);
};

var print = true;

var tweenFactory = function() {
  return function () {
    if (print) {
      console.dir(this);
      // console.log('asteroid', d3.select(this).attr("x"));
      // console.log('Player',player.attr("cx"));
      print = false;
    }
    var xpos = parseInt(d3.select(this).attr("x"))+ asteroidR;
    var ypos = parseInt(d3.select(this).attr("y"))+ asteroidR;

    var xPlayer = player.attr("cx");
    var yPlayer = player.attr("cy");



    var dist = Math.sqrt(Math.pow((xpos-xPlayer),2)+Math.pow((ypos-yPlayer),2));
    // console.log(xpos);
    if (dist < asteroidR + playerR) {
      console.log('bang');
      bangs = bangs + 10;

      if (width - bangs < 0){
        // display GAME OVER and remove all elements
        d3.select('.shuriken').remove();
        d3.select('.collect').remove();
        player.remove();

        clearInterval(enemyIntervalID);
        clearInterval(healthIntervalID);
        if (!gameOver) {
          gameOver = true;
        svg.append("image")
          .attr('x','200')
          .attr('y','400')
          .attr("xlink:href","http://shop.artwelove.com/_img/_mngd/product/249-artwork-focus.jpg")
          .attr("width", 500)
          .attr("height", 300);

        var scoreboard = document.getElementById('scoreboardID');
        console.log('scoreboard',scoreboard);
        scoreboard.style.top = "300px";
        scoreboard.style.left = "300px";
      }
      }

      if (width - bangs > 0) {healthBar.attr("width", width - bangs);}
      d3.select(".collisions").text("Collisions:"+bangs);
      if (highScore < currentScore) {
        highScore = currentScore;
        d3.select(".high").text("High score: "+highScore);
      }
      currentScore = 0;
    }
  };
};

player
  .attr("r", playerR)
  .attr("fill", "red")
  .attr("cx",300)
  .attr("cy",300);

var drag = d3.behavior.drag().on('drag', dragged);
player.call(drag);


randomCoordinates(20);
updateLocation();

var enemyIntervalID = setInterval(function(){
  randomCoordinates(20);
  updateLocation();
  currentScore++;
  d3.select(".current").text("Current score: "+currentScore);
},2000);



var healthIntervalID = setInterval(function(){
  // console.log(d3.select('.collect')[0][0]);
  // d3.select('.collect')[0][0] is the image tag in the DOM
    // if it is null, then we drop another health pack
  if (banged || d3.select('.collect')[0][0] === null ) {
    collect = svg.append("image")
      .attr('class','collect')
      .attr("xlink:href","http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/3d-transparent-glass-icons-signs/089099-3d-transparent-glass-icon-signs-first-aid1.png")
      .attr('width',asteroidR*2)
      .attr('height',asteroidR*2)
      .attr('x',Math.random()*(width-100)+50)
      .attr('y',Math.random()*(height-100)+50);
    banged = false;
  }
},5000);



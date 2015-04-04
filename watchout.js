// start slingin' some d3 here.
var width = 1000;
var height = 1000;
var asteroidR = 25;
var playerR = 20;
var bangs = 0;
var currentScore = 0;
var highScore = 0;

// this is the svg for our canvas
var svg = d3.select("body")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
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
  for (var i = 0; i < n; i++){
    asteroidLocation.push({x:Math.random()*width,y:Math.random()*height});
  }
  // asteroidLocation = [{x:100, y:100}];
};

var updateLocation = function(){
  var asteroids = svg.selectAll("image").data(asteroidLocation);


  asteroids.enter()
      .append("image")
      .attr("width", asteroidR*2)
      .attr("class", "shuriken")
      .attr("xlink:href","http://www.pubzi.com/f/lg-Shuriken.png")
      .attr("height", asteroidR*2)
      .attr("x",function(d){return d.x;})
      .attr("y",function(d){return d.y;});

  asteroids.transition().duration(1000)
    .attr("x",function(d){return d.x;})
    .attr("y",function(d){return d.y;})
    .tween("custom", tweenFactory);

  asteroids.exit().remove();



};


var player = svg.append("circle");

var dragged = function () {
  //console.dir(d3.event);
  d3.select(this).attr("cx", d3.event.x).attr("cy", d3.event.y);
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
      bangs++;
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

setInterval(function(){
  randomCoordinates(20);
  updateLocation();
  currentScore++;
  d3.select(".current").text("Current score: "+currentScore);
},1000);



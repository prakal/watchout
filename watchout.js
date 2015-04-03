// start slingin' some d3 here.
var width = 700;
var height = 700;

// this is the svg for our canvas
var svg = d3.select("body").append("svg")
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
};

var updateLocation = function(){
  var asteroids = svg.selectAll("image").data(asteroidLocation);


  asteroids.enter()
      .append("image")
      .attr("xlink:href","asteroid.png")
      .attr("width", '50')
      .attr("height", '50')
      .attr("x",function(d){return d.x;})
      .attr("y",function(d){return d.y;});

  asteroids.transition().duration(1000)
    .attr("x",function(d){return d.x;})
    .attr("y",function(d){return d.y;});

  asteroids.exit().remove();



};

var player = svg.append("circle");

var dragged = function () {
  //console.dir(d3.event);
  d3.select(this).attr("cx", d3.event.x).attr("cy", d3.event.y);
};

player
  .attr("r", 20)
  .attr("fill", "red")
  .attr("cx",300)
  .attr("cy",300);

var drag = d3.behavior.drag().on('drag', dragged);
player.call(drag);



randomCoordinates(5);
updateLocation();

setInterval(function(){randomCoordinates(5); updateLocation();},1000);



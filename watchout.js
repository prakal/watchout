// start slingin' some d3 here.

// this is the svg for our canvas
var svg = d3.select("body").append("svg")
    .attr("width", '700')
    .attr("height", '700')
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

svg.selectAll("image")
.data(asteroidLocation)
  .enter()
  .append("image")
    .attr("xlink:href","asteroid.png")
    .attr("width", '100')
    .attr("height", '100')
    .attr("x",function(d){return d.x;})
    .attr("y",function(d){return d.y;});

console.log(svg);

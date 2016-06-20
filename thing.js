function element(name,attrs,content) {
  var e = document.createElementNS('http://www.w3.org/2000/svg',name);
  for(var key in attrs) {
    e.setAttribute(key,attrs[key]);
  }
  if(content!==undefined) {
    e.textContent = content;
  }
  return e;
}

function choice(list) {
  var i = Math.floor(Math.random()*list.length);
  return list[i]
}

function place(vertices,x,y,steps) {
  for(var s=0;s<steps;s++) {
    var p = choice(vertices);
    x += (p.x-x)/2;
    y += (p.y-y)/2;
  }
  return {x:x,y:y}
}

var h = Math.sqrt(3)/2;
var side = 100/h;
var vertices = [{x:0,y:0},{x:-side/2,y:side*h},{x:side/2,y:side*h}]

var radius = 0.5;
var numpoints = 500;
var numsteps = 20;

function draw() {
  var points = [];
  for(var i=0;i<numpoints;i++) {
    points.push(place(vertices,0,0,numsteps));
  }

  var diagram = document.getElementById('diagram');
  diagram.innerHTML = '';
  points.forEach(function(p) {
    var e = element('circle',{cx:p.x,cy:p.y,r:radius,fill:'black',"class":'dot'});
    diagram.appendChild(e);
  })
  
  createDownload();
}

function createDownload() {
  var svg = diagram.outerHTML;
  var blob = new Blob([svg],{type:'image/svg+xml'});
  var url = URL.createObjectURL(blob);
  document.getElementById('download').setAttribute('href',url);
}

var radInput = document.getElementById('radius');
radInput.value = radius;
radInput.addEventListener('input',function() {
  radius = radInput.value
  debounceDraw();
})
var numPointsInput = document.getElementById('numpoints');
numPointsInput.value = numpoints;
numPointsInput.addEventListener('input',function() {
  numpoints = numPointsInput.value
  debounceDraw();
})
var numStepsInput = document.getElementById('numsteps');
numStepsInput.value = numsteps;
numStepsInput.addEventListener('input',function() {
  numsteps = numStepsInput.value
  debounceDraw();
})

var drawInt;
function debounceDraw() {
  clearTimeout(drawInt);
  drawInt = setTimeout(draw,50);
}

draw();

//instagram:cyberspezie
//This program generates constellations randomly
//sfondo.jpg and stella.gif created by me on Procreate, music.mp3 generated with soundraw.io

//class to create circle objects that will be the anchor for the connecting line
class Cerchio {
  constructor(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
  }
}

//global variables declaration
let insiemeCerchi = [];
let i = 0;
let stella;

//phones only (the portfolio page narrower than 768px): the stars shrink in proportion to the sketch,
//as if it were 1100px wide (on a phone the 165px gif filled the whole small sketch); desktop unchanged
function starScale(){
  let pageWidth = window.innerWidth;
  try { pageWidth = window.parent.innerWidth; } catch (e) {}
  return pageWidth < 768 ? Math.min(1, window.innerWidth / 1100) : 1;
}

//function that connects two circles together
function collega(){
  if(insiemeCerchi.length < 2) return;
  let c1 = insiemeCerchi[insiemeCerchi.length-2];
  let c2 = insiemeCerchi[insiemeCerchi.length-1];
  line(c1.x, c1.y, c2.x, c2.y);
}

//the music (music.mp3) is played by the portfolio page, with its sound on / off button

//canvas creation
function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
//  if(navigator.userAgentData.mobile){
    //stella.resize(300,30);
  //}
  
  frameRate(4); //pause to see how the constellation forms (replaces sleep(240))
}

//function executed in a loop that generates the drawing
function draw(){
  
  //draw the circle and add it to the list
  let s = starScale();
  insiemeCerchi.push(new Cerchio(floor(random(50*s, window.innerWidth-90*s)), floor(random(50*s, window.innerHeight-90*s)), 50*s));
  if(i == insiemeCerchi.length) return;
  let c = insiemeCerchi[i];
  noStroke();
  fill(0,0,0,0);
  ellipse(c.x, c.y, c.r, c.r);
  
  //add the star gif
  stella = createImg('stella.gif', '');
  if (s < 1) stella.size(165*s, AUTO);   //phones: smaller star (desktop: the gif's own size)
  stella.position(c.x-100*s, c.y-100*s);

  stroke(255);
  collega();    //connect the two stars
  
  //console.log(`x: ${c.x}; y: ${c.y}`);  console log of coordinates used during development
  i++;
  let a=floor(random(5, 14));  //maximum number of stars per constellation generated randomly
  
  //clear canvas if the constellation is complete
  if(i == a || i==14){
    noLoop(); 
    
    setTimeout(function() { //pause to have time to look (replaces sleep(3000))
      i = 0;
      insiemeCerchi = [];
      var images = document.getElementsByTagName('img');
      while(images.length > 0) {
          images[0].parentNode.removeChild(images[0]);
      }
      clear();
      loop();
    }, 3000); 
  }
}
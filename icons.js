CanvasRenderingContext2D.prototype.matchDPI = function() {
  ratio = window.devicePixelRatio;
  el = $(this.canvas);
  this.width  = el.width();
  this.height = el.height();
  el
  .css({
    width: this.width,
    height:this.height
  })
  .attr({
    width: this.width*ratio,
    height: this.height*ratio
  });
  
  el[0].getContext('2d').scale(ratio,ratio);
};

var icon;
$(function(){
  canvas = $('#dropLogo')[0];
  icon = canvas;
  canvas.once = false;
  canvas.done = false;
  canvas.play = function() {
    canvas.once = false;
    if (this.done) {
      this.done = false;
      requestAnimationFrame(draw);
    }
  };
  canvas.playOnce = function() {
    if (this.done) {this.play();}
    this.once = true;
  };
  canvas.render = function() {
    this.done = true;
    draw(0);
  };
  canvas.stop = function() {this.once = true;};
  canvas.startT = null;
  ctx = canvas.getContext('2d');
  ctx.matchDPI();
  var Px = 800;
  var Py = 600;
  draw = function(T) {
    if (canvas.startT === null) {canvas.startT = T;}
    t = T-canvas.startT;
    //console.log(t+"::"+T+"::"+canvas.startT);
    var done = false;
    if (canvas.once && t/Py >= 1 && ((t % Px) < Px/10 && (t % Py) < Py/50)) {
      t = 0;
      canvas.done = true;
    }
    ctx.clearRect(0,0,ctx.width,ctx.height);
    ctx.beginPath();
    ctx.arc(ctx.width/2,ctx.height/2,ctx.height/4,0,2*Math.PI,false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(
      ctx.width/2+(ctx.height/6)*Math.sin(t/Px*2*Math.PI),
      ctx.height/2+(ctx.height/8-ctx.height/2)*Math.cos(t/Py*2*Math.PI),
      ctx.height/14+ctx.height/28*Math.sin(t/Py*2*Math.PI),
      0,
      2*Math.PI,
      false
    );
    if (Math.sin(t/Py*2*Math.PI) >= 0) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(255,255,255,'+(0.9+0.1*Math.sin(t/Py*2*Math.PI))+')';
    ctx.fill();
    ctx.closePath();
    if (!canvas.done) {
      requestAnimationFrame(draw);
    }
    else {
      canvas.startT = null;
    }
  };
  canvas.render();
});
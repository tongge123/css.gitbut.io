var box = document.getElementById('box');
var box1 = document.getElementById('box1');
var start = document.getElementById('start');
var js = document.getElementById('js');
var score1 = document.getElementById('score');
var zt = document.getElementById('zt');
var jx = document.getElementById('jx');

var contentClass = box.currentStyle ? box.currentStyle : window.getComputedStyle(box, null);
var stageSizeX = parseInt(contentClass.width);
var stageSizeY = parseInt(contentClass.height);

var score=0;

var planxiao = {
	width: 34,
	height: 24,
	imgsrc: './img/enemy-plane-s.png',
	baosrc: './img/enemy-plane-s-boom.gif',
	baotime: 100,
	hp: 1,
	spead: 10
};

var planzhong = {
	width: 46,
	height: 60,
	hitSrc: './img/enemy-plane-m-hit.png.png',
	imgsrc: './img/enemy-plane-m.png',
	baosrc: './img/enemy-plane-m-boom.gif',
	baotime: 100,
	hp: 5,
	spead: 5
};

var planda = {
	width: 110,
	height: 164,
	hitSrc: './img/enemy-plane-l-hit.png.png',
	imgsrc: './img/enemy-plane-l.png',
	baosrc: './img/enemy-plane-l-boom.gif',
	baotime: 100,
	hp: 15,
	spead: 5
};
var ourPlaneX = {
	width: 66,
	height: 80,
	imgsrc: './img/our-plane.gif',
	baosrc: './img/our-plane-boom.gif ',
	boomTime: 100,
	hp: 1
};
var bulletX = {
	width: 6,
	height: 14,
	imgsrc: './img/our-bullet.png',
	spead: -10
};

var plane = function(centerX, centerY, planemodel, spead) {
	this.centerX = centerX;
	this.centerY = centerY;
	this.sizeX = planemodel.width;
	this.sizeY = planemodel.height;
	this.imgsrc = planemodel.imgsrc;
	this.baosrc = planemodel.baosrc;
	this.baotime = planemodel.baotime;
	this.hitSrc=planemodel.hitSrc;
	this.hp = planemodel.hp;
	this.spead = planemodel.spead;
	this.currentX = this.centerX - this.sizeX / 2;
	this.currentY = this.centerY - this.sizeY / 2;
}

plane.prototype.draw = function() {
	this.imgNode = new Image();
	this.imgNode.src = this.imgsrc;
	this.imgNode.style.top = this.centerY - this.sizeY / 2 + 'px';
	this.imgNode.style.left = this.centerX - this.sizeX / 2 + 'px';
	box1.appendChild(this.imgNode);
}

plane.prototype.move = function() {
	this.currentY += this.spead;
	this.centerY = this.currentY + this.sizeY / 2;
	this.imgNode.style.top = this.currentY + 'px';
	this.checkOverRange();
}

plane.prototype.checkOverRange = function() {
	this.isBottomRange = this.currentY > (stageSizeY - this.sizeY);
	this.isTopRange = this.currentY < 0;
}
var Enemy = function() {
	this.segments = [];
	this.generatedCound = 0;
};
var randomNimber = function(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

Enemy.prototype.createNewEnemy = function() {
	this.generatedCound++;
	if(this.generatedCound % 11 === 0) {
		this.newEnemy = new plane(randomNimber(planda.width / 2, stageSizeX - planda.width / 2), 12, planda, 5);
	} else if(this.generatedCound % 5 === 0) {
		this.newEnemy = new plane(randomNimber(planzhong.width / 2, stageSizeX - planzhong.width / 2), 12, planzhong, (2, 5));
	} else {
		this.newEnemy = new plane(randomNimber(planxiao.width / 2, stageSizeX - planxiao.width / 2), 12, planxiao, (5, 10));
	}
	this.segments.push(this.newEnemy);
	this.newEnemy.draw();
}

Enemy.prototype.moveAllEnemy = function() {
	for(var i = 0; i < this.segments.length; i++) {
		this.segments[i].move();
		if(this.segments[i].isBottomRange) {
			box1.removeChild(this.segments[i].imgNode);
			this.segments.splice(i, 1);
		}
		for(var j = 0; j < ourPlane.segement.length; j++) {
			if(this.segments[i].hp > 0) {
				var hor = Math.abs(this.segments[i].centerX - ourPlane.segement[j].centerX) < (this.segments[i].sizeX + ourPlane.segement[j].sizeX)
				var ver = Math.abs(this.segments[i].centerY - ourPlane.segement[j].centerY) < (this.segments[i].sizeY + ourPlane.segement[j].sizeY)
				var he = hor && ver;
				if(he) {
					
					score++;
					score1.innerHTML = score;
					this.segments[i].imgNode.src = this.segments[i].hitSrc ? this.segments[i].hitSrc : this.segments[i].baosrc;
                    this.segments[i].hp--;
                    box1.removeChild(ourPlane.segement[j].imgNode);
					ourPlane.segement.splice(j, 1);
//					console.log(this.segments[i].hp);
				}
			}
		}
		if(this.segments[i].hp <= 0) {
			this.segments[i].baotime -=10 ;
			this.segments[i].imgNode.src = this.segments[i].baosrc;
//			console.log(this.segments[i].baotime);
			if(this.segments[i].baotime <= 0) {
				box1.removeChild(this.segments[i].imgNode);
				this.segments.splice(i, 1);
			}
		}
				var ourH = Math.abs(this.segments[i].centerX - ourPlane.centerX) < (this.segments[i].sizeX / 2 + ourPlane.sizeX / 2);
				var ourV = Math.abs(this.segments[i].centerY - ourPlane.centerY) < (this.segments[i].sizeY / 2 + ourPlane.sizeY / 2);
				var ourhe = ourH && ourV;
				if(ourhe) {
					this.segments[i].hp = 0;
					this.segments[i].imgNode.src=this.segments[i].baosrc;
					ourPlane.hp--;
					console.log(ourPlane.hp);
					
//					ourPlane.imgNode.src=ourPlane.baosrc;
				}
	}

}

var ourPlane = new plane(stageSizeX / 2, stageSizeY - ourPlaneX.height / 2, ourPlaneX, 0);
ourPlane.draw();

box1.onmousemove = function(event) {
	ourPlane.centerX = event.clientX - box.offsetLeft;
	if(ourPlane.centerX < 0) {
		ourPlane.centerX = 0
	}
	if(ourPlane.centerX > stageSizeX) {
		ourPlane.centerX = stageSizeX;
	}
	ourPlane.centerY = event.clientY - box.offsetTop;
	if(ourPlane.centerY < 0) {
		ourPlane.centerY = 0;
	}
	if(ourPlane.centerY > (stageSizeY - ourPlane.sizeY / 2)) {
		ourPlane.centerY = (stageSizeY - ourPlane.sizeY / 2);
	}
	ourPlane.currentX = ourPlane.centerX - ourPlane.sizeX / 2;
	ourPlane.currentY = ourPlane.centerY - ourPlane.sizeY / 2;
	ourPlane.imgNode.style.left = ourPlane.currentX + 'px';
	ourPlane.imgNode.style.top = ourPlane.currentY + 'px';
}

ourPlane.segement = [];
var bullet = plane;

function creatNewbullet() {
	ourPlane.newbullet = new bullet(ourPlane.centerX, ourPlane.centerY - ourPlane.sizeY / 2, bulletX, -10);
	ourPlane.segement.push(ourPlane.newbullet);
	ourPlane.newbullet.draw();
}

function moveNewBullet() {
	for(var i = 0; i < ourPlane.segement.length; i++) {
		ourPlane.segement[i].move();
		if(ourPlane.segement[i].isTopRange) {
			box1.removeChild(ourPlane.segement[i].imgNode);
			ourPlane.segement.splice(i, 1);
		}
	}
}

var enemies = new Enemy();
var time = 0;
var timeid;
var gameOver=function(){
	ourPlane.imgNode.src=ourPlane.baosrc;
	clearInterval(timeid);
	js.style.display='block';
	document.querySelector('p#fs').innerText=score;
}
var start=function(){
	box1.style.display='block';
//	box.style.display='none';
	zt.style.display='none';
	js.style.display='none';
timeid= setInterval(function() {
	time++;
	if(time % 20 === 0) {
		enemies.createNewEnemy();
	}
	enemies.moveAllEnemy();
	if(time % 5 === 0) {
		creatNewbullet();
	}
	moveNewBullet();
	if(ourPlane.hp<=0){
		gameOver();
	}
 }, 100)
}
jx.onclick=function(ev){
	ev.stopPropagation();
	start();
}
var cxin=function(){
	window.location.reload();
}
 box1.onclick=function(){
 	clearTimeout(timeid);
 	zt.style.display='block';
 }

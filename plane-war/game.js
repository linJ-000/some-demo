var stage = {
	W: null,
	/*画布宽*/
	H: null,
	/*画布高*/
	context: null,
	/*canvas执行上下文*/
	emenys: [],
	/*敌机数组*/
	plane: null,
	/*飞机对象*/
	bullets: [],
	/*子弹数组*/
	emenyNum: 20,
	/*敌机数组长度*/
	score: 0,
	/*分数，击落敌机数量*/
	outside: 0,/*飞机是否触碰到边界 0:不出界，37：左触界；38：上触界；39：右触界；40：下触界*/

	/*初始化*/
	init: function(global) {
		this.context = global.ctx;
		this.W = global.W;
		this.H = global.H;
		this.plane = this.newPlane();
		for (var i = 0, l = this.emenyNum; i < l; i++) {
			var emeny = this.newEmeny({
				left: this.W + Math.random() * this.W,
				top: Math.random() * this.H
			});
			this.emenys.push(emeny);
		}
		setInterval(function() {
			this.render();
			this.update();
		}.bind(this), 50);

		document.addEventListener('keydown', function(e) {
			var key = e.keyCode;
			if (key == 32) {
				this.shoot();
			}else{
				this.plane.move(key, this.outside);
			}
		}.bind(this));
	},

	/*创建飞机*/
	newPlane: function(obj) {
		var obj = obj || {}; //不传参时将obj定义为空数组，否则会找不到obj.width报错
		return {
			width: obj.width || 50,
			height: obj.height || 50,
			moveSpeed: obj.moveSpeed || 10,
			top: obj.top || 50,
			left: obj.left || 50,
			color: obj.color || 'red',
			move: function(key, outside) {
				if(key === 37 && outside !== 37){
					this.left -= this.moveSpeed;
				}else if(key === 38 && outside !== 38){
					this.top -= this.moveSpeed;
				}else if(key === 39 && outside !== 39){
					this.left += this.moveSpeed;
				}else if(key === 40 && outside !== 40){
					this.top += this.moveSpeed;
				}else{
					return;
				}
			console.log(this.outside)
			}
		}
	},

	/*创建敌机*/
	newEmeny: function(obj) {
		var obj = obj || {};
		return {
			width: obj.width || 35,
			height: obj.height || 35,
			moveSpeed: obj.moveSpeed || 5, //速度
			top: obj.top,
			left: obj.left,
			color: obj.color || 'black',
			HP: obj.HP || 1, //血量
			move: function() {
				this.left -= this.moveSpeed;
			}
		}
	},

	/*创建子弹*/
	newBullets: function(obj) {
		var obj = obj || {};
		console.log(obj)
		return {
			width: obj.width || 10,
			height: obj.height || 5,
			moveSpeed: obj.moveSpeed || 3,
			top: obj.top,
			left: obj.left,
			color: obj.color || 'blue',
			atk: obj.atk || 1, //每颗子弹的伤害
			move: function() {
				this.left += this.moveSpeed;
			}
		}
	},

	shoot: function() {
		var bullet = this.newBullets({
			left: this.plane.left + this.plane.width,
			top: this.plane.top + this.plane.height / 2,
		});
		this.bullets.push(bullet);
	},

	collisionTest: function() {
		var bullets = this.bullets;
		var emenys = this.emenys;
		var cxt = this.context;
		
		for(var i=0,l=emenys.length; i<l; i++){
			cxt.rect(emenys[i].left, emenys[i].top, emenys[i].width, emenys[i].height);
			for(var j=0,k=bullets.length; j<k; j++){
				/*子弹击中目标*/
				if(cxt.isPointInPath(bullets[j].left+bullets[j].width, bullets[j].top) 
					|| cxt.isPointInPath(bullets[j].left+bullets[j].width, bullets[j].top+bullets[j].height)){
					emenys[i].HP -= bullets[j].atk;
					bullets.slice(j, 1);
					if(emenys[i].HP == 0){
						this.score += 1;
						console.log('score:'+this.score);
					}
				}
				/*飞机被敌机击中*/
				if(cxt.isPointInPath(this.plane.left+this.plane.width, this.plane.top)
					|| cxt.isPointInPath(this.plane.left+this.plane.width, this.plane.top+this.plane.height)){
					alert("GG");
				}
			}
		}
	},

	/*渲染*/
	render: function() {
		var cxt = this.context;
		var plane = this.plane;
		var emenys = this.emenys;
		var bullets = this.bullets;
		/*清空全屏*/
		cxt.clearRect(0, 0, this.W, this.H);
		/*绘制飞机*/
		cxt.fillStyle = this.plane.color;
		cxt.fillRect(plane.left, plane.top, plane.width, plane.height);
		/*绘制敌机*/
		for (var i = 0, l = emenys.length; i < l; i++) {
			cxt.fillStyle = emenys[i].color;
			cxt.fillRect(emenys[i].left, emenys[i].top, emenys[i].width, emenys[i].height);
		}
		/*绘制子弹*/
		for (var i = 0, l = bullets.length; i < l; i++) {
			cxt.fillStyle = bullets[i].color;
			cxt.fillRect(bullets[i].left, bullets[i].top, bullets[i].width, bullets[i].height);
		}
	},

	/*数据检测更新*/
	update: function() {
		this.collisionTest();
		/*补充敌机*/
		var diff = this.emenyNum - this.emenys.length;
		console.log("差飞机"+diff)
		if(diff > 0){
			for(var i=0; i<diff; i++){
				var emeny = this.newEmeny({
					left: this.W + Math.random() * this.W,
					top: Math.random() * this.H
				});
				this.emenys.push(emeny);
			}
		}

		for (var i = 0, l = this.emenys.length; i < l; i++) {
			/*防止敌机上下出界*/
			if (this.emenys[i].top <= 0) {
				this.emenys[i].top = 0;
			}else if(this.emenys[i].top >= this.H - this.emenys[i].height) {
				this.emenys[i].top = this.H - this.emenys[i].height;
			}
			/*清除出屏幕的敌机*/
			if(this.emenys[i].left-this.emenys[i].width <= 0){
				this.emenys.slice(i, 1);
			}
			/*移动*/
			this.emenys[i].move();
		}
		for (var i = 0, l = this.bullets.length; i < l; i++) {
			/*清除出屏幕的子弹*/
			if(this.bullets[i].left > this.W){
				this.bullets.slice(i, 1);
			}
			/*移动*/
			this.bullets[i].move();
		}

		/*不让飞机飞出屏幕*/
		if(this.plane.left <= 0){
			this.outside = 37;
		}else if(this.plane.top <= 0){
			this.outside = 38;
		}else if(this.plane.left >= this.W - this.plane.width){
			this.outside = 39;
		}else if(this.plane.top >= this.H - this.plane.height){
			this.outside = 40;
		}else{
			this.outside = 0;
		}
	}
}
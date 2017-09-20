function Clock(){
		this.sel1 = null;
		this.sel2 = null;
		this.sel3 = null;
		this.sel4 = null;
		this.min = new Array();
		this.state = 0;
		this.time = 1500;
		
		this.count = function(){
			this.time--;
		}
		this.trans = function(){
			var a = Math.floor(this.time / 60);
			var b = Math.floor(this.time % 60);
			this.min[0] = Math.floor(a/10);
			this.min[1] = Math.floor(a%10);
			this.min[2] = Math.floor(b/10);
			this.min[3] = Math.floor(b%10);
		}
		this.show = function(){
			this.sel1.innerHTML = this.min[0];
			this.sel2.innerHTML = this.min[1];
			this.sel3.innerHTML = this.min[2];
			this.sel4.innerHTML = this.min[3];
		}
		this.bind = function(a, b, c, d){
			this.sel1 = document.getElementById(a);
			this.sel2 = document.getElementById(b);
			this.sel3 = document.getElementById(c);
			this.sel4 = document.getElementById(d);
		}
		this.setTime = function(){
			var a = parseInt(this.sel1.innerText);
			var b = parseInt(this.sel2.innerText);
			var c = parseInt(this.sel3.innerText);
			var d = parseInt(this.sel4.innerText);
			this.time = (a*10+b)*60+c*10+d;
		}
		this.init = function(){
			this.state = 1;
			var foo = setInterval(function(){
				if(this.time <= 0){
					this.state = 0;
					this.time = 0;
					clearInterval(foo);
				}else{
					this.count();
					this.trans();
					this.show();
				}			
			}.bind(this), 1000);
		}
	}
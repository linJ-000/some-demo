function Stage(){
	this.items = new Array();
	this.save = function(){
		this.rank();
		var items = JSON.stringify(this.items);
		localStorage.setItem("items", items);
	}
	this.get = function(){
		if(localStorage.getItem("items")){
			this.items = JSON.parse(localStorage.getItem("items"));
		}else{
			this.items = new Array();
		}
	}
	this.del = function(x){
		this.items.splice(x, 1);
		this.save();
	}
	this.empty = function(){
		localStorage.removeItem("items");
	}
	this.add = function(value){
		this.items.unshift(value);
		this.save();
	}
	this.strike = function(x){
		this.items[x].line == 1 ? this.items[x].line = 0 : this.items[x].line = 1;
		console.log(this.items[x].line)
		this.save();
	}
	this.show = function(ctx){
		this.get();
		var inner = '';
		if(!this.items){
			return;
		}
		for(var i=0; i<this.items.length; i++){
			if(this.items[i].line == 0){
				inner += '<div class="item" id='+i+'><div class="del">&times;</div><div class="content">'+
				this.items[i].content + '</div></div>';
			}else{
				inner += '<div class="item line" id='+i+'><div class="del">&times;</div><div class="content">'+
				this.items[i].content + '</div></div>';
			}
			
		}
		ctx.innerHTML = inner;
	}
	this.rank = function(){
		this.items.sort(function(a){
			if(a.line == 1){
				return 1;
			}else{
				return -1;
			}
		});
	}
}
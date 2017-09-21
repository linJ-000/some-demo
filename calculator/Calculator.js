function Calculator(id){
	this.value = 0;
	this.topVal = null;
	this.input = null;
	this.bracket = 0;
	this.screen = document.getElementById(id);//显示屏

	this.checkInput = function(ctx){
		this.input = ctx.innerHTML;
		if(this.value.length>=18 && this.input!='C' && this.input!='←' && this.input!='='){
			alert('无法输入更多了');
			return;
		}
		var num = null;
		for(var i=0; i<10; i++){
			if(this.input == i){
				num = true;
			}
		}
		if(this.value==0 && num == true){
			console.log('初始赋值')
			this.value = this.input;
		}else if(this.input === '()'){
			this.bracket++;
		}else if(this.input === 'C'){
			this.value = 0;
		}else if(this.input === '←'){
			console.log('后退'+this.value.length)
			if(this.value !== 0){
				this.value = this.value.substring(0, this.value.length - 1);
			}
			if(this.value.length == 0){
				console.log('ss')
				this.value = 0;
			}
			console.log(this.value.length)
		}else if(this.input == '='){
			console.log('计算结果')
			this.cal();
		}else{
			console.log('正常输入')
			this.value += this.input;
		}
		this.show();

	}
	this.cal = function(){
		try{
			this.value = eval(this.value).toString();
			if(this.value.length >=18 ){
				alert('结果超出屏幕');
				this.init();
			}
		}catch(e){
			alert('错误操作');
			this.init();
		}
	}
	this.show = function(){
		this.screen.innerHTML = this.value;
	}
	this.init = function(){
		this.value = 0;
		this.input = [];
		this.show();
	}
}
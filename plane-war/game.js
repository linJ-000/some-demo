(function(){

	var W = $("#stage").width();
	var H = $("#stage").height();
	var emenyNum = 30;
	var score = 0;
	var gg = 0;
	
	/* init */
	function init() {
		gg = 0;
		score = 0;
		
		$("#stage").empty();
		$("<div></div>").attr("id","score").appendTo("#stage").text("score:"+score);
		newPlane();
		for(var i=0,l=emenyNum; i<l; i++){
			newEmeny();
		}

		test();
	}

	/* creat plane */
	function newPlane() {
		var top = "150px";
		var left = "60px";
		
		$("<div></div>").attr("id", "plane").appendTo("#stage").css({
			top: top,
			left: left
		});
	}

	/* creat emeny plane */
	function newEmeny() {
		var speed = 0.25;
		var X = "-120px";
		var top = Math.random() * (H - 120);
		var left = Math.random() * W + W;
		var duration = left/speed;
		
		$("<div></div>").addClass("emeny").appendTo("#stage").css({
			top: top,
			left: left
		}).animate({
			left: X,
		}, duration, "linear", function(){
			$(this).remove();
			newEmeny();
		});
	}

	/* shoot */
	function shoot() {		
		var speed = 0.5;
		var X = W + 4;
		var top = $("#plane").css("top").rmpx()*1 + $("#plane").css("height").rmpx()/2;
		var left = $("#plane").css("left").rmpx()*1 + $("#plane").css("width").rmpx()*1;
		var duration = (W - left)/speed;
		
		$("<div></div>").addClass("bullet").appendTo("#stage").css({
			top: top,
			left: left
		}).animate({
			left: X
		}, duration, "linear", function(){
			$(this).remove();
		});
	}

	/* plane move*/
	function move(e){
		switch(e){
			case 37:
				$("#plane").stop().animate({left: "-=100px"});
				break;
			case 38:
				$("#plane").stop().animate({top: "-=100px"});
				break;
			case 39:
				$("#plane").stop().animate({left: "+=100px"});
				break;
			case 40:
				$("#plane").stop().animate({top: "+=100px"});
			default:
				return;
		}
	}

	function test(){
		var ew = 120,	/* emeny width */
			eh = 120,	/* emeny height */
			pw = 200,	/* plane width */
			ph = 200,	/* plane height */
			bw = 8,		/* bullet width */
			bh = 4;		/* bullet height */
		
		$(".emeny").each(function(){
			var ex = $(this).css("left").rmpx()*1,		/* emeny left */
				ey = $(this).css("top").rmpx()*1,		/* emeny top */
				px = $("#plane").css("left").rmpx()*1,	/* plane left */
				py = $("#plane").css("top").rmpx()*1;	/* plane top */
			var this_emeny = $(this);

			/* gg */
			if(rcd({x1:ex,y1:ey,w1:ew,h1:eh,x2:px,y2:py,w2:pw,h2:ph})){
				gg = 1;
				$(".emeny").stop();
				$(".bullet").stop();
				$("#end").show();
			}
			
			$(".bullet").each(function(){
				var bx = $(this).css("left").rmpx()*1,
					by = $(this).css("top").rmpx()*1;
				if(rcd({x1:ex,y1:ey,w1:ew,h1:eh,x2:bx,y2:by,w2:bw,h2:bh})){
					score += 1;
					$(this).remove();
					this_emeny.remove();
					$("#score").text("score:"+score);
				}
			});
		});

		setTimeout(function(){
			return test();
		}, 60);
	}

	/* rect collision detection */
	/*param
	*obj = {
	*	x1,y1,w1,h1,x2,y2,w2,h2
	*}
	**/
	function rcd(obj) {
		var dx = Math.floor(Math.abs((obj.x1+obj.w1/2)-(obj.x2+obj.w2/2)));
		var dy = Math.floor(Math.abs((obj.y1+obj.h1/2)-(obj.y2+obj.h2/2)));
		if(dx <= (obj.w1+obj.w2)/2 && dy <= (obj.h1+obj.h2)/2){
			return 1;
		}
	}

	/* remove "px" in string */
	String.prototype.rmpx = function(){
		return this.substring(0, this.length-2)
	}

	/* keydown listener */
	$(window).on("keydown", function(event){
		if(gg == 1)return;

		if(event.keyCode == 32){
			shoot();
		}else{
			move(event.keyCode);
		}
	});
	
	/* start */
	$("#startBtn").click(function(){
		$("#start").hide();
		init();
	});
	
	/* restart */
	$("#reStartBtn").click(function(){
		$("#end").hide();
		init();
	});

})();
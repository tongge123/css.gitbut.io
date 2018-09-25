var box1=document.getElementById('box1');
var box2=document.getElementById('box2');
var Carchilk=true;
box1.onclick=function(){
	if(Carchilk=true){
		Carchilk=false;
		var number=Math.floor(Math.random( ) * 100);
		var shuchu;
		if(number<1){
			shuchu={
				code:1,
				Text: "一等奖"
			};
		}
		else if(number<5){
			shuchu={
				code:2,
				Text: "二等奖"
			};
		}
		else if(number<10){
			shuchu={
				code:3,
				Text: "三等奖"
			};
		}
		else if(number<20){
			shuchu={
				code:4,
				Text: "四等奖"
			};
		}
		else if(number<35){
			shuchu={
				code:5,
				Text: "五等奖"
			};
		}
		else if(number<50){
			shuchu={
				code:6,
				Text: "六等奖"
			};
		}
		else{
			shuchu={
				code:7,
				Text:"谢谢参与"
			};
		}
		console.log(shuchu);
		var zhuan=30+(360/7)*(shuchu.code-1);
		box2.style.transition='all 3s';
		box2.style.transform='rotate('+(zhuan+360*4)+'deg)';
		setTimeout(function() 
		{
			box2.style.transition='all 0s';
			box2.style.transform='rotate('+zhuan+'deg)';
			alert(shuchu.Text);
			Carchilk=true;
		},3000);
		
		
	}
}
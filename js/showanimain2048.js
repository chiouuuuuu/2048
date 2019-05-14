function showNumWithAnimation(i,j,randNumber){
	var numCell=$("#number-cell-"+i+'-'+j);
	numCell.css("background","black");
	numCell.css("color","white");
	numCell.text(randNumber);
	
	numCell.animate({
		width:"100px",
		height:"100px",
		left:getPos(j),
		top:getPos(i)
	},50);
}
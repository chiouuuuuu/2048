var score=0;
var board=new Array();
var add=new Array();
$(document).ready(function(){
	newGame();
})

function newGame(){
	init();
	getANewNum();
	getANewNum();
}

function init(){
	score=100;
	document.getElementById("score").innerHTML=score;
	// alert(s);
	var arr=$(".grid-cell");
	console.log(arr.length);
	var cnt=0;
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			arr[cnt].style.top=getPos(i);
			arr[cnt].style.left=getPos(j);
			cnt++;
		}
	}
	board=initArr(board);
	add=initArr(add);
	updateBoardView();
}

function updateBoardView(){//更新数组的前端样式
    $(".number-cell").remove();
    for(var i = 0;i<4;i++){
        for ( var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPos(i));
                theNumberCell.css('left',getPos(j));
            }else{
                theNumberCell.css('width','100px');
                theNumberCell.css('hegiht','100px');
                theNumberCell.css('top',getPos(i));
                theNumberCell.css('left',getPos(j));
                //NumberCell覆盖
                theNumberCell.css('background-color',"#000");//返回背景色
                theNumberCell.css('color','#fff');//返回前景色
                theNumberCell.text(board[i][j]);
            }
        }
    }
}

function getANewNum(){
	if(!isSpace(board))//have space return true
		return false;
	var randx=Math.floor(Math.random()*4);
	var randy=Math.floor(Math.random()*4);
	
	while(true){
		if(board[randx][randy]==0)
			break;
		var randx=Math.floor(Math.random()*4);
		var randy=Math.floor(Math.random()*4);
	}
	
	board[randx][randy]=Math.random()<0.5?2:4;
	showNumWithAnimation(randx,randy,board[randx][randy]);
	return true;
}

function showMoveAnimation(from_x,from_y,to_x,to_y){
	var numberCell=$("#number-cell-"+from_x+"-"+from_y);
	numberCell.animate({
		top:getPos(to_x),
		left:getPos(to_y)
	},200);
}

function moveLeft(board){
	var flag=false;
	for(var i=0;i<4;i++){
		for(var j=1,k=0;j<4;j++){
			if(board[i][j]>0){
				if(board[i][j]==board[i][k]){
					board[i][k++]*=2;
					board[i][j]=0;
					flag=true;//需要生成数字
					showMoveAnimation(i,j,i,k);
				}
				else if(board[i][k]==0){
					board[i][k]=board[i][j];
					board[i][j]=0;
					showMoveAnimation(i,j,i,k);
					flag=true;//需要生成数字
				}
				else{
					board[i][++k]=board[i][j];
					if(j!=k){
						board[i][j]=0;
						flag=true;//需要生成数字
					}
					showMoveAnimation(i,j,i,k);
				}
			}
		}
	}
	return flag;
}

function moveRight(){
	var flag=false;
	for(var i=0;i<4;i++){
		for(var j=2,k=3;j>=0;j--){
			if(board[i][j]>0){
				if(board[i][j]==board[i][k]){
					board[i][k--]*=2;
					board[i][j]=0;
					showMoveAnimation(i,j,i,k);
					flag=true;
				}
				else if(board[i][k]==0){
					board[i][k]=board[i][j];
					board[i][j]=0;
					showMoveAnimation(i,j,i,k);
					flag=true;
				}
				else{
					board[i][--k]=board[i][j];
					if(j!=k){
						board[i][j]=0;
						flag=true;
					}
					showMoveAnimation(i,j,i,k);
				}
			}
		}
	}
	return flag;
}

function moveUp(board){
	var flag=false;
	for(var i=0;i<4;i++){
		for(var j=1,k=0;j<4;j++){
			if(board[j][i]>0){
				if(board[j][i]==board[k][i]){
					board[k++][i]*=2;
					board[j][i]=0;
					flag=true;
					showMoveAnimation(j,i,k,i);
				}
				else if(board[k][i]==0){
					board[k][i]=board[j][i];
					board[j][i]=0;
					flag=true;
					showMoveAnimation(j,i,k,i);
				}
				else{
					board[++k][i]=board[j][i];
					if(k!=j){
						board[j][i]=0;
						flag=true;
					}
					showMoveAnimation(j,i,k,i);
				}
			}
		}
	}
	return flag;
}

function moveDown(){
	var flag=false;
	for(var i=0;i<4;i++){
		for(var j=2,k=3;j>=0;j--){
			if(board[j][i]>0){
				if(board[j][i]==board[k][i]){
					board[k][i]*=2;
					board[j][i]=0;
					showMoveAnimation(j,i,k,i);
					flag=true;
				}
				else if(board[k][i]==0){
					board[k][i]=board[j][i];
					board[j][i]=0;
					showMoveAnimation(j,i,k,i);
					flag=true;
				}
				else{
					board[--k][i]=board[j][i];
					if(k!=j){
						board[j][i]=0;
						flag=true;
					}
					showMoveAnimation(j,i,k,i);
				}
			}
		}
	}
	return flag;
}

$(document).keydown(function(event){
	switch (event.keyCode){
		case 37:
		if(moveLeft(board)){
			getANewNum();
		setInterval(updateBoardView,200);
		}
		break;
		case 38:
		if(moveUp(board)){
			getANewNum();
		setInterval(updateBoardView,200);
		}
		break;
		case 39:
		if(moveRight(board)){
			getANewNum();
		setInterval(updateBoardView,200);
		}
		break;
		case 40:
		if(moveDown(board)){
			getANewNum();
		setInterval(updateBoardView,200);
		}
		break;
	}
})
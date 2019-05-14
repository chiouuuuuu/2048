function getPos(n){//i => y  j=>x
	return n*120+20+'px';
}

function isSpace(arr){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(arr[i][j]=='0'){
				return true;
			}
		}
	}
	return false;
}

function initArr(arr){
	for(var i=0;i<4;i++){
		arr[i]=new Array();
		for(var j=0;j<4;j++){
			arr[i][j]=0;
		}
	}
	return arr;
}


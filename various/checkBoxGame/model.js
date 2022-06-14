
NOT_FOUND = -1;


function randomInt(max){

	return Math.floor(Math.random()*max) ;

}


function isEven(number){
	return  number % 2 == 0 ;

}



breakNumberInEveryPossibleWays=function(number){

	if(number==0){
		alert("error in breakNumberInEveryPossibleWays()");
		return;
	}


	var result = [];

  for(var i=0;i<number;++i)
	for(var j=0;j<=i;++j)
		if(i+j<number)
			result.push([i,j]);

	


/*

for 1:
00


for 2:
00
10

for 3:
00
10
11
20

for 4:
00
10
11
20
21
30

for 5:
00
10
11
20
21
22
30
31
40


*/



	return result;

}



function cloneArr(arr){
	return arr.concat([]);
}




breakNumber=function(arr,index,first,second){


	if(first+second>=arr[index]){
		alert("error in breakNumber():\narr: "+arr+"\nindex:"+index+"\nfirst:"+first+"\nsecond:"+second);
		return;
	}

	if(first==0  &&  second==0 ){
		arr.splice(index,1);
		return;
	}



	if(first==0){
		arr[index]=second;
		return;
	}

	if(second==0){
		arr[index]=first;
		return;
	}


	arr[index]=first;
	arr.push(second);

}



function removeEvenOnes(arr){
 while (  arr[0]==1 && arr[1]==1){
    
      arr.splice(0,2);
 }

}



function sortAsNumbers(arr){

	arr.sort( function compareNumbers(a, b) {   return a - b}  );

} 



// for [1,2,2,2,3,3,4] will return [1,2,4]
function removePairsFromASortedArray(arr){

	for(var i=0;i<arr.length-1;++i){
		while(arr[i]==arr[i+1]){
			arr.splice(i,2);
			if ( arr.length==0 )
				return;
			--i;
		}
		

	}

	


} 




function getRandomMove(arr){

  var allPossibleMoves = [];

  for(var i=0;i<arr.length;++i){

     var allPossibleBreaks = breakNumberInEveryPossibleWays(arr[i]);
     
          for(var j=0;j<allPossibleBreaks.length;++j){

		allPossibleMoves.push(  [arr[i],allPossibleBreaks[j][0],allPossibleBreaks[j][1]] );

	  }


  }


  return allPossibleMoves[  randomInt( allPossibleMoves.length ) ];

}




function findNumberInTheArray(arr,number){

	for(var i=0;i<arr.length;++i){

		if ( arr[i] == number ){
			return i;
		}

	}
	

	return NOT_FOUND;

}


function findEvenNumberInTheArray(arr){

	for(var i=0;i<arr.length;++i){

		if ( isEven( arr[i] ) ){
			return i;
		}

	}
	

	return NOT_FOUND;

}



function isWinningPosition(array, level){

	var arr = cloneArr(array);

	sortAsNumbers(arr);

	removeEvenOnes(arr);

	// handle [1,1], [1,1,1,1] etc
	if( arr.length==0 ){
		return false;
	}
     
      if (level > 0)
	// handle winning position [1]
	if( arr.length==1 && arr[0]==1 ){
		return true;
	}

      if (level > 1){

	removePairsFromASortedArray(arr);

	// handle winning positions  like [2,2], [3,3], [4,4], [5,5], [2,2,4,4,5,5] etc.
	if( arr.length==0 ){
		return true;
	}
     }

      if (level > 2){

	      if (level > 3){
	
		// handle winning positions  like [2,3,4,5], [4,5,6,7], [2,3,6,7] etc. (remove
		//such combinations from the array)
		while (arr.length!=0){

			var firstNumberIndex = findEvenNumberInTheArray(arr);
		
			if (firstNumberIndex==NOT_FOUND){
				break;
			}
	
			var firstNumber = arr[firstNumberIndex];
	
			arr.splice( firstNumberIndex, 1 );
	
	
	
			var secondNumberIndex = findNumberInTheArray(arr,firstNumber+1);
	
			if (secondNumberIndex==NOT_FOUND){
				arr.push(firstNumber);
				break;
			}
	
			var secondNumber = arr[secondNumberIndex];
	
			arr.splice( secondNumberIndex, 1 );
	
	
	
			var thirdNumberIndex = findEvenNumberInTheArray(arr);
		
			if (thirdNumberIndex==NOT_FOUND){
				arr.push(firstNumber);
				arr.push(secondNumber);
				break;
			}
	
			var thirdNumber = arr[thirdNumberIndex];
	
			arr.splice( thirdNumberIndex, 1 );
	
			var fourthNumberIndex = findNumberInTheArray(arr, thirdNumber + 1);
		
			if (fourthNumberIndex==NOT_FOUND){
				arr.push(firstNumber);
				arr.push(secondNumber);
				arr.push(thirdNumber);
				break;
			}
	
			var fourthNumber = arr[fourthNumberIndex];
	
			arr.splice( fourthNumberIndex, 1 );
	
	
			
		}  //while (arr.length!=0){
	
		if (arr.length==0)
			return true;

		sortAsNumbers(arr);

	
	    }  //  if (level > 3){
	
	
		
		// handle winning positions  like [1,2,3], [1,4,5], [1,6,7] etc.
		if( arr.length==3 && arr[0]==1 && isEven(arr[1]) && arr[2]==arr[1]+1 ){
			return true;
		}
	
	
      }  // if (level > 2){




	return false;

}


//to use in winIfPossible() and saveFromLosing()
function pattern(arr, level, toEval){


  var results = [];

  for(var i=0;i<arr.length;++i){

     var allPossibleBreaks = breakNumberInEveryPossibleWays(arr[i]);

     for(var j=0;j<allPossibleBreaks.length;++j){

        var clonedArr = cloneArr(arr);

	breakNumber(clonedArr,i,allPossibleBreaks[j][0],allPossibleBreaks[j][1]);

	if ( eval(toEval) )
		results.push( [ arr[i],allPossibleBreaks[j][0],allPossibleBreaks[j][1] ]);
	
     }
  }

     return results.length!=0 ? results[  randomInt( results.length ) ] : null;

}

function winInOneMoveIfPossible(arr, level){

   return pattern(arr, level, "isWinningPosition( clonedArr, level )" );
}



function saveFromLosing(arr, level){

   return pattern(arr, level, "winInOneMoveIfPossible(clonedArr, level)==null" );


}


//level is a number from 0 to 4
function getMove( arr, level ){

   var bestMove=winInOneMoveIfPossible(arr, level);

   if (bestMove==null){

	bestMove=saveFromLosing(arr, level);

   }
	
   return bestMove!=null ? bestMove :  getRandomMove(arr);


}






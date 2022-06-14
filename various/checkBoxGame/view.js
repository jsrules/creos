
BOARD = [3,5,7];

HUMAN=0;

COMPUTER=1;

WHO_MOVES_FIRST = HUMAN; 

MINIMAL_LEVEL=0;

MAXIMAL_LEVEL=3;

level=MAXIMAL_LEVEL-2;

CHECKBOX_SIZE="50px";

DONEBUTTON_HEIGHT="50px";

DONEBUTTON_WIDTH="300px";

DEFAULT_CHECKBOX_BACKGROUND_COLOR = "white";

CURRENT_MOVE_COLOR = "green";

HUMANS_DONE_MOVE_COLOR = "red";

COMPUTERS_DONE_MOVE_COLOR = "black";

possibleLineStart=-1;

possibleLineEnd=-1;

moveInProgress=false;

currentMoveCheckboxes=[];

lastMoveRow=-1;

lastMoveColumn=-1;

whoMoves=WHO_MOVES_FIRST;

COMMA=",";

checkboxesClickHandlerRecursionLevel=-1;

doneButton = null;

startAgainButton = null;

whoMovesDiv=null;

computerScore = 0;

humanScore = 0;

//b is the board (matrix of checkboxes)
b=[];



//gets 1 and 3 and returns string "1,3"
function createId(first,second){

	return first+COMMA+second;

}



//gets string like "1,3" and returns array [1,3]
function breakId(id){

	var pos = id.indexOf(COMMA);
	return [ parseInt(id.slice(0,pos)), parseInt(id.slice(pos+1,id.length))  ];

}


function addBR(){
		document.body.appendChild(document.createElement("br"));

}


function markCheckboxes(row, startColumn, endColumn){


	for(var i=startColumn;i<=endColumn;++i){

		b[row][i].parentElement.style.backgroundColor=CURRENT_MOVE_COLOR;

	}

}

function unmarkAllCheckboxes(){


	for(var i=0;i<BOARD.length;++i){

	
		for(var j=0;j<BOARD[i];++j){

			b[i][j].parentElement.style.backgroundColor=DEFAULT_CHECKBOX_BACKGROUND_COLOR;

		}
	}

}

function finishMoveAutomaticallyIfPossible(){



	for(var i=possibleLineStart;i<=possibleLineEnd;++i){
		if ( b[lastMoveRow][i].checked )
			return;

	}


	  doneButton.click();


	
}


checkboxClickHandler=function(){

	if (whoMoves==COMPUTER){
		return false;
	}

	checkboxesClickHandlerRecursionLevel++;

	var indexes=breakId(this.id);
	var row=indexes[0];
	var column=indexes[1];



	if (moveInProgress){



		if(lastMoveRow!=row || column<possibleLineStart || column>possibleLineEnd){
			checkboxesClickHandlerRecursionLevel--;
			return false;
		}

		if ( column>lastMoveColumn+1 ){	

			for(var i=lastMoveColumn+1;i<=column-1;++i){
				b[row][i].click();
			}

		}

		if ( column<lastMoveColumn-1 ){	

			for(var i=lastMoveColumn-1;i>=column+1;--i){
				b[row][i].click();
			}

		}

	}
	else {

		var k=column-1;
		while( k>=0 && b[row][k].checked )
		{
			 k--;
		}
	
		possibleLineStart=k+1;
	
	
	
		k=column+1;
	
	
		while( k<BOARD[row] && b[row][k].checked )
		{
			 k++;
		}
	
		possibleLineEnd=k-1;

      }

	if ( ! 	moveInProgress )
		markCheckboxes(row, possibleLineStart, possibleLineEnd);

	moveInProgress=true;

	this.disabled=true;

	currentMoveCheckboxes.push( b[row][column ] );

	lastMoveRow = row;

	lastMoveColumn = column;

	if ( checkboxesClickHandlerRecursionLevel==0 )
		finishMoveAutomaticallyIfPossible();

	checkboxesClickHandlerRecursionLevel--;



									

}  //checkboxClickHandler=function(){


startAgainButtonClickHandler=function(){
	computerScore++;
	drawBoard();
}


doneButtonClickHandler=function(){


		
	if (whoMoves==COMPUTER || ! moveInProgress){
		return;
	}

	doneButton.disabled = true;	

	startAgainButton.disabled = true;	

	moveInProgress=false;

	showMoveWhenDone();

	if ( isGameOver() ){
		computerScore++;
		redrawHeader();
		alert("Computer wins.");
		drawBoard();
		return;
	}

	whoMoves=COMPUTER;

	changeWhoMovesDiv();

	setTimeout( "makeComputerMove()", 500  );

}



function showMoveWhenDone(){

	unmarkAllCheckboxes();

	for(var i=0;i<currentMoveCheckboxes.length;++i){

		currentMoveCheckboxes[i].parentElement.style.backgroundColor= whoMoves==COMPUTER ? COMPUTERS_DONE_MOVE_COLOR : HUMANS_DONE_MOVE_COLOR;

	}

	currentMoveCheckboxes=[];	
	setTimeout( "unmarkAllCheckboxes()", 500  );
	
}




function changeWhoMovesDiv(){

	whoMovesDiv.innerHTML = "<b>" + (whoMoves==COMPUTER ? "Computer's turn.": "Your turn.") + "</b>"; 

}


function createLevelSelect(){

	var result = "Level (1-4): <select id='levelSelect'  onchange='level = this.selectedIndex'>";

	for(var i=MINIMAL_LEVEL+1;i<=MAXIMAL_LEVEL+1;++i)
			result+="<option> "+i+" </option>";

	result+="</select><br><br>";
	return result;

}




function resetScore(){
    humanScore=0;
    computerScore=0;
    redrawHeader();
}

function redrawHeader(){

		document.getElementById("header").innerHTML ="How to play:<br>"+
							   "Uncheck the checkboxes in a row.<br>"+
							   "Click \"Make move\" button when done.<br>"+
							    "If you uncheck the LAST checkbox, you will lose.<br><br>"+

							    createLevelSelect()+


							    "<b>Current score:</b><br>"+
							    "You:      "+humanScore+"<br>"+
							    "Computer: "+computerScore+
            "<BR><a href=\"#\" onclick=\"resetScore();\">Reset score</a><br>"+
            
            "<hr>";

		 document.getElementById('levelSelect').selectedIndex=level;

}

function drawBoard(){


	document.body.innerHTML = "<span id=header></span>";
/*
	var browser = navigator.appName;

	if (browser!="Microsoft Internet Explorer")

		alert("This game has been tested only for Microsoft\n Internet Explorer, and not for "+browser+".\n It is recommended that you re-open the game in Internet Explorer.");
*/	
	redrawHeader();

    moveInProgress=false;
    
    currentMoveCheckboxes=[];

    lastMoveRow=-1;

    lastMoveColumn=-1;
    
	whoMovesDiv = document.createElement("div");
	document.body.appendChild(whoMovesDiv);

	addBR();

	whoMoves=WHO_MOVES_FIRST;
	
	changeWhoMovesDiv();

	WHO_MOVES_FIRST = WHO_MOVES_FIRST == HUMAN ? COMPUTER :  HUMAN; 
	
	for(var i=0;i<BOARD.length;++i){

		b[i]=[];

		for(var j=0;j<BOARD[i];++j){
            
            var parentSpan=document.createElement("span");
            
            parentSpan.style.height=CHECKBOX_SIZE;

			parentSpan.style.width=CHECKBOX_SIZE;
            
            parentSpan.style.fontSize=parseInt(CHECKBOX_SIZE)+15+"px";
            
                       
			var checkbox = document.createElement("input");

			checkbox.type="checkbox";

			checkbox.id=createId(i,j);

			checkbox.style.height=CHECKBOX_SIZE;

			checkbox.style.width=CHECKBOX_SIZE;

			checkbox.onclick=checkboxClickHandler;
            
            parentSpan.appendChild(checkbox);

			document.body.appendChild(parentSpan);

			var checkboxElement = document.getElementById(checkbox.id);

			checkboxElement.checked=true;

			b[i].push(checkboxElement);

		}

		addBR();


	}


		addBR();

		doneButton = document.createElement("input");

		doneButton.type="submit";

		doneButton.value="         Make move        ";

		doneButton.style.height=DONEBUTTON_HEIGHT;

		doneButton.style.width=DONEBUTTON_WIDTH;

		doneButton.onclick=doneButtonClickHandler;

		doneButton.disabled=  whoMoves==COMPUTER ? true: false;

		document.body.appendChild(doneButton);


		spacesSpan = document.createElement("span");

		document.body.appendChild(spacesSpan);

		spacesSpan.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";


		startAgainButton = document.createElement("input");

		startAgainButton.type="submit";

		startAgainButton.value="  Resign (start again)  ";

		startAgainButton.style.height=DONEBUTTON_HEIGHT;

		startAgainButton.style.width=DONEBUTTON_WIDTH;

		startAgainButton.onclick=startAgainButtonClickHandler;


		if ( whoMoves==COMPUTER ){
			startAgainButton.disabled=true;
		}

		
		document.body.appendChild(startAgainButton);

addBR();addBR();addBR();


		var mainpageA= document.createElement("a");


  mainpageA.href="http://art4art.narod.ru/";


 mainpageA.innerHTML="Back to main page";

document.body.appendChild(mainpageA);


addBR();

		var endinghr= document.createElement("hr");
document.body.appendChild(endinghr);



		var thediv= document.createElement("div");
thediv.style.textAlign="center";

		var theimg= document.createElement("img");
theimg.src="emailWhite.jpg";


thediv.appendChild(theimg);
document.body.appendChild(thediv);




		unmarkAllCheckboxes();

		if ( whoMoves==COMPUTER ){
			setTimeout("makeComputerMove()",500);
		}


} //function drawBoard(){



function findRandomStartIndexOnTheBoardForANumber(number){

	var allStartEndIndexesOnTheBoardForThisNumber=[];

	var currNumber=0;

	var currStartColumnIndex=0;

	for(var i=0;i<BOARD.length;++i){

		for(var j=0;j<BOARD[i];++j){

			if (b[i][j].checked){
				currNumber++;
			}
			else{

				if (currNumber==number){
					allStartEndIndexesOnTheBoardForThisNumber.push(  [i,currStartColumnIndex] );
				}
				currNumber=0;
				currStartColumnIndex=j+1;

				
			}

		}

		if (currNumber==number){
				allStartEndIndexesOnTheBoardForThisNumber.push( [i,currStartColumnIndex] );
		}
		currNumber=0;
		currStartColumnIndex=0;

	}


	if ( allStartEndIndexesOnTheBoardForThisNumber.length==0 ){
		alert("error in findRandomStartEndIndexesOnTheBoardForANumber()");

	}

	return allStartEndIndexesOnTheBoardForThisNumber[  randomInt(  allStartEndIndexesOnTheBoardForThisNumber.length ) ];

}

function convertBoardToArrayOfNumbers(){

	var result=[];

	var currNumber=0;

	for(var i=0;i<BOARD.length;++i){

		for(var j=0;j<BOARD[i];++j){

			if (b[i][j].checked){
				currNumber++;
			}
			else if (currNumber!=0){
				result.push(currNumber);
				currNumber=0;
			}

		}

		if (currNumber!=0){
				result.push(currNumber);
				currNumber=0;
		}
	}

	return result;

}



function isGameOver(){

	for(var i=0;i<BOARD.length;++i){

		for(var j=0;j<BOARD[i];++j){

			if (b[i][j].checked){
				return false;
			}
		}

	}

	return true;

}




//e.g., gets 3,1,0 and returns [ [0,2],[1,2] ]
//e.g., gets 5,2,2 and returns [ [2,1] ]
//etc.
//TODO: think how to do this func. easier

function breakNumberInTwoInEveryPossibleWay( number, first, second ){  
  
  var length = number - first - second;
 
  //SUBFUNCTION of  breakNumberInTwoInEveryPossibleWay()
  var sub = function ( number, first, second ){


	for(var i=0;i<=number-length;++i){

		var currFirst = i;
		var currSecond = number - length - currFirst;

		if (  currFirst==first && currSecond==second )
			return currFirst;
	}
	
  }

  

  var res1 = sub(number,first,second);
  var res2 = sub(number,second, first);

  return  res1==res2 ? [ [res1,length] ]: [ [res1,length], [res2,length]  ]; 

   

}  //function breakNumberInTwoInEveryPossibleWay( number, first, second ){



//this func. does  the same as the func. above, 
//but if it has two results, it randomly returns one of them

function breakNumberInTwoRandomly( number, first, second ){  

	var allWays=breakNumberInTwoInEveryPossibleWay( number, first, second );
	return allWays[ randomInt( allWays.length ) ];

}



function makeComputerMove(){


	if (whoMoves==HUMAN){
		alert("error in makeComputerMove() ");
		return;
	}

    //"+1" is a quick fix
	var move=getMove(convertBoardToArrayOfNumbers(), level+1);  
    
	var randomStartIndexOnTheBoardForANumber=findRandomStartIndexOnTheBoardForANumber( move[0] );

	var row = randomStartIndexOnTheBoardForANumber[0];

	var startColumn = randomStartIndexOnTheBoardForANumber[1];

	var brokenNumber=breakNumberInTwoRandomly( move[0],move[1],move[2] );

	var startPosition =  brokenNumber[0];

	var howMany =  brokenNumber[1];

	for(var i=startColumn + startPosition;
                i<startColumn + startPosition + howMany;
                ++i){

		b[row][i].checked = false;
		b[row][i].disabled = true;
		currentMoveCheckboxes.push( b[row][i] );
	}

	showMoveWhenDone();

	if ( isGameOver() ){
		humanScore++;
		redrawHeader();
		alert("You win.");
		drawBoard();
		return;
	}

	whoMoves=HUMAN;

	changeWhoMovesDiv();

	doneButton.disabled=false;

	startAgainButton.disabled = false;

}



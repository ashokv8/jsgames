// MovementCounter
const currentMoves  = document.getElementById('currentMoves');
let moveCount = 0;
function updateMoveCount(resetVal){
    moveCount +=1;
    if (resetVal){
        moveCount = 0;
    }
    currentMoves.innerText = ""+moveCount;
}
// Game Globals
let totalX = 0;
let totalO = 0;
let gameOver = false;
let previousSize = 2;
let previosPosition = [];
let myBoardSize = 3; // This is the size displayed in the generateText
// Colors
let xColor = '#ffffff';
let oColor = '#2d545e';

// Main Game
const gameDiv = document.getElementById('gameDev');

function recreateBoard(boardSize , xPositions){
    // STEP :::: set defaults
    enableGameEndText(true);
    updateMoveCount(true);
    gameDiv.innerHTML = '';

    // STEP ::: Set Globals
    previousSize = boardSize;
    previosPosition = xPositions;

    const sqaureCount = boardSize;
    // STEP ::: Automatically set the grid layout
    var grid_columns = ""
    for(var i=0; i<sqaureCount; i++){
        grid_columns +="auto "
    }
    gameDiv.style.gridTemplateColumns = grid_columns;

    // STEP ::: Setting Game Counters
    totalX = xPositions.length;
    totalO = 0;
    gameOver = false;

    // STEP ::: Append buttons to the main Div
    for(let x=0; x<sqaureCount; x++){
        for(let y=0; y<sqaureCount; y++){
            let tempButton = document.createElement("button");
            let arrPos= parseInt((x*sqaureCount) + y);
            tempButton.setAttribute("id","Button_"+x+"_"+y);
            tempButton.setAttribute("x_val",x);
            tempButton.setAttribute("y_val",y);
            tempButton.setAttribute("array_pos",arrPos);
            if (xPositions.includes(arrPos)){
                tempButton.setAttribute("class","blocks hidden x-color");
                setXTile(tempButton);
            }else{
                setOTile(tempButton);
                tempButton.setAttribute("class","blocks hidden o-color");
            }
           
            tempButton.onclick = function(){ clickButton(tempButton);}
            gameDiv.appendChild(tempButton);
        }
    }
    animateButtons(gameDiv);
    // modifyCss()
}
function animateButtons(gameDiv){
    /** Animate the Buttons to appear in order */
    for(let i=0;i<gameDiv.childNodes.length;i++){
        
        let childButton = gameDiv.childNodes[i];
        let xPos= parseInt(childButton.getAttribute("x_val"));
        let yPos= parseInt(childButton.getAttribute("y_val"));
        
        // STEP ::: Makes the buttons appear
        setTimeout(function () {
            if (childButton.getAttribute("data_val") == "X"){
                childButton.setAttribute('class',"blocks visible x-color")
            }else{
                childButton.setAttribute('class',"blocks visible o-color")
            }
        },(xPos+yPos)*100);
    }
}
function modifyCss(){
    /** Modify any Css Properties you want */
    // STEP ::: Change the size of the border ** NOT needed anymore
    let gameDiveStyle = window.getComputedStyle(gameDiv);
    let borders = document.getElementsByClassName('gameborder');
    var elementsArray = Array.from(borders);
    elementsArray.forEach(border =>{
        let divWidth =  parseInt(gameDiveStyle.getPropertyValue('width')) +
                        parseInt(gameDiveStyle.getPropertyValue('margin-left')) + 
                        parseInt(gameDiveStyle.getPropertyValue('margin-right')) + 
                        parseInt(gameDiveStyle.getPropertyValue('padding-left')) +
                        parseInt(gameDiveStyle.getPropertyValue('padding-right'));
        border.style.width = ""+divWidth+"px";
    })
}

function clickButton(tempButton){
    /** Function gets called when any of the tiles/blocks get clicked */
    if(gameOver === false){
        switchNeighbors(tempButton)
    }   
}
function switchNeighbors(tempButton){
    /** Switches X with O and the neighboruing tiles*/
    if(tempButton.getAttribute("data_val") === "X"){
        updateMoveCount(false);
        tempButton.setAttribute('class',"blocks visible o-color")
        let x = parseInt(tempButton.getAttribute("x_val"));
        let y = parseInt(tempButton.getAttribute("y_val"));
        let neighbors = []
        // neighbors.push([x,y]) // Clicked Button
        neighbors.push([x-1,y])
        neighbors.push([x+1,y])
        neighbors.push([x,y-1])
        neighbors.push([x,y+1])
        // STEP ::: You can click on only X
        // any neighboring tile can get reversed
        
            setOTile(tempButton);
            totalO +=1;
            neighbors.forEach(element => {
                let neighborButton = document.getElementById("Button_"+element[0]+"_"+element[1]);
                if(neighborButton){
                    if (neighborButton.getAttribute("data_val") === "X"){
                        setOTile(neighborButton);
                        totalO +=1;
                    }else{
                        setXTile(neighborButton);
                        totalO -=1;
                    }
                    // Change color of the button
                    if (neighborButton.getAttribute("data_val") === "X"){
                        neighborButton.setAttribute('class',"blocks visible x-color")
                    }else{
                        neighborButton.setAttribute('class',"blocks visible o-color")
                    }
                }
            });
    }
    
    if(totalO == totalX){
        console.log("Game Complete");
        gameOver = true;
        enableGameEndText(false)
        gameOverAnimate();
    }
}

function gameOverAnimate(){
    /** Add things that needs to be done after game is complete */
    let gameBorders = document.getElementsByClassName('gameborder');
    let gameBordersArray = Array.from(gameBorders);
    
    gameBordersArray.forEach((tempBorder) =>{
        tempBorder.style =""
        tempBorder.classList.add('disappear');
    })
}
function enableGameEndText(setVal)
{
    /** When you win the game this unhides the You won button */
    let gameEndText = document.getElementById("gameEnd");
    if(setVal){
        gameEndText.setAttribute('class','gameEnd');
    }else{
        gameEndText.classList.add('end-visible');
    }
}

function getOsvg(){
    let val ='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM5.07089 13C5.55612 16.3923 8.47353 19 12 19C15.5265 19 18.4439 16.3923 18.9291 13H14.8293C14.4174 14.1652 13.3062 15 12 15C10.6938 15 9.58251 14.1652 9.17068 13H5.07089ZM18.9291 11C18.4439 7.60771 15.5265 5 12 5C8.47353 5 5.55612 7.60771 5.07089 11H9.17068C9.58251 9.83481 10.6938 9 12 9C13.3062 9 14.4174 9.83481 14.8293 11H18.9291ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor" /></svg>'
    
    val = val.replace('currentColor',oColor)
    return val
}
function getXsvg(){
    let val ='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.9307 4.01587H14.7655C14.3582 2.84239 13.2428 2 11.9307 2C10.6185 2 9.50313 2.84239 9.09581 4.01587H6.93066C5.27381 4.01587 3.93066 5.35901 3.93066 7.01587V9.21205C2.80183 9.64283 2 10.7357 2 12.0159C2 13.296 2.80183 14.3889 3.93066 14.8197V17.0159C3.93066 18.6727 5.27381 20.0159 6.93066 20.0159H9.08467C9.48247 21.2064 10.6064 22.0645 11.9307 22.0645C13.255 22.0645 14.3789 21.2064 14.7767 20.0159H16.9307C18.5875 20.0159 19.9307 18.6727 19.9307 17.0159V14.8446C21.095 14.4322 21.929 13.3214 21.929 12.0159C21.929 10.7103 21.095 9.5995 19.9307 9.18718V7.01587C19.9307 5.35901 18.5875 4.01587 16.9307 4.01587ZM5.93066 14.8687V17.0159C5.93066 17.5682 6.37838 18.0159 6.93066 18.0159H9.11902C9.54426 16.8761 10.6427 16.0645 11.9307 16.0645C13.2187 16.0645 14.3171 16.8761 14.7423 18.0159H16.9307C17.4829 18.0159 17.9307 17.5682 17.9307 17.0159V14.8458C16.7646 14.4344 15.929 13.3227 15.929 12.0159C15.929 10.709 16.7646 9.59732 17.9307 9.18597V7.01587C17.9307 6.46358 17.4829 6.01587 16.9307 6.01587H14.7543C14.338 7.17276 13.2309 8 11.9307 8C10.6304 8 9.52331 7.17276 9.10703 6.01587H6.93066C6.37838 6.01587 5.93066 6.46358 5.93066 7.01587V9.16302C7.13193 9.55465 8 10.6839 8 12.0159C8 13.3479 7.13193 14.4771 5.93066 14.8687Z" fill="currentColor" /></svg>'
    val = val.replace('currentColor',xColor);
    return val;
}
function setXTile(tempButton){
    tempButton.setAttribute("data_val","X");
    tempButton.innerHTML = getXsvg();
}
function setOTile(tempButton){
    tempButton.setAttribute("data_val","O");
    tempButton.innerHTML = getOsvg();

}
// recreateBoard(6,[1]);
// recreateBoard(3,[0,1,3]);
recreateBoard(3,[1,3,4,5,7]);


// Reset Behaviour
let resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click",() =>{
    recreateBoard(previousSize,previosPosition);
});

// Generate Behaviour
let generateButton = document.getElementById("generateButton");
generateButton.addEventListener("click", ()=>{
    console.log("Generating ...")
    let noOfMoves = 1;
    // divide into 4 parts 3/10 parts with low probability, 3-6/10 parts medium , 6-9/10 high probabilyt ,10/10 part medium probability
    let squareVal = myBoardSize * myBoardSize;
    if([2,3,4].includes(myBoardSize)){
        noOfMoves = generateRandomNumber(1,squareVal);
    }
    if([5,6].includes(myBoardSize)){
        noOfMoves = generateRandomNumber(0.7,squareVal);
    }
    if([7,8,9,10].includes(myBoardSize)){
        noOfMoves = generateRandomNumber(0.5,squareVal);
    }
    if(noOfMoves<1){
        noOfMoves = 1
    }
    let combo = generateOneCombo(myBoardSize,noOfMoves)
    recreateBoard(myBoardSize,combo);
})

function generateRandomNumber(exponent,maxNumber) {
    // Adjust these parameters to control the distribution shape
    // exponent Controls the shape of the power-law distribution
    // Generate a random number between 0 and 1
    const randomValue = Math.random();
  
    // Use a power-law distribution formula to skew the results
    const randomNumber = Math.pow(randomValue, exponent) * maxNumber;
  
    return Math.ceil(randomNumber); // Round up to the nearest integer
  }
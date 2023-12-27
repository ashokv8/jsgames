let colors = {
    'black':'#444444',
    'grey': '#CCCCCC',
    'white' : '#FFFFFF',
    'white2':'#66bfbf',
    'dark_blue':'#9AD8E5',
    'grey2':'#b0a7c75b',

    'green1':'#394a51',
    'green-high':'#7fa99b',
    'yellow':'#fdc57b',
    'red':'#b14e6f'
}
let mainBody = document.getElementById("mainBody");
let mainContainer = document.getElementById("mainContainer");
let gameContainer;
let gridSize = 15;
let tileSize = 15;
let borderSize =3.5;
let borderColor = colors['yellow'];
let borderShade = colors['black'];
let squareColor = colors['green-high'];

let svgColor = colors['red'];

// 
let resultMatrix = null;
let nowPos = 0;
let nowTile = null;
let playerSVG = null;


function createGameContainer(){
    gameContainer = document.createElement("div");
    let tempString = '';
    for(let i=0;i<gridSize;i++){
        tempString +='auto '
    }
    let gStyle =`
        display:grid;
        grid-template-columns: ${tempString};
        grid-template-rows: ${tempString};
        background-color:${squareColor};
        // width:500px;
        // height:500px;
        grid-gap:${borderSize}px;
    `;
    gStyle = getCssString(gStyle);
    gameContainer.setAttribute('style',gStyle);
    mainContainer.appendChild(gameContainer)
}
function addTiles(){
    for(let i=0;i<gridSize;i++){
        for(let j=0;j<gridSize;j++){
            // Todo : Create Tile
            let arrPos = (i*gridSize) + j;
            let tempTile = document.createElement("div");
            let tempStyle = `
                position:relative;
                width : ${tileSize};
                height : ${tileSize};
                margix:3px;
            `
            // background-color: #85b4ff;
            // tempStyle +='border: solid 1px;'
            // tempStyle += 'border-radius: 20px;'
            tempStyle = getCssString(tempStyle);
            tempTile.setAttribute('style',tempStyle);
            tempTile.setAttribute('id',"Tile_"+arrPos)
            gameContainer.appendChild(tempTile);
            playerSVG = getPlayerSVG();
            tempTile.appendChild(playerSVG);
            
            let playerStyle = playerSVG.getAttribute('style')+ `position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);`
            playerSVG.setAttribute('style',playerStyle)
        }
    }
}
function addBorder(currentPos,currentTile,currentInfo){
    let border_data = "";
    let left_data = "border-left:1px solid;"
    let right_data = "border-right:1px solid;"
    let top_data = "border-top:1px solid;"
    let bottom_data = "border-bottom:1px solid;"
    console.log("Current Post",currentPos);
    console.log("Current Tile",currentInfo['allowed_neighbors']);
    currentInfo['allowed_neighbors'].forEach(element => {
        if(element == currentPos-1){
            left_data ="";
        }
        if(element == currentPos+1){
            right_data ="";
        }
        if(element == currentPos-gridSize){
            top_data ="";
        }
        if(element == currentPos+gridSize){
            bottom_data ="";
        }
    });
    let currentStyle = currentTile.getAttribute('style')
    currentStyle += left_data + right_data + top_data + bottom_data;
    currentTile.setAttribute('style',currentStyle);
}
function addLeftBorder(currentTile){
    let parentData = currentTile.getBoundingClientRect();
    let borderLeft = document.createElement("div");
    let borderLStyle = `
        position:absolute;
        top:0;
        left: ${-borderSize};
        height:${parentData.height + borderSize}; 
        width:${borderSize};
        background-color : ${borderColor};
        box-shadow : 0px 2px ${borderShade};
    `
    // borderLStyle +='border-radius:5px'
    borderLStyle = getCssString(borderLStyle)
    currentTile.appendChild(borderLeft);
    borderLeft.setAttribute('style',borderLStyle);
}
function addRightBorder(currentTile){
    let parentData = currentTile.getBoundingClientRect();
    let borderLeft = document.createElement("div");
    let borderLStyle = `
        position:absolute;
        top:${-borderSize};
        left: ${parentData.width};
        height:${parentData.height + borderSize}; 
        width:${borderSize};
        background-color : ${borderColor};
        box-shadow : 0px 2px ${borderShade};
    `
    // borderLStyle +='border-radius:5px'
    borderLStyle = getCssString(borderLStyle)
    currentTile.appendChild(borderLeft);
    borderLeft.setAttribute('style',borderLStyle);
}
function addTopBorder(currentTile){
    let parentData = currentTile.getBoundingClientRect();
    let borderLeft = document.createElement("div");
    let borderLStyle = `
        position:absolute;
        top:${-borderSize};
        left: ${-borderSize};
        height:${borderSize};
        width: ${parentData.width + borderSize}; 
        background-color : ${borderColor};
        box-shadow : 0px 2px ${borderShade};
    `
    // borderLStyle +='border-radius:5px'
    borderLStyle = getCssString(borderLStyle)
    currentTile.appendChild(borderLeft);
    borderLeft.setAttribute('style',borderLStyle);
}
function addBottomBorder(currentTile){
    let parentData = currentTile.getBoundingClientRect();
    let borderLeft = document.createElement("div");
    let borderLStyle = `
        position:absolute;
        top:${parentData.height};
        left: 0;
        height:${borderSize};
        width:${parentData.width + borderSize}; 
        background-color : ${borderColor};
        box-shadow : 0px 2px ${borderShade};
    `
    // borderLStyle +='border-radius:5px'
    borderLStyle = getCssString(borderLStyle)
    currentTile.appendChild(borderLeft);
    borderLeft.setAttribute('style',borderLStyle);
}
function addBorderNew(currentPos,currentTile,currentInfo){
    let left = true;
    let right = true;
    let top = true;
    let bottom = true;
    currentInfo['allowed_neighbors'].forEach(element =>{
        if(element == currentPos-1){
            // add left border
            left = false;
        }
        if(element == currentPos+1){
            // add right border
            right = false;
        }
        if(element == currentPos-gridSize){
            // add top border
            top = false;
        }
        if(element == currentPos+gridSize){
            // add bottom border
            bottom = false;
        }
    });
    // Add Borders
    if(left){
        addLeftBorder(currentTile);
    }
    if(right){
        addRightBorder(currentTile);
    }
    if(top){
        addTopBorder(currentTile);
    }
    if(bottom){
        addBottomBorder(currentTile);
    }
}
function populateNumber(resultMatrix){
    // Populates the path taken in the array during traversal , also adds border
    for(let i=0;i<gridSize;i++){
        for(let j=0;j<gridSize;j++){
            let tempPos = (i*gridSize) +j;
            let tempTile= document.getElementById('Tile_'+tempPos);
            // console.log("PARENT DATA",tempTile.getBoundingClientRect())
            // tempTile.innerText = resultMatrix[i][j]['pathStep'];
            // addBorder(tempPos,tempTile,resultMatrix[i][j])
            addBorderNew(tempPos,tempTile,resultMatrix[i][j])
        }
    }
}
function getPlayerSVG(){
    let thisColor = svgColor;
    let val ='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.9759 9C10.9759 9.55228 10.5282 10 9.97589 10C9.42361 10 8.97589 9.55228 8.97589 9C8.97589 8.44771 9.42361 8 9.97589 8C10.5282 8 10.9759 8.44771 10.9759 9Z" fill="currentColor" /><path d="M13.9712 10C14.5235 10 14.9712 9.55228 14.9712 9C14.9712 8.44771 14.5235 8 13.9712 8C13.4189 8 12.9712 8.44771 12.9712 9C12.9712 9.55228 13.4189 10 13.9712 10Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M19 20.9999V10C19 6.13401 15.866 3 12 3C8.13401 3 5 6.13401 5 10V21L7.82846 21L9.24264 19.5858L10.6569 21L13.3433 21L14.7574 19.5858L16.1717 21L19 20.9999ZM17 10C17 7.23858 14.7614 5 12 5C9.23858 5 7 7.23858 7 10V19L9.24264 16.7573L12 19.5147L14.7574 16.7573L17 18.9999V10Z" fill="currentColor" /></svg>'.replaceAll('currentColor',thisColor);

    console.log("VALUE",val);
    let currentDiv = document.createElement("div");
    currentDiv.setAttribute("id","player")
    let circleStyle =`
        width : 10px;
        height : 10px;
        border-radius :10px;
        background-color : ${thisColor};
        box-shadow:0px 2.5px ${borderShade};
    `
    circleStyle = getCssString(circleStyle)
    currentDiv.setAttribute('style',circleStyle);
    currentDiv.setAttribute('class','playerIcon invisible');
    // currentDiv.innerHTML = val;
    return currentDiv;
}
function handleKeyDown(event){
    console.log("Key Clicked",event.key);
    let nowX = getX(nowPos);
    let nowY = getY(nowPos);

    if(event.key =="ArrowLeft"){
        // console.log("Moving Left ...")
        let tempPos = nowPos-1;
        if (resultMatrix[nowX][nowY]['allowed_neighbors'].includes(tempPos)){
            nextPos = document.getElementById("Tile_"+tempPos);
            let playerIcon = nowPos.querySelector('.playerIcon');
            playerIcon.setAttribute('class','playerIcon invisible');
            let nextIcon = nextPos.querySelector('.playerIcon');
        }
    }
    if(event.key == "ArrowRight"){
        // console.log("Moving Right ...")
        moveChar("Right")
    }
    if(event.key == "ArrowUp"){
        // console.log("Moving Up ...")
        moveChar("Up")
    }
    if(event.key == "ArrowDown"){
        // console.log("Moving Down ...")
        moveChar("Down")
    }

}
function main(){
    createGameContainer()


    function restartGame(){
        addTiles()
        resultMatrix = createMaze(gridSize);
        populateNumber(resultMatrix);
        setStart();
    }

    function setStart(){
        nowPos = Math.floor(Math.random() * (gridSize*gridSize));
        nowPos = document.getElementById("Tile_"+nowPos);
        let playerIcon = nowPos.querySelector('.playerIcon');
        playerIcon.setAttribute('class','playerIcon visible');
    }

    restartGame()

}

main()
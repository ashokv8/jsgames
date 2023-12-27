function getX(arrPos){
    // Row
    return Math.floor(arrPos / gridSize);
}
function getY(arrPos){
    // Column
    return Math.floor(arrPos%gridSize);
}
function createCell(i,j,gridSize){
    // STEP : New Cell gets created here
    let arrPos = (i*gridSize) + j;
    let newCell = {
        'arrPos' : arrPos,
        'i':i,
        'j':j,
        'visited':false,
        'neighbors':[],
        'all_neighbors':[],
        'allowed_neighbors':[],
        'leftOpen': false,
        'topOpen' : false,
        'rightOpen':false,
        'bottomOpen':false,
        'pathStep':0
    }
    let neighBorLeft = arrPos-1;
    let neighBorRight = arrPos+1;
    let neighBorTop = arrPos-gridSize;
    let neighBorBottom = arrPos+gridSize;
    if (neighBorLeft >= 0 && getX(neighBorLeft) == getX(arrPos)){
        newCell['neighbors'].push(neighBorLeft);
        newCell['all_neighbors'].push(neighBorLeft);
    }
    if(neighBorRight < (gridSize *gridSize) && getX(neighBorRight) == getX(arrPos)){
        newCell['neighbors'].push(neighBorRight);
        newCell['all_neighbors'].push(neighBorRight);
    }
    if (neighBorTop >= 0){
        newCell['neighbors'].push(neighBorTop);
        newCell['all_neighbors'].push(neighBorTop);
    }
    if(neighBorBottom < (gridSize *gridSize)){
        newCell['neighbors'].push(neighBorBottom);
        newCell['all_neighbors'].push(neighBorTop);
    }
    return newCell;
}
function generateMatrix(gridSize){
    // STEP : Generates the base matrix with default values
    let resultMatrix = []
    for(let i=0;i<gridSize;i++){
        let tempRow = []
        for(let j=0;j<gridSize;j++){
            let newCell = createCell(i,j,gridSize);
            tempRow.push(newCell);
        }
        resultMatrix.push(tempRow);
    }
    return resultMatrix;
}

function getStart(gridSize){
    let pos = Math.floor(Math.random() * (gridSize*gridSize));
    return pos;
}
function createMaze(gridSize){
    // let gridSize = 10;
    let resultMatrix = generateMatrix(gridSize);
    let startPos = getStart(gridSize);
    let pathStep = 0;
    function markVisited(arrPos){
        let x = getX(arrPos)
        let y = getY(arrPos);
        resultMatrix[x][y]['visited'] = true;
        resultMatrix[x][y]['pathStep'] = pathStep;
        pathStep++;
        // console.log("STEP",arrPos)
    }
    function getRandomUnvisitedNeighBor(arrPos){
        let x = getX(arrPos);
        let y = getY(arrPos);
        let len = resultMatrix[x][y]['neighbors'].length;
        while(len > 0){
            let temp = Math.floor(Math.random() * len);
            // console.log("All Neighbors of ",arrPos,"::::",resultMatrix[x][y]['neighbors']);
            let nextVal = resultMatrix[x][y]['neighbors'].splice(temp,1);
            nextVal = nextVal[0];
            let nextX = getX(nextVal);
            let nextY = getY(nextVal);
            if (resultMatrix[nextX][nextY]['visited'] == false){
                // console.log(" Picked Neighbor",nextVal);
                
                if( !resultMatrix[x][y]['allowed_neighbors'].includes(nextVal)){
                    // ALLOWED NEIGHBORS
                    resultMatrix[x][y]['allowed_neighbors'].push(nextVal);
                }
                if( !resultMatrix[nextX][nextY]['allowed_neighbors'].includes(arrPos)){
                    resultMatrix[nextX][nextY]['allowed_neighbors'].push(arrPos);
                }
                
                return nextVal;
            }
            len = resultMatrix[x][y]['neighbors'].length;
        }
        return null;
    }
    function pathFinder(currentPos){
        markVisited(currentPos);
        let nextNeighbor = null;
        do{
            nextNeighbor = getRandomUnvisitedNeighBor(currentPos);
            if(nextNeighbor !=null){
                pathFinder(nextNeighbor);
            }
        }while(nextNeighbor !=null);
    }
    pathFinder(startPos);
    return resultMatrix;
}
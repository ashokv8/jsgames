
function addXs(matrix,posX,posY,xBounds,yBounds){
    // Adds X to position and its neighbors
    posX = parseInt(posX);
    posY = parseInt(posY);
    let myNeighbors = [];
    myNeighbors.push([posX,posY]);
    if ((posX + 1) < xBounds){
        myNeighbors.push([posX+1,posY]);
    }
    if ((posY + 1) < yBounds){
        myNeighbors.push([posX,posY+1]);
    }
    if ((posX - 1) >= 0){
        myNeighbors.push([posX-1,posY]);
    }
    if ((posY - 1) >= 0){
        myNeighbors.push([posX,posY-1]);
    }
    myNeighbors.forEach((elem) =>{
        let tempElem = matrix[elem[0]][elem[1]]
        if (tempElem == 0)
        {
            matrix[elem[0]][elem[1]] = 1;
        }else{
            matrix[elem[0]][elem[1]] = 0;
        }
        
    });
    return matrix;
}

function generateMatrixFromCombination(size,combinationArr){
    // Given a combination it will generate matrix from that
    // Code works but the no of steps taken to build the matrix is not the same as the no steps taken to solve that matrix
    let matrix = Array(size).fill(0).map(() => Array(size).fill(0));
    
    // Create Matrix
    combinationArr.forEach(element => {
        element = parseInt(element);
        let row = Math.floor(element/size);
        let col = Math.floor(element%size);
        addXs(matrix,row,col,size,size);
    });
    return matrix;
}

function generateOneCombo(size,totalMoves){
    const myArr = Array(size*size).fill(1).map((n,i) => (i));
    const combination = []
    for(let i=0; i<totalMoves; i++){
        let randomNo = getRandomInt(myArr.length);
        combination.push(myArr[randomNo]);
        myArr.splice(randomNo,1);
    }
    combination.sort();
    return combination;
}
function generateMatrixCombos(size,totalMoves,combos){
    // Generate Combinations that later you can use to generate a matrix
    const all_combination = [];
    const allCombos = {};
    for(let c =0 ; c < combos; c++){
        const myArr = Array(size*size).fill(1).map((n,i) => (i));
        const combination = []
        for(let i=0; i<totalMoves; i++){
            let randomNo = getRandomInt(myArr.length);
            combination.push(myArr[randomNo]);
            myArr.splice(randomNo,1);
        }
        combination.sort();
        let combination_string = combination.join("_")
        allCombos[combination_string] = combination;
    }

    // Print All the combinations
    let arr = ""
    for(var comb in allCombos){
        all_combination.push(allCombos[comb])
        arr += "["+allCombos[comb]+"],"
    }
}

function getRandomInt(num){
    return Math.floor(Math.random() * num);
}

const levelButton = document.getElementById("levelgen");
if(levelButton){
    levelButton.addEventListener("click",() => {
        // Function 1
        // Use this function to generate the levels
        let size = 3;
        let totalMoves = 9;
        let combos = 5;
        generateMatrixCombos(size, totalMoves, combos);
        // generateMatrixFromCombination(size,[0,1]);

        size = 4;
        let totalMovesList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
        let combosList = [10,20,30,30,30,30,30];
        totalMovesList.forEach((move) =>{
            generateMatrixCombos(size,move,30);
        });

    });
}


const playLevel = document.getElementById("playlevel");
if(playLevel){
    playLevel.addEventListener("click",() => {
        let size = 6;
        let positions = [1];
        recreateBoard(size,positions);
    })
}

const genLevel = document.getElementById("generateButton");
// genLevel.addEventListener()

const sizeIncrease = document.getElementById("increaseSize");
sizeIncrease.addEventListener("click", () =>{
    changeBoardSize(1);
})

const sizeDecrease = document.getElementById("decreaseSize");
sizeDecrease.addEventListener("click", () =>{
    changeBoardSize(-1);
})


function changeBoardSize(value){
    let sizeText = document.getElementById("sizeText");
    let newSize = myBoardSize + value;
    if(newSize < 2){
        myBoardSize = 2;
    }else if(newSize > 10){
        myBoardSize = 10;
    }else{
        myBoardSize = newSize;
    }
    sizeText.innerText = ""+myBoardSize;
}

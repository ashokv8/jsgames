// let items = document.getElementsByClassName("item");
// let itemArray = Array.from(items);
// console.log(items);
// let startIndex = 10;
// let leftPos = 10;
// itemArray.forEach(element => {
    
//     let styleData = `
//         z-index:${startIndex};
//         left:${leftPos}px;
//     `
//     leftPos += 100;
//     startIndex--;
//     element.setAttribute("style",styleData);    
// });

let itemContainer = document.getElementById('itemContainer');
let itemList = document.getElementById('itemList');
let items = document.querySelectorAll('.item');

let active_item = 1;
function reloadSlide(){
    
}
/** Left and Right Click Button */
let leftButton = document.getElementById("button-left");
leftButton.addEventListener("click", (event) =>{
    active_item +=1;
});

let rightButton = document.getElementById("button-right");
rightButton.addEventListener("click", (event) =>{
    active_item -=1;
});




console.log("Item List",itemList);
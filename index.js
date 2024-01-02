let itemContainer = document.getElementById('itemContainer');
let itemList = document.getElementById('itemList');
let items = document.querySelectorAll('.item');
let detailsList = document.querySelectorAll('.details');
console.log("ITEMS",items)

let active_item = 0;
function reloadSlide(){
    let leftStart = 100;
    let itemDistance = 100;

    // console.log("RELOAD",active_item)
    items[active_item].style.transform ='none';
    items[active_item].style.zIndex = 10;
    items[active_item].style.opacity = 1;
    items[active_item].style.left = leftStart;
    items[active_item].style.boxShadow = '0px 0px 15px 5px #d5b1b1'
    enableDetails(active_item);

    // i + 1 children
    for(let i=active_item+1; i < items.length;i++){
        let posFromCenter = (i-active_item);
        // console.log(i);
        items[i].style.transform =`scale(${1 - 0.2*posFromCenter}) perspective(16px) rotateY(-1deg)`;
        items[i].style.left = leftStart+ (posFromCenter * itemDistance);
        items[i].style.opacity = 1-(0.25 * (posFromCenter));
        items[i].style.zIndex = 10 - (i-active_item);
        items[i].style.boxShadow = 'none'
    }

    // children < i
    for(let i=active_item-1; i>=0; i--){
        let posFromCenter = (active_item-i);
        // console.log(i);
        items[i].style.transform =`scale(${1 - 0.2*posFromCenter}) perspective(16px) rotateY(1deg)`;
        items[i].style.left = leftStart + (posFromCenter * -itemDistance);
        items[i].style.opacity = 1-(0.25 * (posFromCenter));
        items[i].style.zIndex = 10 - posFromCenter;
        items[i].style.boxShadow = 'none'
    }

}
function enableDetails(val){
    console.log("VALUE",val);
    for(let i=0;i<detailsList.length;i++){
        console.log("I",i,"EUQ",i == val)
        detailsList[i].style.display = 'none';
        if(i == val){
            detailsList[i].style.display = 'block';
        }
    }
}

/** Left and Right Click Button */
let leftButton = document.getElementById("button-left");
leftButton.addEventListener("click", (event) =>{
    if(active_item >0){
        active_item =active_item-1;
        if(active_item<0){
            active_item = items.length -1;
        }
        reloadSlide()
    }
});

let rightButton = document.getElementById("button-right");
rightButton.addEventListener("click", (event) =>{
    if(active_item < items.length-1){
        active_item =(active_item + 1)%items.length;
        reloadSlide()
    }
});
reloadSlide()

console.log("Item List",itemList);


const spliceGame = document.getElementById("spliceGame");
spliceGame.addEventListener("click", () =>{
    console.log("Open Splice Game ....")
    window.open('./splice/index.html', '_blank');
})

const sleekGame = document.getElementById("sleekGame");
sleekGame.addEventListener("click", () =>{
    console.log("Open Sleek Game ....")
    window.open('./sleek/sleek.html', '_blank');
})
function getCssString(val){
    return val.replace(/\s+/g,' ').replace(/[\n\r]/g,'').trim(); // Removing line breaks and long spaces
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
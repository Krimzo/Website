function ResetInputs() {
    for(let i=0; i<81; i++){
        var tempInput = document.getElementById("input" + i);
        tempInput.value = "";
        tempInput.style.color = "#000000";
    }
}

function CheckInputValue(id) {
    var tempInput = document.getElementById(id);
    if(tempInput.value != ""){
        for(let i=1; i<10; i++){
            if(tempInput.value == String(i)){
                return;
            }
        }
        tempInput.value = "";
    }
}

const rni = document.getElementById("rni")
const rnb = document.getElementById("rnb")
const text = document.getElementById("text")

rnb.addEventListener('click',()=>{
    const inputValue = rni.value;
    if(inputValue == ""){
        console.log("EMPTY")
    }
    else{
        console.log(inputValue)
        text.innerText = inputValue
        rni.value = ""
    }
})

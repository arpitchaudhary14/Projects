const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
for(let select of dropdowns){
    for(currCode in countryList){ 
        let newOption=document.createElement("option"); 
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from"&&currCode==="USD"){
            newOption.selected="selected"; //By default USD is there in from.
        }
        else if(select.name==="to"&&currCode==="INR"){
            newOption.selected="selected"; //By default INR is there in to.
        }
        select.append(newOption);
}
select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
})
}
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amountValue * rate;
    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img"); 
    img.src=newSrc; //Changing the source to new source here.
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault(); //stop the default behaviour of form on clicking button.
    updateExchangeRate();
})
window.addEventListener("load",()=>{ //window represents the entire browser window (the global object).
    updateExchangeRate();
})

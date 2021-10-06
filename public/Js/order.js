//*****************************Gestion de la commande************************************************* */

//---------------------Récupération de commande---------------------------------------------------------
const myConfirmation = document.getElementById("confirmation");
console.log("myConfirmation:" + myConfirmation);
const myOrder = JSON.parse(localStorage.getItem("order"));
console.log(myOrder);
//creation éléments html DOM

let myContact = document.createElement("h2");
let orderId = document.createElement("p");
let totalPrice = document.createElement("b");
myContact.innerHTML = myConfirmation.name + ",";

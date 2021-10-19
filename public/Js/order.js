//*****************************Gestion de la commande************************************************* */
let contact = JSON.parse(window.localStorage.getItem("contact"));
//---------------------Récupération de commande---------------------------------------------------------
const totalPriceConfirmation = document.getElementById("display-price");
const orderId = document.getElementById("display-orderid");
const myFurnitureArticle = document.getElementById("confirm");

function displayOrderIdAndPrice() {
  lastName = contact.lastName;

  myFurnitureArticle.innerText = lastName;
  totalPriceConfirmation.innerText = localStorage.getItem("total");
  orderId.innerText = localStorage.getItem("order");
}
displayOrderIdAndPrice();
// On vide le localStorage pour recommencer plus tard le processus d'achat
localStorage.clear();

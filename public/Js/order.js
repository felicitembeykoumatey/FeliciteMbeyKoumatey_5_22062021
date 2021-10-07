//*****************************Gestion de la commande************************************************* */

//---------------------Récupération de commande---------------------------------------------------------

main();

function main() {
  displayOrderIdAndPrice();
}

function displayOrderIdAndPrice() {
  const totalPriceConfirmation = document.getElementById("display-price");
  console.log(totalPriceConfirmation);
  const orderId = document.getElementById("display-orderid");
  console.log(orderId);

  totalPriceConfirmation.innerText = localStorage.getItem("totalPrice");
  console.log(totalPriceConfirmation);
  console.log(localStorage.getItem("order"));
  orderId.innerText = localStorage.getItem("order");
}
// On vide le localStorage pour recommencer plus tard le processus d'achat
localStorage.clear();

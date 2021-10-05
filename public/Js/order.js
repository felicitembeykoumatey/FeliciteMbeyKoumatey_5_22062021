//*****************************Gestion de la commande************************************************* */

//---------------------Récupération de commande---------------------------------------------------------
const order = JSON.parse(localStorage.getItem("order"));
console.log(order);

const contact = order.contact;
const products = order.products;
const orderId = order.orderId;
console.log("contact:" + contact);

let HTMLOrder = document.getElementById("confirmation");
let myHTMLOrder = "";
// Vérification et initialisation du panier//
if (localStorage.getItem("products")) {
  console.log(basket);
  console.log("ok if");
} else {
  let createCart = [];
  localStorage.setItem("products", JSON.stringify(createCart));
}
//Récupération des informations pour affichage sur la page de commande//
//const contact = basket.contact;
//const products = basket.products;
//const orderId = basket.orderId;
//console.log("orderId:" + orderId);
//console.log("products:" + products);
//console.log("contact:" + contact);

let confirmationOrder = document.getElementById("confirmation_text");
let myOrder = "";
let myArticles = document.getElementById("purchase_articles");
let myHTMLArticles = "";

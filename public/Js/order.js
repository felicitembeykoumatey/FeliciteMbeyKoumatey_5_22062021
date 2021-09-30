//*****************************Gestion de la commande************************************************* */

//---------------------Récupération de commande------------------------

// Récupération de l'objet dans le localstorage et conversion //
const orderBasket = JSON.parse(window.localStorage.getItem("products"));
console.log(orderBasket);

// Vérification et initialisation du panier //
if (localStorage.getItem("products")) {
} else {
  console.log("Le panier va être initalisé");
  let createBasket = [];
  localStorage.setItem("products", JSON.stringify(createBasket));
}

// Récupération des informations pour affichage sur la page de commande //
OrderConfirmation = () => {
  if (sessionStorage.getItem("order") != null) {
    let order = JSON.parse(sessionStorage.getItem("order"));
    // Indications nom et prénom du client //
    document.getElementById("firstName").innerHTML = order.contact.firstName;
    document.getElementById("lastName").innerHTML = order.contact.lastName;
    // Calculer le montant total de la commande //
    let priceOrder = 0;
    let totalPrice = order.products;
    totalPrice.forEach((element) => {
      priceOrder += element.price / 100;
    });
    // Indications prix et référence de commande //
    document.getElementById("priceOrder").innerHTML = priceOrder;
    console.log(order);
    sessionStorage.removeItem("order");
  }
};

OrderConfirmation();

//*****************************Gestion de la commande************************************************* */

//---------------------Récupération de commande------------------------

// Récupération de l'objet dans le localstorage
const responseId = localStorage.getItem("responseId");
console.log(`responseId:${responseId}`);

//Récupération du prix total de la commande
const totalPrice = localStorage.getItem("totalPrice");
console.log(`totalPrice: ${totalPrice}`);

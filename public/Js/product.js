// on s'assure que le DOM est chargé
window.onload = () => {
  //Exécuté après le chargement de la page

//affichage du produit qui a été selectionné par l'id//
let params = new URL(document.location).searchParams;
let id = params.get("id");

const productImg = document.querySelector(".img");
const productName = document.querySelector(".product_name");
const productDescription = document.querySelector(".product_description");
const productPrice = document.querySelector(".product_price");

const varnishSelect = document.querySelector("#varnish_select");

function getArticles() {
  // On récupère uniquement le produit dont on a besoin 
  fetch(`http://localhost:3000/api/furniture/`${id})
    .then(function (response) {
      return response.json();
    })
     .then(function (resultatAPI) {
 
      article = resultatAPI;
      productName.innerHTML = article.name;
      productImg.src = article.imageUrl;
      productDescription.innerText = article.description;

    };
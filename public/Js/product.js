//*-----récupération de l'id produit dans l'url avec la méthode URLSearchParams----------
let urlSearchParams = new URLSearchParams(document.location.search);
let id = urlSearchParams.get("id");
let url = "http://localhost:3000/api/furniture";

//* Affichage produit dans la page--------------------------------------------------
let request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    furniture = JSON.parse(this.responseText);
    ProductChoice();
  }
};
//-------initialisation de la requête----------------------------
request.open("GET", url + "/" + id);
//----- envoi de la requête----------------------------
request.send();

//-----Produit choisi---------------------------------
function ProductChoice() {
  //------Stockage données HTML dans la variable---------------
  let title = document.getElementById("titre");
  console.log("title:" + title);

  let price = document.getElementById("prix");
  console.log("price:" + price);

  let description = document.getElementById("description");
  let image = document.getElementById("image");

  //----- Affichage des données-------------------------------
  title.textContent = furniture.name;
  console.log("title.textContent:" + title.textContent);
  price.textContent = furniture.price / 100 + " €";
  description.textContent = furniture.description;
  image.src = furniture.imageUrl;

  //------Création des options vernis meubles--------------------

  // formulaire option
  let optionVarnish = furniture.varnish;
  console.log("optionVarnish:" + optionVarnish);

  let structureOptions = [];
  //la boucle for pour afficher toutes les options du produit
  for (let varnish = 0; varnish < optionVarnish.length; varnish++) {
    structureOptions =
      structureOptions +
      `<option value="${varnish + 1}">${optionVarnish[varnish]}</option>`;
  }

  // Injection html dans la pageproduit pour le choix vernis

  const varnishElt = document.getElementById("varnish-select");
  console.log("varnishElt:" + varnishElt);
  varnishElt.innerHTML = structureOptions;

  //-----Sélection des vernis------------------------------------------
  const selectVarnish = document
    .getElementById("varnish-select")
    .addEventListener("change", function (e) {
      selectVarnish = e.target.value;
    });
  console.log("addEventListener:" + addEventListener);

  //---------Création de la quantité------------------------------------
  let quantityElt = document.getElementById("quantity");
  console.log("quantityElt:" + quantityElt);

  //---------Bouton ajouter au panier---------------------------------
  let addToBasket = document.getElementById("btn-ajouter");
  addToBasket.addEventListener("click", function () {
    if (selectVarnish != undefined && quantity != undefined) {
      furniture.varnish = selectVarnish;
      furniture.quantity = quantity;
    } else if (selectVarnish == undefined && quantity != undefined) {
      furniture.varnish = furniture.varnish[0];
      furniture.quantity = quantity;
    } else if (selectVarnish != undefined && quantity == undefined) {
      furniture.varnishElt = selectVarnish;
      furniture.quantity = 1;
    } else {
      furniture.varnish = furniture.varnish[0];
      furniture.quantity = 1;
    }
    alert("Votre article a été ajouté");
  });
  let panier = localStorage.getItem("panier");
  panier = JSON.parse(panier);
  localStorage.setItem("product", JSON.stringify(furniture));

  console.log(localStorage);
}

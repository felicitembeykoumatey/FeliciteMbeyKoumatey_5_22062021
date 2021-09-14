//*-----récupération de l'id produit dans l'url avec la méthode URLSearchParams----------
let urlSearchParams = new URLSearchParams(document.location.search);
let id = urlSearchParams.get("id");
let url = "http://localhost:3000/api/furniture";
let localStorage;

//* Affichage produit dans la page--------------------------------------------------
let request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    furniture = JSON.parse(this.responseText);
    productChoice();
  }
};
//-------initialisation de la requête----------------------------
request.open("GET", url + "/" + id);
//----- envoi de la requête----------------------------
request.send();
//-----------Const et variables -----------------------------
const varnishElt = document.getElementById("varnish-select");
console.log("varnishElt:" + varnishElt);

const titleElt = document.getElementById("titre");
console.log("titleElt:" + titleElt);

const priceElt = document.getElementById("prix");
console.log("priceElt:" + priceElt);

const descriptionElt = document.getElementById("description");
const imageElt = document.getElementById("image");
const quantityElt = document.getElementById("quantityProduct");

productSendInLocalStorage = [];
//-----Produit choisi---------------------------------
function productChoice() {
  //------Stockage données HTML dans la variable---------------

  //----- Affichage des données-------------------------------
  titleElt.textContent = furniture.name;
  priceElt.textContent = furniture.price / 100 + " €";
  descriptionElt.textContent = furniture.description;
  imageElt.src = furniture.imageUrl;

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
    //---Injection html dans la pageproduit pour le choix vernis

    varnishElt.innerHTML = structureOptions;
    console.log("varnishElt.innerHTML:" + varnishElt.innerHTML);
  }
  //------- sélection des Options---------------------------------------------------

  document
    .getElementById("varnish-select")
    .addEventListener("change", function (e) {
      varnishElt = e.target.value;
    });

  console.log(varnishElt);
  //--------sélection de la quantité---------------------------------------------------
  document
    .getElementById("quantityProduct")
    .addEventListener("change", function (e) {
      quantityElt = e.target.value;
    });
  console.log("quantityElt:" + quantityElt);
  //-----------bouton ajouter au panier------------------------------------------------------
  const addToBasket = document.getElementById("btn-ajouter");
  addToBasket.addEventListener("click", function () {
    console.log("helloClik");

    if (varnishElt != undefined && quantityElt != undefined) {
      console.log("hello if");
      furniture.varnish = varnishElt;
      furniture.quantity = quantityElt;
    } else if (varnishElt == undefined && quantityElt != undefined) {
      console.log("hello else if");

      furniture.varnish = furniture.varnish[0];
      furniture.quantity = quantityElt;
    } else if (varnishElt != undefined && quantityElt == undefined) {
      furniture.varnish = varnishElt;
      furniture.quantity = 1;
    } else {
      furniture.varnish = furniture.varnish[0];
      furniture.quantity = 1;
    }
    alert("Votre article a été ajouté au panier");
    priceTotal();
  });
  console.log(addEventListener);

  //* Fonction du prix total dans localStorage------------------------------------
  function priceTotal() {
    let price = parseInt(furniture.price);
    // let prixDuPanier = JSON.parse(localStorage.getItem("prixTotal"));
    let priceInBasket = JSON.parse(window.localStorage.getItem("priceTotal"));
    console.log("priceInBasket");
    if (prixDuPanier == 0) {
      //localStorage.setItem(
      window.localStorage.setItem(
        "priceTotal",
        prixDuPanier + (price / 100) * furniture.quantity
      );
    } else {
      //localStorage.setItem(
      window.localStorage.setItem(
        "priceTotal",
        prixDuPanier + (price / 100) * furniture.quantity
      );
    }
  }
  console.log("priceTotal:" + priceTotal);

  //-------Fonction du prix total dans localStorage------------------------------------
  function priceTotal() {
    let price = parseInt(furniture.price);

    let prixDuPanier = JSON.parse(window.localStorage.getItem("priceTotal"));
    if (prixDuPanier == 0) {
      //localStorage.setItem(
      window.localStorage.setItem(
        "priceTotal",
        prixDuPanier + (price / 100) * furniture.quantity
      );
    } else {
      //localStorage.setItem(
      window.localStorage.setItem(
        "priceTotal",
        prixDuPanier + (price / 100) * furniture.quantity
      );
    }
  }
  //---------------Ajout dans localStorage------------------------------------------
  //localStorage.setItem("article", JSON.stringify(furniture));
  window.localStorage.setItem("article", JSON.stringify(furniture));
  console.log(localStorage);
}
//--Fonction ajouter un produit selectionné dans LocalStorage
const addProductLocalStorage = () => {
  // localStorage.setItem("article", JSON.stringify(productSendInLocalStorage));
  window.localStorage.setItem(
    "article",
    JSON.stringify(productSendInLocalStorage)
  );
};

//-------------Stocker la recupération des valeurs du formulaire dans le local Storage
//Déclaration de la variable "productSendInLocalStorage" dans laquelle on met les key et les valeurs qui sont dans le localStorage

//let productSendInLocalStorage = JSON.parse(localStorage.getItem("article"));
let productSendInLocalStorage = JSON.parse(
  window.localStorage.getItem("article")
);
//---JSON.parse c'est pour convertir les données au format JSON qui sont dans le localStorage en objet JS.

//---S'il y a déjà des produits d'enregistré dans le Local Storage

if (productSendInLocalStorage) {
  addProductLocalStorage();
  console.log("ok");
}

// S'il n' y a pas de produit d'enregistré dans le Local Storage
else {
  addProductLocalStorage();
}

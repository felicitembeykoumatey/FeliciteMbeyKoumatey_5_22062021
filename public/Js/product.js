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
  price.textContent = furniture.price / 100 + " €";
  description.textContent = furniture.description;
  image.src = furniture.imageUrl;
  quantityProduct.value = furniture.quantity;

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

    const varnishElt = document.getElementById("varnish-select");
    console.log("varnishElt:" + varnishElt);
    varnishElt.innerHTML = structureOptions;
  }
  //------- sélection des Options---------------------------------------------------

  let selectionVarnish = document
    .getElementById("varnish-select")
    .addEventListener("change", function (e) {
      selectionVarnish = e.target.value;
    });

  console.log(selectionVarnish);
  //--------sélection de la quantité---------------------------------------------------
  const quantity = document
    .getElementById("quantityProduct")
    .addEventListener("change", function (e) {
      quantity = e.target.value;
    });
  console.log("quantity:" + quantity);
  //-----------bouton ajouter au panier------------------------------------------------------
  let ajouterPanier = document.getElementById("btn-ajouter");
  ajouterPanier.addEventListener("click", function () {
    if (selectionVarnish != undefined && quantity != undefined) {
      furniture.varnish = selectionVarnish;
      furniture.quantity = quantityProduit;
    } else if (selectionVarnish == undefined && quantity != undefined) {
      furniture.varnish = furniture.varnish[0];
      furniture.quantity = quantity;
    } else if (selectionVarnish != undefined && quantity == undefined) {
      furniture.varnish = selectionVarnish;
      furniture.quantity = 1;
    } else {
      furniture.varnish = furniture.varnish[0];
      furniture.quantity = 1;
    }
    alert("Votre article a été ajouté au panier");
    prixTotal();
  });
  console.log(addEventListener);

  //* Fonction du prix total dans localStorage------------------------------------
  function prixTotal() {
    let price = parseInt(furniture.price);
    let prixDuPanier = JSON.parse(localStorage.getItem("prixTotal"));

    if (prixDuPanier == 0) {
      localStorage.setItem(
        "prixTotal",
        prixDuPanier + (price / 100) * furniture.quantity
      );
    } else {
      localStorage.setItem(
        "prixTotal",
        prixDuPanier + (price / 100) * furniture.quantity
      );
    }
  }
  console.log("prixTotal:" + prixTotal);

  //-------Fonction du prix total dans localStorage------------------------------------
  function prixTotal() {
    let price = parseInt(furniture.price);
    let prixDuPanier = JSON.parse(localStorage.getItem("prixTotal"));

    if (prixDuPanier == 0) {
      localStorage.setItem(
        "prixTotal",
        prixDuPanier + (price / 100) * furniture.quantity
      );
    } else {
      localStorage.setItem(
        "prixTotal",
        prixDuPanier + (price / 100) * furniture.quantity
      );
    }
  }
  //---------------Ajout dans localStorage------------------------------------------
  localStorage.setItem("article", JSON.stringify(furniture));
  console.log(localStorage);
}
//--Fonction ajouter un produit selectionné dans LocalStorage
const addProductLocalStorage = () => {
  productSendInLocalStorage.push(ProductChoice);
  localStorage.setItem("article", JSON.stringify(productSendInLocalStorage));
};

//-------------Stocker la recupération des valeurs du formulaire dans le local Storage
//Déclaration de la variable "productSendInLocalStorage" dans laquelle on met les key et les valeurs qui sont dans le localStorage

let productSendInLocalStorage = JSON.parse(localStorage.getItem("article"));
//---JSON.parse c'est pour convertir les données au format JSON qui sont dans le localStorage en objet JS.

//---S'il y a déjà des produits d'enregistré dans le Local Storage

if (productSendInLocalStorage) {
  addProductLocalStorage();
  console.log("ok");
}

// S'il n' y a pas de produit d'enregistré dans le Local Storage
else {
  productSendInLocalStorage = [];
  addProductLocalStorage();
}
console.log(ProductChoice);

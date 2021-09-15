//*-----récupération de l'id produit dans l'url avec la méthode URLSearchParams----------
let params = new URL(document.location).searchParams;
let id = params.get("id");

//-----------Const et variables -----------------------------
const varnishElt = document.getElementById("varnish-select");
console.log("varnishElt:" + varnishElt);

const titleElt = document.getElementById("titre");
console.log("titleElt:" + titleElt);

const priceElt = document.getElementById("prix");
console.log("priceElt:" + priceElt);

const descriptionElt = document.getElementById("description");
console.log("descriptionElt:" + descriptionElt);

const imageElt = document.getElementById("image");
console.log("imageElt:" + imageElt);
const quantityElt = document.getElementById("quantityProduct");
console.log("quantityElt:" + quantityElt);

main();

function main() {
  getArticles();
  addToBasket();
}

function getArticles() {
  // On récupère uniquement le produit dont on a besoin via le paramètre dans la requête
  fetch(`http://localhost:3000/api/furniture/${id}`)
    .then(function (response) {
      return response.json();
    })
    .catch((error) => {
      let container = document.getElementById("container");
      container.innerHTML =
        "oups! Avez-vous bien lancé le serveur local au Port 3000 ?";
    })
    .then(function (furniture) {
      // On place les données reçues via l'API aux bons endroits sur la page
      titleElt.textContent = furniture.name;
      priceElt.textContent = furniture.price / 100 + " €";
      descriptionElt.textContent = furniture.description;
      imageElt.src = furniture.imageUrl;
      // formulaire option----------------------------------------------------------------------------------------------------------------------------------
      let optionVarnish = furniture.varnish;
      console.log("optionVarnish:" + optionVarnish);

      let structureOptions = [];
      //la boucle for pour afficher toutes les options du produit
      for (let varnish = 0; varnish < optionVarnish.length; varnish++) {
        structureOptions =
          structureOptions +
          `<option value="${varnish + 1}">${optionVarnish[varnish]}</option>`;
        //---Injection html dans la page produit pour le choix vernis

        varnishElt.innerHTML = structureOptions;
        console.log("varnishElt.innerHTML:" + varnishElt.innerHTML);
      }
    });
}
//-------------Fonctions ajouter dans le panier----------------------------------
function addToBasket() {
  const addToBasket = document.getElementById("add-to-basket");
  console.log("addToBasket:" + addToBasket);

  addToBasket.addEventListener("click", () => {
    alert("Votre article a été ajouté au panier");
    if (varnishElt != undefined && quantityElt != undefined) {
      console.log("hello if");
      // ------ Création du produit qui sera ajouté au panier--------------
      let productAdded = {
        name: titleElt.textContent,
        price: priceElt.textContent,
        quantity: quantityElt.value,
        _id: id,
      };
      console.log("productAdded:" + productAdded);

      // ----------------- Gestion du localStorage
      let arrayProductsInBasket = [];

      // Si le localStorage existe, on récupère son contenu, on l'insère dans le tableau arrayProductsInCart, puis on le renvoit vers le localStorage avec le nouveau produit ajouté.
      if (localStorage.getItem("products") !== null) {
        arrayProductsInBasket = JSON.parse(localStorage.getItem("products"));

        // Si le LS est vide, on le crée avec le produit ajouté
      }
      arrayProductsInBasket.push(productAdded);
      localStorage.setItem("products", JSON.stringify(arrayProductsInBasket));
    }
  });
}
console.log("addEventlistener:" + addEventListener);

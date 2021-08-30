// récupération de la chaine de requete dans l'url
const queryString_url_id = window.location.search;

//méthode pour extraire l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);

const id = urlSearchParams.get("id");

const quantityElt = document.getElementById("quantity");

const basketElt = document.getElementById("add_to_basket");

//on récupère uniquement le produit dont on a besoin via le paramètre dans la réquête
//Réccupérer et afficher les données de API

fetch(`http://localhost:3000/api/furniture/${id}`)
  .then((res) => res.json())
  .then((arrayFurnitures) => {
    let cardArticle = "";

    // la structure html pour l'affichage du produit selectionné
    cardArticle += ` 
    <div id="container_page_product" class="products_container">
        <figure class="product_single">
            <img class="product_single"src="${arrayFurnitures.imageUrl}"
       alt="meuble en chêne" />
         </figure>
       <div class="product">
            <section class="meuble">
              <h2>${arrayFurnitures.name}</h2>
              <p>${arrayFurnitures.description}</p>
         
               <h3> ${arrayFurnitures.price / 100} € </h3>
               <div class="quantity_product">
          <label for="furnitureNum">Quantité :</label>
          <input id="furnitureNum" type="number" name="furnitureNum" value="1" min="1">
        </div>
          </section>
         
        
            <form>
              <label for="option_product">vernis:</label>
              <select name="option_product" id="option_product">
                <option value="varnish">Choix</option>
              </select>
            </form>

            <button id="add_to_basket" type="submit" name="add_to_basket">
              Ajouter au panier
            </button>
    
    `;
    // formulaire option
    let optionVarnish = arrayFurnitures.varnish;

    let structureOptions = [];
    console.log("optionVarnish : " + optionVarnish);
    //la boucle for pour afficher toutes les options du produit
    for (let j = 0; j < optionVarnish.length; j++) {
      structureOptions =
        structureOptions +
        `<option value="${j + 1}">${optionVarnish[j]}</option>`;
    }
    // Injection html dans la page web produit
    document.getElementById("container_page_product").innerHTML = cardArticle;
    // Injection html dans la pageproduit pour le choix vernis

    const varnishElt = document.getElementById("option_product");

    varnishElt.innerHTML = structureOptions;
  });

//-----------------Ajouter le produit au panier-------------
//Récupération des données séléctionnés par l'utilisateur et envoie du panier
function addToBasket() {
  productName = arrayFurnitures.name;
  id = arrayFurnitures._id;
  varnish = varnishElt.value;
  quantity = quantityElt.value;
  price = arrayFurnitures.price / 100;
}
console.log(addToBasket);
console.log("id 1 : " + id);
console.log("productName 1 : " + productName);
console.log("varnish 1 : " + varnish);
console.log("quantity 1 : " + quantity);
console.log("price 1 : " + price);
//Ecouter le bouton click
basketElt.addEventListener("click", addToBasket);
console.log(addEventListener);

//-------Stocker la récupération des valeurs du formulaire dans le localStorage
//basketElt = JSON.parse(localStorage.getItem("id"));
console.log("basketElt 1 : " + basketElt);
if (basketElt) {
  //basketElt.push(varnish);
  //localStorage.setItem("id", JSON.stringify(basketElt));
  localStorage.addToBasket;
  console.log("ProduitlocalStorage 2 : " + basketElt);
} else {
  basketElt = [];
  //basketElt.push(varnish);
  //localStorage.setItem("id", JSON.stringify(basketElt));
  localStorage.addToBasket;
  console.log("basketElt 3 : " + basketElt);
}
/*
localStorage.setItem("_id ", id);

localStorage.setItem("varnish ", varnish);
localStorage.setItem("quantity ", quantity);
localStorage.setItem("price ", price);
localStorage.setItem("furniture", productName);
console.log(localStorage);
*/
//-------localStorage getItem ------------

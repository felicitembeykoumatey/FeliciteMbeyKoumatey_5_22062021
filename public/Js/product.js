// récupération de la chaine de requete dans l'url
const queryString_url_id = window.location.search;

//méthode pour extraire l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);

const id = urlSearchParams.get("id");

const quantityElt = document.getElementById("quantity");

const basketElt = document.getElementById("add_to_basket");

// variables

//fonction

function addToBasket() {
  productName = furniture.name;
  id = furniture._id;
  varnish = varnishElt.value;
  quantity = quantityElt.value;
  price = furniture.price / 100;
}

//on récupère uniquement le produit dont on a besoin via le paramètre dans la réquête
//Réccupérer et afficher les données de API

fetch(`http://localhost:3000/api/furniture/${id}`)
  .then((res) => res.json())
  .then((furniture) => {
    let cardArticle = "";

    // la structure html pour l'affichage du produit selectionné
    cardArticle += ` 
    <div id="container_page_product" class="products_container">
        <figure>
            <img class="product_single"src="${furniture.imageUrl}"
       alt="meuble en chêne" />
         </figure>
       <div class="product">
            <section class="meuble">
              <h2>${furniture.name}</h2>
              <p>${furniture.description}</p>
         
               <h3> ${furniture.price / 100} € </h3>
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
    console.log(furniture);

    // formulaire option
    let optionVarnish = furniture.varnish;

    let structureOptions = [];
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

    //Ecouter le bouton click
    basketElt.addEventListener("click", addToBasket);
    console.log(addEventListener);

    //-------Stocker la récupération des valeurs du formulaire dans le localStorage

    localStorage.setItem(id, JSON.stringify(furniture));
    console.log(localStorage);
  });

//-----------------Ajouter le produit au panier-------------
//Récupération des données séléctionnés par l'utilisateur et envoie du panier

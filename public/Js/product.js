// récupération de la chaine de requete dans l'url
const queryString_url_id = window.location.search;

const urlSearchParams = new URLSearchParams(queryString_url_id);

const id = urlSearchParams.get("id");

const quantityElt = document.getElementById("quantity");

const basketElt = document.querySelector("button");

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
    <div class ="container_page_product">
        <figure>
            <img  class="image"src="${furniture.imageUrl}"
       alt="meuble en chêne" />
      
            <figcaption class="meuble">
              <h2>${furniture.name}</h2>
              <p>${furniture.description}</p>
         
               <span> ${furniture.price / 100} € </span>
                <form>
          <label for="quantity">Quantité :</label>${quantityElt.value}
          <input id="quantity" type="number"  value="1" min="1">
     
              <label for="option_product">vernis:</label>
              <select id="option_product">
                <option value="varnish">Choix</option>
              </select>
          <a href="./view/basket.html"><button id="add_to_basket">Ajouter au panier</button>
             </a>
            </form>
             </figcaption>
       </figure>
    `;

    // formulaire option
    let optionVarnish = furniture.varnish;

    let structureOptions = [];
    //la boucle for pour afficher toutes les options du produit
    for (let varnish = 0; varnish < optionVarnish.length; varnish++) {
      structureOptions =
        structureOptions +
        `<option value="${varnish + 1}">${optionVarnish[varnish]}</option>`;
    }
    // Injection html dans la page web produit
    document.getElementById("container_page_product").innerHTML = cardArticle;
    // Injection html dans la pageproduit pour le choix vernis

    const varnishElt = document.getElementById("option_product");
    varnishElt.innerHTML = structureOptions;

    //Ecouter le bouton click
    basketElt.addEventListener("click", addToBasket);
    //------------Le localStorage--------------------------

    //-------Stocker la récupération des valeurs du formulaire dans le localStorage
    //Déclaration de la variable dans laquelle on met les keys et values dans le localstorage
    let produitEnregistreDansLocalStorage = JSON.parse(
      localStorage.getItem("produit")
    );
    console.log(produitEnregistreDansLocalStorage);

    localStorage.setItem(id, JSON.stringify(furniture));
    console.log(localStorage);
  });

//-----------------Ajouter le produit au panier-------------
//Récupération des données séléctionnés par l'utilisateur et envoie du panier

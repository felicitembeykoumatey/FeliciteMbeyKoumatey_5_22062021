// récupération de la chaine de requete dans l'url
const queryString_url_id = window.location.search;

//méthode pour extraire l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);

const id = urlSearchParams.get("id");

//on récupère uniquement le produit dont on a besoin via le paramètre dans la réquête
//Réccupérer et afficher les données de API

fetch(`http://localhost:3000/api/furniture/${id}`)
  .then((res) => res.json())
  .then((array_furnitures) => {
    let cardArticle = "";

    // la structure html pour l'affichage du produit selectionné
    cardArticle += ` 
    <div id="container_page_product">
        <figure class="product_single">
            <img class="picture_furniture"src="${array_furnitures.imageUrl}"
       alt="meuble en chêne" />
         </figure>
       <div class="product">
            <ul class="meuble">
              <li>${array_furnitures.name}</li>
              <li>${array_furnitures.description}</li>
         
               <li> ${array_furnitures.price / 100} € </li>
          </ul>
         
        <div class="option_product_global">
          <form>
            <label for ="option_product_choice">Choisir le vernis</label>
              <select name="option_product"id="option_product">
              
              </select>
  
        </div>
  
  <a href="../view/basket.html?id=${_id[i]}">
    <button id="ajout_panier" type="submit" name="ajout_panier">Ajouter au panier</button>
    </a></form>
     </div>
     </div>
    
    `;
    // formulaire option
    let optionQuantite = array_furnitures.varnish;

    let structureOptions = [];

    //la boucle for pour afficher toutes les options du produit
    for (let j = 0; j < optionQuantite.length; j++) {
      structureOptions =
        structureOptions +
        `<option value="${j + 1}">${optionQuantite[j]}</option>`;
    }
    // Injection html dans la page web produit
    document.getElementById("container_page_product").innerHTML = cardArticle;
    // Injection html dans la pageproduit pour le choix vernis
    const positionElement = document.querySelector("#option_product");

    positionElement.innerHTML = structureOptions;
  });

//-----------------Gestion du panier-------------
//Récupération des données séléctionnés par l'utilisateur et envoie du panier
// Séléction de l'id du formulaire
const idForm = document.querySelector("#option_product");

// Ajouter l'article au panier
let ajoutPanier = document.querySelector("#ajout_panier");

ajoutPanier.addEventListerner("click", (event) => {
  event.preventDefault();
  // Mettre le choix de l'utilisateur dans une variable
const choixForm = idForm.value;
  //Récupération des valeurs du formulaire
  let optionProduct = {
  productName: array_furnitures.productName,
  id_productSelectionner: array_furnitures._id,
  option_product: choixForm,
  quantite: 1,
  prix: array_furnitures.price / 100
}
});



console.log("optionProduct:" + optionProduct);

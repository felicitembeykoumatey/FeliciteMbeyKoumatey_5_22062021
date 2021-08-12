// récupération de la chaine de requete dans l'url
const queryString_url_id = window.location.search;
console.log("queryString_url_id : " + queryString_url_id);
//méthode pour extraire l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log("urlSearchParams : " + urlSearchParams);
const id = urlSearchParams.get("id");
console.log("id : " + id);

//on récupère uniquement le produit dont on a besoin via le paramètre dans la réquête
//Réccupérer et afficher les données de API

fetch(`http://localhost:3000/api/furniture/${id}`)
  .then((res) => res.json())
  .then((array_furnitures) => {
    console.log("Valeur du array_furnitures :");
    console.log(array_furnitures);
    let cardArticle = "";
    console.log(`${array_furnitures.imageUrl}`);

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
    <button id="ajout_panier">Ajouter au panier</button>
    </a></form>
     </div>
     </div>
    
    `;
    // formulaire option
    let optionQuantite = array_furnitures.varnish;
    console.log("optionQuantite:" + optionQuantite);
    let structureOptions = [];
    console.log("structureOptions:" + structureOptions);
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
    console.log(option_product);
    positionElement.innerHTML = structureOptions;
    console.log("positionElement:" + positionElement);
  });

//-----------------Gestion du panier-------------
//Récupération des données séléctionnés par l'utilisateur et envoie du panier
// Séléction de l'id du formulaire

//Mettre le choix de l'utilisateur dans une variable

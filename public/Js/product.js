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
    cardArticle += ` <div id="container_page_product">
     <figure class="product_single">
       <img src="${array_furnitures.imageUrl}"
       alt="meuble en chêne" /> 
        <ul class="meuble">
           <li>${array_furnitures.name}</li>
         <li>${array_furnitures.description}</li>
         
          <li> ${array_furnitures.price / 100} € </li>
          </ul>

      </figure>
  

  </div>
  <a href="../view/basket.html?id=${_id[i]}">
    <button id="ajout_panier">Ajouter au panier</button></a>`;
    document.getElementById("container_page_product").innerHTML = cardArticle;
  });
//-----------------Gestion du panier-------------
//Récupération des données séléctionnés par l'utilisateur et envoie du panier
// Séléction de l'id du formulaire

//Mettre le choix de l'utilisateur dans une variable

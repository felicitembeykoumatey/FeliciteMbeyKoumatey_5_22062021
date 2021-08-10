// récupération de la chaine de requete dans l'url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);
//méthode pour extrairer l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);
const id = urlSearchParams.get("id");
console.log(id);
//Affichage du produit qui a été selectionné par l'id
//--methode : find()

//on récupère uniquement le produit dont on a besoin via le paramètre dans la réquête
let cardArticle = fetch(`http://localhost:3000/api/furniture/${id}`);
console.log(cardArticle);

// Sélection de la classe ou je vais injecter le code HTML
const positionFurniture = document.querySelector("#container_page_product");
console.log(positionFurniture);
// la structure html pour l'affichage du produit selectionné
const firstElementChild = ` <div id="container_page_product">
      <figure class="product_single">
        <img src="${array_furnitures.imageUrl}"
       alt="meuble en chêne" /> </a>
        <div class="meuble">
        <ul>
        <li>${array_furnitures.name}</li>
         <li>${cardArticle.description}</li>
         
          <li> >${cardArticle.price / 100} € </li>
          </ul>

      </figure>
    </div>
    <form>
      <label for="option_product"></label>
      <select name="option_product" id="option_product">
            <option  value="varnish">Choix vernis</option>
    </select>
    </div>

    <button id="ajout_panier">Ajouter au panier</button>
    </section>`;

// injection html dans la page produit
positionFurniture.innerHTML = firstElementChild;

// récupération de la chaine de requete dans l'url
const queryString_url_id = window.location.search;
console.log("queryString_url_id : " + queryString_url_id);
//méthode pour extrairer l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log("urlSearchParams : " + urlSearchParams);
const id = urlSearchParams.get("id");
console.log("id : " + id);
//Affichage du produit qui a été selectionné par l'id

//on récupère uniquement le produit dont on a besoin via le paramètre dans la réquête

//Réccupérer et afficher les données de API

fetch(`http://localhost:3000/api/furniture/${id}`)
  .then((res) => res.json())
  .then((array_furnitures) => {
    console.log("Valeur du array_furnitures :");
    console.log(array_furnitures);
    let truc = "";
    console.log(`${array_furnitures.imageUrl}`);

    // la structure html pour l'affichage du produit selectionné
    truc += ` <div id="container_page_product">
     <figure class="product_single">
       <img src="${array_furnitures.imageUrl}"
       alt="meuble en chêne" /> </a>
        <ul class="meuble">
           <li>${array_furnitures.name}</li>
         <li>${array_furnitures.description}</li>
         
          <li> ${array_furnitures.price / 100} € </li>
          </ul>

      </figure>
    </div>
    <form>
      <label for="option_product"></label>
      <select name="option_product" id="option_product">
            <option  value="varnish">Choix vernis</option>
    </select>
    </form>

    <button id="ajout_panier">Ajouter au panier</button>`;
    document.getElementById("container_page_product").innerHTML = truc;
  });

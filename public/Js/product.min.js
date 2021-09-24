let params = new URL(document.location).searchParams,
  id = params.get("id");
const titleElt = document.getElementById("titre");
const priceElt = document.getElementById("prix");
const descriptionElt = document.getElementById("description");
const imageElt = document.getElementById("image");
const quantityElt = document.getElementById("quantity-product");

const textConfirmation = document.getElementById("confirmation-ajout");

fetch(`http://localhost:3000/api/furniture/${id}`)
  .then(function (response) {
    return response.json();
  })
  .catch((e) => {
    document.getElementById("product").innerHTML =
      "oups! Lancez le serveur local au Port 3000 !";
  })
  .then(function (furniture) {
    console.log(furniture);
    // code cibler  HTML
    const productElt = document.getElementById("product");
    let cardArticle = "";

    //Formatage du format du prix

    let priceArticle = furniture.price / 100;
    let newPrice = new Intl.NumberFormat("fr-Fr", {
      style: "currency",
      currency: "EUR",
    }).format(priceArticle);

    // injecter HTML

    cardArticle += `
<figure>
 <img src="${furniture.imageUrl}">
		    <form id="formulaire-product">
				<figcaption  id="description">
			
			
							<h2>${furniture.name}</h2>
							<p>${newPrice}</p>
              <p>${furniture.description}</p>
				
           </figcaption>
           </figure>
    
          <div>
            <label for="varnish-select"> Vernis :</label>
            <select name="varnish" id="varnish-select"></select>
          </div>

          <label for="quantity">Quantité :</label>
          <select name="quantity" id="quantity-product" class="mb-3">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="3">5</option>
            <option value="4">6</option>
            <option value="3">7</option>
            <option value="4">8</option>
            <option value="3">9</option>
            <option value="4">10</option>
          </select>
     

        <button id="add-to-basket" type="submit" name="btn-envoyer">
          Ajouter au panier
        </button>
        <div id="confirmation-ajout"></div>
        <bouton id="look-basket">
          <a href="../view/basket.html">Voir le panier</a>
        </bouton>
        <bouton id="return-home">
          <a href="../index.html">Retour</a>
        </bouton>
      </form>
`;
    productElt.innerHTML = cardArticle;

    const varnishElt = document.getElementById("varnish-select");
    let structureVarnish = "";

    furniture.varnish.forEach((optionVarnish) => {
      console.log(optionVarnish);
      structureVarnish += `<option value="${optionVarnish}">${optionVarnish}</option>`;
    });

    console.log(structureVarnish);

    varnishElt.innerHTML = structureVarnish;

    // selection formulaire  dans mon HTML

    console.log(localStorage);

    // Ecouter les évenements
    const addToBasket = document.getElementById("add-to-basket");

    // Ecouter les évenements

    addToBasket.addEventListener("click", (event) => {
      event.preventDefault();

      if (quantityElt.value > 0 && quantityElt.value < 100) {
        let productAdded = {
          article: furniture.name,
          _id: id,
          price: parseFloat(newPrice),
          quantity: parseFloat(
            document.getElementById("quantity-product").value
          ),
        };
        // Gestion LocalStorage

        let basket = [];
        //si l'article est dans le LS, on recupère son contenu, on l'insère dans le tableau basket, puis on le renvoit vers le LS avec le nouveau article.

        if (localStorage.getItem("products") !== null) {
          basket = JSON.parse(localStorage.getItem("products"));

          // sinon, on le crée avec l'article ajouté
        }
        basket.push(productAdded),
          localStorage.setItem("products", JSON.stringify(basket));

        alert("Votre article a été ajouté au panier");
      }
    });
  });
console.log(JSON);
console.log("hello if");

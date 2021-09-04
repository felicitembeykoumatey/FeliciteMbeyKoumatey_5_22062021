//variable
let _id = [];
let imageUrl = [];
let productName = [];
let description = [];
let varnish = [];
let quantity = [];
let price = [];
let i = [];
// Fonction qui va afficher les produits dans le site
// Chercher les données de API

fetch("http://localhost:3000/api/furniture/")
  .then((res) => res.json())
  .then((arrayFurnitures) => {
    let cardArticles = "";
    //Réccupérer et afficher les données de API
    for (i = 0; i < arrayFurnitures.length; i++) {
      arrayFurnitures.forEach((furniture, i) => {
        _id[i] = furniture._id;
        imageUrl[i] = furniture.imageUrl;
        productName[i] = furniture.name;
        description[i] = furniture.description;
        varnish[i] = furniture.varnish;
        quantity[i] = furniture.quantity;
        price[i] = furniture.price;
      });

      cardArticles += `
     <div class="global_articles" id="furnitures">
        <figure class="product">
            <a href="./view/product.html?id=${_id[i]}">
           <img src=${
             imageUrl[i]
           }  class="products_container" sizes="100vw" alt="image_product"/> </a>
         <figcaption class="description">
            <article>
         <h3>${productName[i]}</h3>
       
           <p>${price[i] / 100}€</p>
        
        </article>
       
           </figcaption>
        </figure>
        </div>
        `;

      document.getElementById("furnitures").innerHTML = cardArticles;
    }
  })
  .catch((error) => {
    // Le code en cas d'erreur
  });

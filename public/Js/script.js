// Chercher les données de API
fetch("http://localhost:3000/api/furniture/")
  .then((res) => res.json())
  .then((array_furnitures) => {
    let picture = "";

    //Réccupérer et afficher les données de API
    array_furnitures.forEach(function (product) {
      picture += `
        <figure class="product">
         <a href="/product.html?given_id=${product._id}">
        <img src=${
          product.imageUrl
        } class="products_container" alt="image_product"/>
        <figcaption class="description">
        <p>${product.name}</p>
        <div class="price">
        <p>${product.price / 100}€</p>
        </div>
        </figcaption>
        </a>
        </figure>
        `;
    });
    document.getElementById("products").innerHTML = picture;
  })
  .catch((error) => console.log("Erreur : " + error));

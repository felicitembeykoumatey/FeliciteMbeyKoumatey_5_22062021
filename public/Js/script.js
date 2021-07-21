fetch("http://localhost:3000/api/furniture/")
  .then((res) => res.json())
  .catch((error) => {
    let productsContainer = document.querySelector(".products-container");
    productsContainer.innerHTML =
      "Error affichage images. Lancez le serveur local au Port 3000.<br>Si le problème persiste, contactez-nous.";
  })
  .then((array_furnitures) => {
    let output = "";
    array_furnitures.forEach(function (product) {
      output += `
        <figure class="product">
        <img src=${product.imageUrl} class="products_container" alt="image_product"/>
        <figcaption class="description">
        <p>${product.name}</p>
                <p>${product.description}</p>
        <div class="price">
        <p>${product.price},00€</p>
        </div>
        </figcaption>
        </figure>
        `;
    });
    document.getElementById("products").innerHTML = output;
  })
  .catch((error) => console.log("Erreur : " + error));

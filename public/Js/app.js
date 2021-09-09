createPanier();
indicateurNbArticlePanier();

// Création de Panier
function createPanier() {
  if (localStorage.getItem("panierKey") == null) {
    let panierArray = [];
    let panierArrayStr = JSON.stringify(panierArray);
    localStorage.setItem("panierKey", panierArrayStr);
  }
}
console.log(createPanier);

// Converssion du prix
function convertPrice(price) {
  return price / 100;
}

// Indicateur du nombre d'articles dans le panier
function indicateurNbArticlePanier() {
  let getPanier = localStorage.getItem("panierKey");

  let arrayGetPanier = JSON.parse(getPanier);
  const nbArticleInPanier = arrayGetPanier.length;

  if (nbArticleInPanier > 0) {
    const headerReload = document.querySelector("header");
    headerReload.innerHTML = `
        <header class="nav">
           
        
            <nav>
                <a href="basket.html" id="basket">
                    <div class="nb-articles cache"> ${nbArticleInPanier} </div>
                    <i class="fas fa-shopping-basket"></i>
                    <p>Panier</p>
                </a>
                
            </nav>
        </header>
        `;

    let affichageNbArticlesPanier = document.querySelector(".nb-articles");
    console.log("affichageNbArticlesPanier:" + affichageNbArticlesPanier);
    affichageNbArticlesPanier.classList.remove("cache");
  }
}

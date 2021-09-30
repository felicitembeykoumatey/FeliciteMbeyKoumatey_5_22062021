//déclaration variables
const formulaireElt = document.getElementById("formulaire");
const totalPriceElt = document.getElementById("total-price");
const productName = document.getElementById("articleName");
const priceElt = document.getElementById("articlePrice");
const basketELt = document.getElementById("container-recapitulatif");
const positionElt = document.getElementById("articles");

//Déclaration de la variable "basket"dans laquelle on met les key et les values.
let basket = JSON.parse(window.localStorage.getItem("products"));
//------------Affichage produit selectionner------------------------------------------------
pageBasket();

function pageBasket() {
  // si le panier est vide
  if (basket === null) {
    const panierVide = `<main id="container-products-basket"><div class="empty-basket">Le panier est vide !</div></main>`;
    positionElt.innerHTML = panierVide;
  } else {
    //si le panier n'est pas vide: afficher les produits dans le LS
    let structureProductBasket = [];

    //faire boucle for pour parcourir mon LS et recupérer les objets

    for (i = 0; i < basket.length; i++) {
      structureProductBasket += `<div class="quantity"> Qauntité - ${basket[i].quantity}</div>
      <div class="name">  ${basket[i].article}</div> <div class="price">${basket[i].price} € </div>
`;
    }

    if (i == basket.length) {
      // injection html dans la page panier
      positionElt.innerHTML = structureProductBasket;
    }
  }
}
//-----------Fin de l'affichage des produits du panier-----------------------------------

//******************Gestion du bouton vider le panier*******************************************/
toEmptyBasket();
//-----------Le bouton POUR vider le panier et le LS----------------------
function toEmptyBasket() {
  const btnToEmptyBasket = document.getElementById("to-empty-cart");
  console.log(btnToEmptyBasket);
  btnToEmptyBasket.addEventListener("click", () => {
    localStorage.clear();
  });
}

////****************Fin Gestion du bouton vider le panier*****************************************************/

////*********************************Le montant total du panier ******************************************************/
let priceTotalCalcul = [];
//Aller chercher les prix dans le panier

for (
  let priceCalculation = 0;
  priceCalculation < basket.length;
  priceCalculation++
) {
  let priceProductInBasket =
    basket[priceCalculation].price * basket[priceCalculation].quantity;

  //mettre les prix du panier dans la variable "priceTotalCalcul"

  priceTotalCalcul.push(priceProductInBasket);
}

// Additionner les prix qu'il ya dans le tableau de la variable "prix totale"---------
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = priceTotalCalcul.reduce(reducer, 0);

// le code html du prix total à afficher

const affichagePrixHtml = `
<div class ="affichage-prix-html">${totalPrice} € </div>`;
totalPriceElt.insertAdjacentHTML("beforeend", affichagePrixHtml);
//*********************************Fin Montant Total Panier***************************************************/
//*******************************Gestion Formulaire et validation commande************************************/

structureFormulaire = "";

// Sélection élément DOM pour le positionnement du formulaire
const afficherFormulaireHtml = () => {
  const positionElt4 = document.getElementById("container");
  const structureFormulaire = `
  

   <section class="formulaire-section">
          <h2>Vos coordonnées</h2>

          <form id="contact" class="card-body">

            <label for="firstName">Prénom</label><span id = "firstNameMiss" class="info-champs-manquant"></span>
            <input type="text" id="firstName" placeholder="Prénom" />
          <label for="lastName">Nom</label>
            <input type="text" id="lastName" placeholder="Name" />
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Email" />
            <label for="address">Adresse</label>
            <input id="address" placeholder="Adresse" />
            <label for="city">Ville</label>
            <input type="text" id="city" placeholder="Ville" />
            <label for="postal">Code Postal</label>
            <input type="text" id="codePostal" placeholder="Code postal" />

            <!--Fin forumlaire dans le HTML-->
            


          </form>
           <button id="btn-order" class="validate-order>
          <a href="../view/order.html" id="validate" class="validation"
            >Valider ma Commande</a
          >
        </button>

            <button class="continue-shopping"><a href="../index.html">Continuer mes achats</a></button>
        </section>
      </div>
  
  `;

  //------------------------------------------Injection HTML------------------------------------------------------------------------
  positionElt4.insertAdjacentHTML("afterend", structureFormulaire);
};
afficherFormulaireHtml();
//-------------------------bouton envoyer le formulaire----------------------------------------------------------------------------
const btnOrderElt = document.getElementById("btn-order");

//-----------------------------AddEventListener-------------------------------------------------------------------------------------
btnOrderElt.addEventListener("click", (e) => {
  e.preventDefault();
  // Création /definition d'une classe pour fabriquer l'objet lequel iront
  // Les values du formulaire
  class Formulaire {
    constructor(firstName, lastName) {
      this.firstName = document.getElementById("firstName").value;
      this.lastName = document.getElementById("lastName").value;
      this.email = document.getElementById("email").value;
      this.address = document.getElementById("address").value;
      this.city = document.getElementById("city").value;
      this.codePostal = document.getElementById("codePostal").value;
    }
  }

  //Appel de l'instance Formulaire pour créer l'objet formulairesValues

  const formulaireValues = new Formulaire();
  // const formulaireValues = {
  //   firstName: document.getElementById("firstName").value,
  //   lastName: document.getElementById("lastName").value,
  //   email: document.getElementById("email").value,
  //  address: document.getElementById("address").value,
  //  city: document.getElementById("city").value,
  //  codePostal: document.getElementById("codePostal").value,
  // };

  //Mettre l'objet "formulaireValues" dans un objet

  localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));

  //Mettre les values du formulaire et mettre les produits selectionnés dans un objet à envoyer ver le serveur
  const aEnvoyer = {
    basket,
    formulaireValues,
  };

  //****************************GESTION VALIDATION FORMULAIRE********************************************************************************/
  // Utilisation de la méthode expression regulière-------------------------------------------------
  // --------contrôle du prenom-----------------------------

  const textAlert = (value) => {
    return `${value}: chiffre et symbole ne sont pas autorisé \n Ne pas dépasser 20 caractères, minimum 3 caractères`;
  };
  const regExFirstNameLastNameCity = (value) => {
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
  };
  function firstNameControl() {
    const yourFirstname = formulaireValues.firstName;

    if (regExFirstNameLastNameCity(yourFirstname)) {
      return true;
    } else {
      alert(textAlert("Prénom"));
      return false;
    }
  }

  //--------------------contrôle nom--------------------------------------
  function lastNameControl() {
    const yourLastname = formulaireValues.lastName;
    if (regExFirstNameLastNameCity(yourLastname)) {
      return true;
    } else {
      alert(textAlert("Nnom"));
      return false;
    }
  }
  //---------------contrôle code postal----------------------------------------
  const regExcodePostal = (value) => {
    return /^[0-9]{5}$/.test(value);
  };
  function codePostalControl() {
    // contrôle de la validité du code postal

    const theCodePostal = formulaireValues.codePostal;
    if (regExcodePostal(theCodePostal)) {
      return true;
    } else {
      alert(textAlert("Code postal: doit être composé de 5 chiffres"));
      return false;
    }
  }

  //--------------------contrôle email---------------------
  const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  function emailControl() {
    // contrôle de la validité d'email

    const yourEmail = formulaireValues.email;
    if (regExEmail(yourEmail)) {
      return true;
    } else {
      alert(textAlert("l'email n'est pas valide"));
      return false;
    }
  }

  //------------Validation du champs adresse----------------------------
  const regExAdresse = (value) => {
    return /^[A-Za-z0-9\s]{3,70}$/.test(value);
  };

  function adressControl() {
    const yourAdress = formulaireValues.address;
    if (regExAdresse(yourAdress)) {
      return true;
    } else {
      alert(
        "L'adresse doit contenir que des lettres sans ponctuation et des chiffres"
      );
      return false;
    }
  }
  //*****************************--FIN GESTION VALIDATION FORMULAIRE---*************************************************
  //controle validation formulaire avant envoi dans le LS

  if (
    firstNameControl() &&
    lastNameControl() &&
    codePostalControl() &&
    emailControl() &&
    adressControl()
  ) {
    //Mettre l'objet "formulairesValues" dans le LS
    localStorage.setItem("formulairesValues", JSON.stringify(formulaireValues));
  } else {
    alert("Veuillez bien remplir le formulaire");
  }

  //--------------------Mettre le contenu du LocalStorage dans les champs du formulaire-----------------------------------------------
  //--------------------Prendre la key dans le LocalStorage et la mettre dans une variable-----------------------------------------------
  const dataLocalStorage = localStorage.getItem("formulaireValues");

  //convertir la chaîne de caractère en objet javascript
  const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

  //Fonction pour que le champ du formulaire soit rempli par les données du LS si elle existe

  function fillInFieldInputFromLocalStorage(input) {
    document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
  }
  fillInFieldInputFromLocalStorage("firstName");
  fillInFieldInputFromLocalStorage("lastName");
  fillInFieldInputFromLocalStorage("email");
  fillInFieldInputFromLocalStorage("address");
  fillInFieldInputFromLocalStorage("city");
  fillInFieldInputFromLocalStorage("codePostal");

  //*******************************--FIN Gestion Formulaire et validation commande--************************************/

  //********************************---Envoi requête vers le server----**********************************************/
  //envoie de l'objet "aEnvoyer" vers le serveur
  //------------Requête HTTP du type POST pour envoyer mes données vers le serveur---------------------
  // Création de l'entête de la requête
  const promise01 = fetch("http://localhost:3000/api/furniture/order", {
    method: "POST",
    body: JSON.stringify(aEnvoyer),
    headers: { "Content-Type": "application/json" },
  });

  // Pour voir le resultat dans la console.
  promise01.then(async (response) => {
    try {
      const contenu = await response.json();
    } catch (e) {
      console.log(e);
    }
  });
});

// on s'assure que le Dom est chargé
window.onload=() => {
    // Ici le document est chargé
fetch("https://github.com/OpenClassrooms-Student-Center/JWDP5")
main();

function main() {
  getArticles();
}

// Récupérer les articles depuis l'API
function getArticles() {
  fetch(" http://localhost:3000/api/furniture")
    .then(function (res) {
      return res.json();
    })

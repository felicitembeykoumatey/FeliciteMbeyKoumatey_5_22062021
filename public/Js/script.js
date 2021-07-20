main();
function main() {}

fetch("http://localhost:3000/api/furniture")
  .then((response) => response.json())
  .then((response2) => console.log(response2));

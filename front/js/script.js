// On récupére l'API des canapés 
fetch("http://localhost:3000/api/products")
  .then(res => res.json())
  .then((data) => productsData(data))
  .catch(err => console.log("An error has occurred", err))

// Création de la fonction avec toutes les data des canapés 
function productsData(allProducts) {

  // Boucle forEach qui va nous permettre de récupérer les données dont on a besoin sous forme de tableau, on ne demande pas la color et le price car ils sont inutiles ici
  allProducts.forEach((product) => {

    //Création de divers constante qui vont nous permettre d'appeler nos fonctions, toujours pour chaque éléments du tableau
    const { _id, imageUrl, altText, name, description } = product   // Destructuring 
    const a = productLink(_id)
    const article = document.createElement('article')
    const img = productImage(imageUrl, altText)
    const heading = productName(name)
    const p = productDescription(description)

    appendProductToArticle(article, [img, heading, p]) // Array avec les infos afin de les réutiliser dans le For Each 
    appendProductToSection(a, article)
  })
}

// Création d'une boucle nous permettant d'introduire l'img, le h3 et le p dans une même balise <article>
function appendProductToArticle(article, info) {
  info.forEach((productInfo) => {
    article.appendChild(productInfo)
  })
}
// Création du lien vers l'ID du produit 
function productLink(id) {
  const a = document.createElement('a')
  a.href = './product.html?id=' + id
  return a
}

// Organisation de la section items, on appelle l'ID #items et on lui introduit la balise <a> a laquelle on y introduit la balise <article> 
function appendProductToSection(a, article) {
  const itemsSection = document.getElementById('items')
  itemsSection.appendChild(a)
  a.appendChild(article)
  return itemsSection
}

// Création de la balise <img>
function productImage(imageUrl, altText) {
  const img = document.createElement('img')
  img.src = imageUrl
  img.alt = altText
  return img
}

//Création de la balise <h3>
function productName(name) {
  const h3 = document.createElement('h3')
  h3.textContent = name
  h3.classList.add('productName')
  return h3
}

//Création de la balise <p>
function productDescription(description) {
  const p = document.createElement('p')
  p.textContent = description
  p.classList.add("productDescription")
  return p
}



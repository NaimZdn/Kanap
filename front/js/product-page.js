// On récupère l'Id sur produit présent sur l'Url de la page
const windowUrl = window.location.search;
const urlId = new URLSearchParams(windowUrl);
const productId = urlId.get("id");

// Requête API en fonction de l'ID du produit
fetch (`http://localhost:3000/api/products/${productId}`) 
    .then (res => res.json())
    .then ((data) => productsData(data))
    .catch (err => console.log("An error has occurred", err))

// On appelle nos fonctions avec les éléments que l'on souhaite récupérer en argument
function productsData (currentProduct) {
        const { imageUrl, name, altText, price, description, colors} = currentProduct 
        currentProductImage(imageUrl, altText)
        currentProductName(name)
        currentProductPrice(price)
        currentProductDescription(description)
        currentProductColor(colors)
}

// On crée une balise <img> selon l'Id du produit récupéré 
function currentProductImage (imageUrl, altText){
    const imgProduct = document.createElement ('img')
    imgProduct.src = imageUrl
    imgProduct.alt = altText 
    const imgParent = document.querySelector(".item__img")
    imgParent.appendChild(imgProduct)
         
}

// Ajout du nom du produit à #title 
function currentProductName (name) {
    const title = document.getElementById ('title')
    title.textContent =  name 
        return title 
}

// Ajout du prix du produit à #price
function currentProductPrice (price) {
    const priceSpan = document.getElementById('price')
    priceSpan.textContent = price 
        return priceSpan
}

// Ajout de la description du produit à #description 
function currentProductDescription(description) {
    const p = document.getElementById("description")
    p.textContent = description
        return description
}

// Ajout des différentes options de couleurs avec boucle ForEach afin de récupérer toutes les couleurs de chaque produit selon leur ID
function currentProductColor(colors){
    const selectColor = document.getElementById("colors")
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            selectColor.appendChild(option)
        })
}

// Gestion du LocalStorage 



function addToCartProduct (){
    const buttonAdd = document.getElementById ("addToCart")
        .addEventListener ("click", () => {
            let productBoard = JSON.parse(localStorage.getItem("productInCart"));
            const colorProduct = document.getElementById ('colors').value 
            const quantityProduct = document.getElementById ('quantity').value 
    
            if (orderValidIf(colorProduct, quantityProduct)) 
            return 
        
            const productInfo = Object.assign({}, {
                color: `${colorProduct}`, 
                quantity : `${quantityProduct}`,
                id : `${productId}`,
            })
    // Si le localStorage est vide alors on push les infos du produit que l'on souhaite ajouter au panier 
        if (productBoard == null ) {
            productBoard = []; 
            productBoard.push(productInfo); 
            localStorage.setItem('productInCart', JSON.stringify(productBoard));
    
        // Sinon, si il n'est pas vide alors on peut executer une de ces 2 conditions 
            } else if (productBoard != null) {

            // Si le produit dans le localStorage est le même que le produit que l'on souhaite ajouté alors on modifie seulement la quantité du produit
                for (i = 0; i < productBoard.length; i++) {
                    if (productBoard[i].id == productId && productBoard[i].color == colorProduct ){
                            let quantityValue = parseInt(productBoard[i].quantity) + parseInt(quantityProduct)
                                        
                    return (productBoard[i].quantity = quantityValue, 
                        localStorage.setItem("productInCart",JSON.stringify(productBoard)))
                    }         
                }
            // Si le produit est le même mais sa couleur est différente alors on ajoute un nouveau produit, même procédé si le produit est différent
                for (i = 0; i < productBoard.length; i++) {
                    if ((productBoard[i].id == productId && productBoard[i].color != colorProduct) || productBoard[i].id != productId);

                    return (productBoard.push(productInfo),
                            localStorage.setItem("productInCart", JSON.stringify(productBoard)))
                        };
        }});
    }

function orderValidIf(colorProduct, quantityProduct) {
    if (colorProduct == null || colorProduct === "" || quantityProduct == null || quantityProduct == 0 ) {
        alert("Veuillez choisir une couleur et/ou une quantité")
        return true 
    }
    if (quantityProduct > 100 || quantityProduct < 0 ) {
        alert ("Veuillez choisir une quantité comprise entre 1 et 100")
        return true
    }
     else {
        alert ("Votre article a bien été ajouté au panier")
     }
}

addToCartProduct(); 



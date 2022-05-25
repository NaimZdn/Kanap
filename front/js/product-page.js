const windowUrl = window.location.search;
const urlId = new URLSearchParams(windowUrl);
const productId = urlId.get("id");

fetch (`http://localhost:3000/api/products/${productId}`) 
    .then (res => res.json())
    .then ((data) => productsData(data))
    .catch (err => console.log("An error has occurred", err))

function productsData (currentProduct) {
        const { imageUrl, name, altText, price, description, colors} = currentProduct 
        currentProductImage(imageUrl, altText)
        currentProductName(name)
        currentProductPrice(price)
        currentProductDescription(description)
        currentProductColor(colors)
}

function currentProductImage (imageUrl, altText){
    const imgProduct = document.createElement ('img')
    imgProduct.src = imageUrl
    imgProduct.alt = altText 
    const imgParent = document.querySelector(".item__img")
    imgParent.appendChild(imgProduct)
         
}

function currentProductName (name) {
    const title = document.getElementById ('title')
    title.textContent =  name 
        return title 
}

function currentProductPrice (price) {
    const priceSpan = document.getElementById('price')
    priceSpan.textContent = price 
        return priceSpan
}

function currentProductDescription(description) {
    const p = document.getElementById("description")
    p.textContent = description
        return description
}

function currentProductColor(colors){
    const selectColor = document.getElementById("colors")
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            selectColor.appendChild(option)
        })
}

///Panier 

function addToCartProduct (){
    const buttonAdd = document.getElementById ("addToCart")
    .addEventListener ("click", () => {
        let productBoard = JSON.parse(localStorage.getItem("productInCart"));
        const colorProduct = document.getElementById ('colors').value 
        const quantityProduct = document.getElementById ('quantity').value 
  
    if (orderValidIf(colorProduct, quantityProduct)) 
    return orderInCart
    
   const productInfo = Object.assign({}, {
        color: `${colorProduct}`, 
        quantity : `${quantityProduct}`,
        id : `${productId}`,
     
    })
    if (productBoard == null ) {
        productBoard = []; 
        productBoard.push(productInfo); 
        localStorage.setItem('productInCart', JSON.stringify(productBoard));

    } else if (productBoard != null) {
        for (i = 0; i < productBoard.length; i++) {
    
            if (productBoard[i].id == productId && productBoard[i].color == colorProduct ){
                    let quantityValue = parseInt(productBoard[i].quantity) + parseInt(quantityProduct)
                                  
                return(            
                    productBoard[i].quantity = quantityValue, 
                    localStorage.setItem("productInCart",JSON.stringify(productBoard)), 
                    (productBoard = JSON.parse(localStorage.getItem("productBoard")))
        )}         
    }
        for (i = 0; i < productBoard.length; i++) {
            if ((productBoard[i].id == productId && productBoard[i].color != colorProduct) || productBoard[i].id != productId);
        } return (
                productBoard.push(productInfo),
                localStorage.setItem("productInCart", JSON.stringify(productBoard)),
                (productBoard = JSON.parse(localStorage.getItem("productBoard")))
        );
    }
});
return (productBoard = JSON.parse(localStorage.getItem("productInCart")));   
}

function orderValidIf(colorProduct, quantityProduct) {
    if (colorProduct == null || colorProduct === "" || quantityProduct == null || quantityProduct == "") {
        alert("Veuillez choisir une couleur et/ou une quantité")
        return true
    }
}

addToCartProduct(); 



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
    if (imgParent != null) imgParent.appendChild(imgProduct)  // Marche aussi si il est undefined  
        
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
    if (selectColor != null ){
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            selectColor.appendChild(option)
        } )
    }
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


/* const product = window.location.search // créationd d'une constante qui va isoler l'ID du product present sur l'URL" 
        .split("?") 
        .join ("");

let productData = []; // création d'une variable productData qui va récuperer l'ensemble des données des différents canapés sous forme de tableau // 

const fetchProduct = async () => {  
    await fetch(`http://localhost:3000/api/products/${product}`) // Requete GET vers l'API afin qu'elle nous retourne seulement les informations de l'ID de l'URL // 
        .then (res => res.json ())  
        .then ((data) => {
            productData = data; 
            console.log(productData)
            })
        .catch (err => console.log("Oh no...", err ))
};

const productDisplay = async () => {  // Nouvelle constante asynchrone qui va nous permettre d'afficher toutes les données du produit dont l'Id est affiché sur l'URL // 
    await fetchProduct(); 
document 
    .querySelector ('.item__img')
    .innerHTML = `<img src="${productData.imageUrl}" alt="Photographie d'un canapé">`;

document
    .getElementById ('title')
    .innerHTML = `${productData.name}`; 

document
    .getElementById ('price')
    .innerHTML = `${productData.price}`; 

document 
    .getElementById ('description')
    .innerHTML = `${productData.description}`

document 
    .getElementById ('colors')
    .innerHTML = ` <option value="${productData.colors[0]}">${productData.colors[0]}</option>
    <option value="${productData.colors[1]}">${productData.colors[1]}</option>
    <option value="${productData.colors[2]}">${productData.colors[2]}</option>`

addProductToCart(productData); 
};


productDisplay(); // On appelle la constante afin qu'elle s'affiche // 

const addProductToCart = () => {
    let bouton = document
            .getElementById ("addToCart"); 
            console.log(bouton)
        bouton
            .addEventListener("click", () => {
                let productBoard = JSON.parse(localStorage.getItem("productInCart"));
                let colorSelect = document 
                    .getElementById ('colors')
                    console.log(colorSelect.value);
                    console.log(productBoard);

                    const allCartProduct = Object.assign({}, productData,  {
                        color: `${colorSelect.value}`, 
                        price: parseFloat(productData.price),
                        quantity : parseFloat (document.getElementById("quantity").value),
                       
    
                    });
                console.table(allCartProduct)
                
            
                if (productBoard == null ) {
                    productBoard = []; 
                    productBoard.push(allCartProduct); 
                    localStorage.setItem('productInCart', JSON.stringify(productBoard));
                } 
                else if (productBoard != null) {
                    for (i = 0; i < productBoard.length; i++) {
                        console.log("test"); 

                        if (productBoard[i]._id == productData._id && 
                            productBoard[i].color == colorSelect.value 
                            ){
                                let quantityValue = parseInt(productBoard[i].quantity) + parseInt(quantity.value)
                                console.log(quantityValue)                     
                            return(            
                                productBoard[i].quantity = quantityValue, 
                                console.log("quan"),
                                localStorage.setItem("productInCart",JSON.stringify(productBoard)), 
                                console.table(productBoard),
                                (productBoard = JSON.parse(localStorage.getItem("productBoard")))
                    )}                    
                    }

                    for (i = 0; i < productBoard.length; i++) {
                        if ((productBoard[i]._id == productData._id && productBoard[i].color != colorSelect.value) || productBoard[i]._id != productData._id 
                        );} 
                        return (
                            productBoard.push(allCartProduct),
                            localStorage.setItem("productInCart", JSON.stringify(productBoard)),
                            (productBoard = JSON.parse(localStorage.getItem("productBoard")))
                    );
                }
            });
            return (productBoard = JSON.parse(localStorage.getItem("productInCart")));
};
*/

let productInCart = JSON.parse(localStorage.getItem("productInCart"))
const cartList = document.getElementById("cart__items")

function productOrder () {
  if (productInCart === null) {
    let header = document.querySelector('h1')
    let cartPriceP = document.querySelector ('.cart__price p')
    let cartOrder = document.querySelector ('.cart__order')

    header.textContent = 'Votre panier est vide'; 
    cartPriceP.textContent = "Consultez nos articles sur la page d'acceuil"
    cartPriceP.style.textAlign = 'center'; 
    cartOrder.style.display = 'none'

    
  }else {

    productInCart.forEach((product) => {

      fetch (`http://localhost:3000/api/products/${product.id}`)
            .then (res => res.json())
            .then (data => allData(data))
            .catch (err => console.log("An error has occurred", err))

      let productCartId = product.id 
      let productCartColor = product.color 
      let productCartQuantity = product.quantity; 
      let productArticle = document.createElement("article")
      let imgContainer = document.createElement ('div')
      let infoContainer = document.createElement ('div')
      let descriptionContainer = document.createElement ('div')
      let productName = document.createElement ('h2')
      let productColor = document.createElement ('p')
      let productCart = document.createElement('p')
      let settingsContainer = document.createElement ('div')
      let quantityContainer = document.createElement ('div')
      let productQuantity = document.createElement ('p')
      let productInput = document.createElement ('input')
      let deleteContainer = document.createElement ('div')
      let productDelete = document.createElement ('p')
        
      function allData(data) {
        createArticle()
        createImgContainer()
        productInCartImg()
        createInfoContainer()
        createDescriptionContainer ()
        productCartName ()
        productInCartColor ()
        productInCartPrice ()
        createSettingsContainer ()
        createQuantityContainer ()
        productSettingsQuantity ()
        productSettingsInput ()
        createDeleteContainer ()
        productSettingsDelete ()
        changeQuantityProduct ()
        changeCartPrice ()
          
        function createArticle (){
          productArticle.classList.add("cart__item")
          productArticle.dataset.id = productCartId
          productArticle.dataset.color = productCartColor
          cartList.appendChild(productArticle)
        }

        function createImgContainer () {
          imgContainer.classList.add('cart__item__img')
          productArticle.appendChild(imgContainer)
        }

        function productInCartImg () {
          let productImg = document.createElement('img')
          productImg.src = data.imageUrl
          productImg.alt = data.altTxt
          imgContainer.appendChild(productImg)
          return productImg
        }

        function createInfoContainer () {
          infoContainer.classList.add('cart__item__content')
          productArticle.appendChild(infoContainer)
        }

        function createDescriptionContainer () {
          descriptionContainer.classList.add('cart__item__content__description')
          infoContainer.appendChild(descriptionContainer)
        }

        function productCartName () {
          productName.textContent = data.name
          descriptionContainer.appendChild(productName)
        }

        function productInCartColor () {
          productColor.textContent = productCartColor
          descriptionContainer.appendChild(productColor)
        }
    
        function productInCartPrice () {
          productCart.textContent = data.price + ' €'
          descriptionContainer.appendChild(productCart)
        }

        function createSettingsContainer () {
          settingsContainer.classList.add ('cart__item__content__settings')
          infoContainer.appendChild(settingsContainer)
        }
      
        function createQuantityContainer () {
          quantityContainer.classList.add('cart__item__content__settings__quantity')
          settingsContainer.appendChild(quantityContainer)
        }
        
        function productSettingsQuantity () {
          productQuantity.textContent = ('Qté : ')
          quantityContainer.appendChild(productQuantity)
        }

        function changeQuantityProduct () {
          const changeQuantity = document.getElementById ('totalQuantity')
          const total = productInCart.reduce((total, products ) =>  total + Number(products.quantity), 0 )
          changeQuantity.textContent = total 
        }

        function changeCartPrice () {
          const changePrice = document.getElementById ('totalPrice')
          const total = productInCart.reduce((total, products) => total + Number(products.quantity) * data.price, 0)    
          changePrice.textContent = total    
        }

        function productSettingsInput () {
          productInput.classList.add('itemQuantity')
          productInput.type = 'number'
          productInput.name = 'itemQuantity'
          productInput.min = '1'
          productInput.max = '100'
          productInput.value = productCartQuantity
          quantityContainer.appendChild(productInput)
          productInput.addEventListener("change", () => updatePrice(productInput.value))
        }

        function updatePrice (newProductValue) {
          const productUpdate = productInCart
          productUpdate.quantity = Number(newProductValue)
          product.quantity = productUpdate.quantity     
          changeQuantityProduct ()
          changeCartPrice () 
          localStorage.setItem('productInCart', JSON.stringify(productInCart))
        }

        function createDeleteContainer () {   
          deleteContainer.classList.add('cart__item__content__settings__delete')
          settingsContainer.appendChild(deleteContainer)
        }

        function productSettingsDelete () {
          productDelete.classList.add('deleteItem')
          productDelete.textContent = 'Supprimer'
          deleteContainer.appendChild(productDelete)
          productDelete.addEventListener("click", () => deleteProductInCart())       
        }

        function deleteProductInCart () {
          const productToDelete = productInCart.findIndex((product) => product.id === data._id && product.color === data.color)
          productInCart.splice(productToDelete, 1)
          console.log(productInCart)
          changeQuantityProduct ()
          changeCartPrice () 
          deleteArticle ()
          deleteProductInStorage ()
        }
      
        function deleteArticle() {
          const articleToDelete = document.querySelector (`article[data-id="${product.id}"][data-color="${product.color}"]`)
          console.log(articleToDelete)
          articleToDelete.remove()
        }

        function deleteProductInStorage () {
          let newStorage = productInCart
          alert ('Le produit a bien été supprimé')
          localStorage.setItem('productInCart', JSON.stringify(newStorage))
          if (productInCart.length === 0) {
            localStorage.removeItem('productInCart')
            let header = document.querySelector('h1')
            let cartPriceP = document.querySelector ('.cart__price p')
            let cartOrder = document.querySelector ('.cart__order')

            header.textContent = 'Votre panier est vide'; 
            cartPriceP.textContent = "Consultez nos articles sur la page d'acceuil"
            cartPriceP.style.textAlign = 'center'; 
            cartOrder.style.display = 'none'   
          } 
        }
      }
    })
  }
}
productOrder();

// Formulaire a remplir 

const submit = document.getElementById ('order')
submit.addEventListener('click', (stopRefresh) => submitForm(stopRefresh))

function submitForm (stopRefresh) {
  stopRefresh.preventDefault()
  
  if (productInCart.length === 0 ) {
    const form = document.querySelector(".cart__order__form")
    form.remove()
    alert('Veuillez choisir un produit ')
    return 
  } 

  if (isFormInvalid ()) return 
  if (isNameInvalid()) return 
  if (isLocationInvalid()) return 
  if (isEmailInvalid()) return 

  const formCart = makeRequest()
  fetch ("http://localhost:3000/api/products/order", {
    method : "POST", 
    body: JSON.stringify(formCart), 
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then (res => res.json())
  .then((data) => {
    const orderId = data.orderId
    window.location.href = "./confirmation.html" + "?orderId=" + orderId
  })
  .catch (err => console.log("An error has occurred", err))
}

function formInformation () {

  const form = document.querySelector ('.cart__order__form')
  form.firstName.setAttribute("pattern", "[a-z A-Z-']{2,50}")
  form.firstName.setAttribute("placeholder", "Exemple : Naïm");
  form.lastName.setAttribute("pattern", "[a-z A-Z-']{2,50}")
  form.lastName.setAttribute("placeholder", "Exemple : Zidouni")
  form.address.setAttribute("pattern", "[a-zA-Z 0-9'-]{2,50}")
  form.address.setAttribute("placeholder", "Exemple : 7 rue des bois");
  form.city.setAttribute("pattern", "[0-9]{5}[a-zA-Zéèôöîïûùü' -]{2,50}")
  form.city.setAttribute("placeholder", "Exemple : Paris");
  form.email.setAttribute("placeholder", "Exemple : kanap@gmail.com ");
}

function isFormInvalid() {
  const form = document.querySelector(".cart__order__form")
  const inputs = form.querySelectorAll("input")
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("Veuillez remplir tous les champs à votre disposition")
      return true
    }
    return false
  })
}

function isNameInvalid() {
  const lastName = document.getElementById("lastName").value
  const firstName = document.getElementById("firstName").value
  const name = firstName + lastName
  const regex = /^[a-zéèôöîïûùü' -]{2,50}$/gi;
  if (regex.test(name) === false) {
    alert("Veuillez entrer un Nom/Prénom valide ")
    const lastNameError = document.getElementById ('lastNameErrorMsg')
    const firstNameError = document.getElementById ('firstNameErrorMsg')
    lastNameError.textContent = 'Les caractères utilisés ne sont pas valide'
    firstNameError.textContent = 'Les caractères utilisés ne sont pas valide'
    return true
  }
  return false
}

function isLocationInvalid () {
  const address = document.getElementById("address").value
  const city = document.getElementById("city").value
  const regex = /^[a-z0-9éèôöîïûùü' -]{2,50}$/gi
  const addressAndCity = address + city 
  if (regex.test(addressAndCity || city || address ) === false) {
    alert("Veuillez entrer une adresse/ville valide ")
    const adressError = document.getElementById ('addressErrorMsg')
    const cityError = document.getElementById ('cityErrorMsg')
    adressError.textContent = 'Les caractères utilisés ne sont pas valide'
    cityError.textContent = 'Les caractères utilisés ne sont pas valide '
    return true
  }
  return false
}

function isEmailInvalid() {
  const email = document.getElementById("email").value
  const regex = /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/gi
  if (regex.test(email) === false) {
    alert("Veuillez entrer une adresse mail valide ")
    const emailError = document.getElementById ('emailErrorMsg')
    emailError.textContent = 'Les caractères saisis ne sont pas valide'
    return true
  }
  return false
}

function makeRequest (){
const form = document.querySelector ('.cart__order__form')
const formCart = { 
  contact: {
  firstName: form.firstName.value,
  lastName: form.lastName.value,
  address: form.address.value,
  city: form.city.value,
  email: form.email.value,
  }, 
  products: pushIdForPost ()
  }
  return formCart
}

function pushIdForPost () {
  let products = []
  for (let product of productInCart) {
    products.push(product.id)
  }
  return products 
}

formInformation () 
  



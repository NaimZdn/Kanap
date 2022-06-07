// Création de la variable nous permettant de récupérer le localStorage 
let productInCart = JSON.parse(localStorage.getItem("productInCart"))
const cartList = document.getElementById("cart__items")

function productOrder() {

  // Si le localStorage est vide alors on prévient l'utilisateur + on efface le formulaire 
  if (productInCart === null) {
    let header = document.querySelector('h1')
    let cartPriceP = document.querySelector('.cart__price p')
    let cartOrder = document.querySelector('.cart__order')
      header.textContent = 'Votre panier est vide';
      cartPriceP.textContent = "Consultez nos articles sur la page d'accueil"
      cartPriceP.style.textAlign = 'center';
      cartOrder.style.display = 'none'
    
  // Sinon on peut traiter l'ensemble de nos donner afin de créer les éléments du DOM 
  } else {
    productInCart.forEach((product) => {

      // On récupére les autres informations sur chaque produits qui étaient dans le localStorage afin d'implémenter les éléments du DOM 
      fetch(`http://localhost:3000/api/products/${product.id}`)
        .then(res => res.json())
        .then(data => allData(data))
        .catch(err => console.log("An error has occurred", err))

      let productCartId = product.id
      let productCartColor = product.color
      let productCartQuantity = product.quantity;
      let productArticle = document.createElement("article")
      let imgContainer = document.createElement('div')
      let infoContainer = document.createElement('div')
      let descriptionContainer = document.createElement('div')
      let productName = document.createElement('h2')
      let productColor = document.createElement('p')
      let productCart = document.createElement('p')
      let settingsContainer = document.createElement('div')
      let quantityContainer = document.createElement('div')
      let productQuantity = document.createElement('p')
      let productInput = document.createElement('input')
      let deleteContainer = document.createElement('div')
      let productDelete = document.createElement('p')

      // Création d'une fonction avec le paramètre data (= informations des produits récupérés via l'API) + création de tous les éléments du DOM 
      function allData(data) {
        createArticle()
        createImgContainer()
        productInCartImg()
        createInfoContainer()
        createDescriptionContainer()
        productCartName()
        productInCartColor()
        productInCartPrice()
        createSettingsContainer()
        createQuantityContainer()
        productSettingsQuantity()
        productSettingsInput()
        createDeleteContainer()
        productSettingsDelete()
        changeQuantityProduct()
        changeCartPrice()

        function createArticle() {
          productArticle.classList.add("cart__item")
          productArticle.dataset.id = productCartId
          productArticle.dataset.color = productCartColor
          cartList.appendChild(productArticle)
        }

        function createImgContainer() {
          imgContainer.classList.add('cart__item__img')
          productArticle.appendChild(imgContainer)
        }

        function productInCartImg() {
          let productImg = document.createElement('img')
          productImg.src = data.imageUrl
          productImg.alt = data.altTxt
          imgContainer.appendChild(productImg)
          return productImg
        }

        function createInfoContainer() {
          infoContainer.classList.add('cart__item__content')
          productArticle.appendChild(infoContainer)
        }

        function createDescriptionContainer() {
          descriptionContainer.classList.add('cart__item__content__description')
          infoContainer.appendChild(descriptionContainer)
        }

        function productCartName() {
          productName.textContent = data.name
          descriptionContainer.appendChild(productName)
        }

        function productInCartColor() {
          productColor.textContent = productCartColor
          descriptionContainer.appendChild(productColor)
        }

        function productInCartPrice() {
          productCart.textContent = data.price + ' €'
          descriptionContainer.appendChild(productCart)
        }

        function createSettingsContainer() {
          settingsContainer.classList.add('cart__item__content__settings')
          infoContainer.appendChild(settingsContainer)
        }

        function createQuantityContainer() {
          quantityContainer.classList.add('cart__item__content__settings__quantity')
          settingsContainer.appendChild(quantityContainer)
        }

        function productSettingsQuantity() {
          productQuantity.textContent = ('Qté : ')
          quantityContainer.appendChild(productQuantity)
        }

        // Fonction qui change la quantité total des articles dans le panier
        function changeQuantityProduct() {
          const changeQuantity = document.getElementById('totalQuantity')
          const total = productInCart.reduce((total, products) => total + Number(products.quantity), 0)
          changeQuantity.textContent = total
        }

        // Fonction qui change le prix total des articles dans le panier
        function changeCartPrice() {
          const changePrice = document.getElementById('totalPrice')
          const total = productInCart.reduce((total, products) => total + Number(products.quantity) * data.price, 0)
          changePrice.textContent = total
        }

        // Fonction qui permet d'écouter le changement de quantité d'un produit par l'utilisateur
        function productSettingsInput() {
          productInput.classList.add('itemQuantity')
          productInput.type = 'number'
          productInput.name = 'itemQuantity'
          productInput.min = '1'
          productInput.max = '100'
          productInput.value = productCartQuantity
          quantityContainer.appendChild(productInput)
          productInput.addEventListener("change", () => updatePrice(productInput.value))
        }

        // Mets à jour le prix en fonction du comportement que l'utilisateur peut avoir avec le bouton input + ajoute cette nouvelle quantité au localStorage
        function updatePrice(newProductValue) {
          const productUpdate = productInCart
          productUpdate.quantity = Number(newProductValue)
          product.quantity = productUpdate.quantity
          changeQuantityProduct()
          changeCartPrice()
          localStorage.setItem('productInCart', JSON.stringify(productInCart))
        }

        function createDeleteContainer() {
          deleteContainer.classList.add('cart__item__content__settings__delete')
          settingsContainer.appendChild(deleteContainer)
        }

        // Fonction qui permet d'écouter le click sur le bouton supprimer 
        function productSettingsDelete() {
          productDelete.classList.add('deleteItem')
          productDelete.textContent = 'Supprimer'
          deleteContainer.appendChild(productDelete)
          productDelete.addEventListener("click", () => deleteProductInCart())
        }

        // Fonction qui permet de supprimer du localStorage le produit sur lequel l'utilisateur a cliqué 
        function deleteProductInCart() {
          const productToDelete = productInCart.findIndex((product) => product.id === data._id && product.color === data.color)
          productInCart.splice(productToDelete, 1)      
          changeQuantityProduct()
          changeCartPrice()
          deleteArticle()
          deleteProductInStorage()
        }

        // Supprime le produit de la page
        function deleteArticle() {
          const articleToDelete = document.querySelector(`article[data-id="${product.id}"][data-color="${product.color}"]`)
          articleToDelete.remove()
        }

        // Suurpime le produit du localStorage et ajoute une alerte pour l'utilisateur + si le panier est vide masque le formulaire et avertit l'utilisateur 
        function deleteProductInStorage() {
          let newStorage = productInCart
          alert('Le produit a bien été supprimé')
          localStorage.setItem('productInCart', JSON.stringify(newStorage))
          if (productInCart.length === 0) {
            localStorage.removeItem('productInCart')
            let header = document.querySelector('h1')
            let cartPriceP = document.querySelector('.cart__price p')
            let cartOrder = document.querySelector('.cart__order')
              header.textContent = 'Votre panier est vide';
              cartPriceP.textContent = "Consultez nos articles sur la page d'accueil"
              cartPriceP.style.textAlign = 'center';
              cartOrder.style.display = 'none'
          }
        }
      }
    })
  }
}
productOrder();

// Gestion du formulaire et de la requête POST 

const submit = document.getElementById('order')

// On écoute le click du bouton envoyer et on lui attribue une callback
submit.addEventListener('click', (stopRefresh) => submitForm(stopRefresh))

function submitForm(stopRefresh) {
  stopRefresh.preventDefault()

  formValid()
  isFormInvalid()
  isFirstNameInvalid()
  isLastNameInvalid()
  isAdressInvalid()
  isCityInvalid()
  isAdressInvalid()
  isEmailInvalid()
  
  function formValid() {

    // Si les formulaires sont invalides alors on envoie pas le formulaire à l'API
    if (isFormInvalid() || isFirstNameInvalid() || isLastNameInvalid() || isAdressInvalid() || isCityInvalid() || isAdressInvalid() || isEmailInvalid() === true) return
    const formCart = makeRequest()
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(formCart),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then((data) => {
        const orderId = data.orderId
        window.location.href = "./confirmation.html" + "?orderId=" + orderId
      })
      .catch(err => console.log("An error has occurred", err))
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

  function isFirstNameInvalid() {
    const firstName = document.getElementById("firstName").value
    const firstNameError = document.getElementById('firstNameErrorMsg')
    const regex = /^[a-zéèôöîïûùü' -]{2,50}$/gi;
    if (regex.test(firstName) === true) {
      firstNameError.textContent = 'Le champ est valide'
      firstNameError.style.color = 'lightgreen'
      return false
    } else if (regex.test(firstName) === false) {
      firstNameError.textContent = 'Les caractères saisis ne sont pas valides'
      firstNameError.style.removeProperty('color')
      firstNameError.style.color = 'lightred'
      return true
    }
    return false
  }

  function isLastNameInvalid() {
    const lastName = document.getElementById("lastName").value
    const lastNameError = document.getElementById('lastNameErrorMsg')
    const regex = /^[a-zéèôöîïûùü' -]{2,50}$/gi;
    if (regex.test(lastName) === true) {
      lastNameError.textContent = 'Le champ est valide'
      lastNameError.style.color = 'lightgreen'
      return false
    } else if (regex.test(lastName) === false) {
      lastNameError.textContent = 'Les caractères saisis ne sont pas valides'
      lastNameError.style.removeProperty('color')
      lastNameError.style.color = 'lightred'
      return true
    }
    return false
  }

  function isAdressInvalid() {
    const address = document.getElementById("address").value
    const addressError = document.getElementById('addressErrorMsg')
    const regex = /^[a-z0-9éèôöîïûùü' -]{2,50}$/gi
    if (regex.test(address) === true) {
      addressError.textContent = 'Le champ est valide'
      addressError.style.color = 'lightgreen'
      return false
    } else if (regex.test(address) === false) { 
      addressError.textContent = 'Les caractères saisis ne sont pas valides'
      addressError.style.removeProperty('color')
      addressError.style.color = 'lightred'
      return true
    }
    return false
  }

  function isCityInvalid() {
    const city = document.getElementById("city").value
    const cityError = document.getElementById('cityErrorMsg')
    const regex = /^[a-z0-9éèôöîïûùü' -]{2,50}$/gi
    if (regex.test(city) === true) {
      cityError.textContent = 'Le champ est valide'
      cityError.style.color = 'lightgreen'
      return false
    } else if (regex.test(city) === false) {
      cityError.textContent = 'Les caractères saisis ne sont pas valides'
      cityError.style.removeProperty('color')
      cityError.style.color = 'lightred'
      return true
    }
    return false
  }

  function isEmailInvalid() {
    const email = document.getElementById("email").value
    const regex = /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/gi
    const emailError = document.getElementById('emailErrorMsg')
    if (regex.test(email) === true) {
      emailError.textContent = 'Le champ est valide'
      emailError.style.color = 'lightgreen'
      return false
    } else if (regex.test(email) === false) {
      emailError.textContent = 'Les caractères saisis ne sont pas valides'
      emailError.style.removeProperty('color')
      emailError.style.color = 'lightred'
      return true
    }
    return false
  }
}
function formInformation() {
  const form = document.querySelector('.cart__order__form')
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

// Création des données que l'on souhaite envoyer à l'API 
function makeRequest() {
  const form = document.querySelector('.cart__order__form')
  const formCart = {
    contact: {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.address.value,
      city: form.city.value,
      email: form.email.value,
    },
    products: pushIdForPost()
  }
  return formCart
}

// On récupére les ID des différents produits du localStorage afin de les envoyer à l'API 
function pushIdForPost() {
  let products = []
  for (let product of productInCart) {
    products.push(product.id)
  }
  return products
}

formInformation() 
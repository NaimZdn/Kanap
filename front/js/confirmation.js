const orderId = getOrder()
displayOrder(orderId)
removeCart()

// On récupère l'order ID sur l'URL 
function getOrder() {
    const windowUrl = window.location.search
    const orderUrl = new URLSearchParams(windowUrl)
    return orderUrl.get("orderId")
}

// On affiche l'orderID récupéré 
function displayOrder(orderId) {
    const getOrderId = document.getElementById('orderId')
    getOrderId.textContent = orderId
}

// On vide le localStorage
function removeCart () {
    const cart = window.localStorage
    cart.clear()

}


const orderId = getOrder ()
displayOrder (orderId)
removeCart ()

function getOrder () {
    const windowUrl = window.location.search
    const orderUrl = new URLSearchParams(windowUrl)
    return orderUrl.get("orderId")
}

function displayOrder (orderId) {
    const getOrderId = document.getElementById('orderId')
    getOrderId.textContent = orderId
}

/*function removeCart () {
    const cart = window.localStorage
    cart.clear()

}*/


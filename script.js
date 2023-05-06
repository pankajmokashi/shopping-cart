function searchItems(result, cartItems){
    let searchedData = []
    const input = document.getElementById("search-input")
    result.forEach((ele) => {
        let str = ele.name.toLowerCase()
        let substr = input.value.toLowerCase()
        if(str.includes(substr)){
            searchedData.push(ele)
        }
    })

    displayData(searchedData, cartItems)
}

function displayAddedItems(cartItems){
    console.log(cartItems)
}

function addToCart(event, result, cartItems){
    let selectedId = parseInt(event.target.parentElement.id)
    result.forEach((ele) => {
        if(selectedId == ele.id){
            ele.quantity = ele.quantity - 1
            cartItems.push(ele)
            if(parseInt(ele.quantity) == 0){
                event.target.innerText = "Out of stock"
                event.target.style.backgroundColor = "red"
                event.target.style.color = "white"
                event.target.disabled = true
            }
        }
    })
    const count = document.getElementById("count")
    count.innerText = eval (count.innerText + "+" + "1")
    alert("Item is added to cart")
}

function displayFilter(){
    const filter = document.getElementById("display-filter")
    if(filter.style.display === "none"){
        filter.style.display = "flex"
    }
    else{
        filter.style.display = "none"
    }
}

function hidefilter(){
    const filter = document.getElementById("display-filter")
    filter.style.display = "none"
}

async function displayData(result, cartItems){

    const container = document.getElementById("card-container")

    container.innerHTML = ""
    result.forEach((ele) => {
        const card = document.createElement("div")
        card.id = ele.id
        card.className = "card " + ele.type + " " + ele.color + " " + ele.gender

        const name = document.createElement("div")
        name.innerText = ele.name
        name.id = "prod-name" 
        card.appendChild(name)

        const img = document.createElement("div")
        img.style.backgroundImage = "url('" + `${ele.imageURL}` + "')"
        img.id = "img" 
        card.appendChild(img)

        const price = document.createElement("div")
        price.innerText = "Price : " + ele.price + " " + ele.currency
        price.id = "price" 
        card.appendChild(price)

        const cart = document.createElement("button")
        cart.id = "cart"
        if(ele.quantity > 0){
            cart.innerText = "Add to cart"
        }
        else{
            cart.innerText = "Out of stock"
            cart.style.backgroundColor = "red"
            cart.disabled = true
        }
        card.appendChild(cart)
        cart.addEventListener("click", () => {
            addToCart(event, result, cartItems)
        })

        container.appendChild(card)
    })
}

async function getData(){

    const url = "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    let response = await fetch(url)
    let data = await response.json()
    return data
}


async function loadData(){
    var cartItems = []
    var result = await getData()

    await displayData(result, cartItems)

    const filter = document.getElementById("filter-icon")
    filter.addEventListener("click", displayFilter)

    const container = document.getElementById("card-container")
    container.addEventListener("click", hidefilter)

    // const cart = document.querySelectorAll("button")
    // for(let i = 0; i < cart.length; i++){
    //     cart[i].addEventListener("click", () => {
    //         addToCart(event, result, cartItems)
    //     })
    // }
    
    const addedItems = document.getElementById("added-items")
    addedItems.addEventListener("click", () => {
        displayAddedItems(cartItems)
    })

    const search = document.getElementById("search")
    search.addEventListener("click", () => {
        searchItems(result, cartItems)
    })
}
loadData()
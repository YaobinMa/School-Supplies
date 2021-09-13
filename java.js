const burgerMenuWrapper = document.querySelector(".menu-list");
const burgerMenu = document.querySelector(".burger-menu");
const menuLink = document.querySelectorAll(".menu-link")
const cartIcon = document.querySelector(".fa-shopping-cart")
const cartWrapper = document.querySelector(".cart-wrapper")
const cross = document.querySelector(".cross")
const buttons = document.querySelectorAll(".cartBtn")


const cartContainer = document.querySelector(".cart-container")

const productList = []


// burger animation 
burgerMenu.addEventListener("click", () => {
    burgerMenuWrapper.classList.toggle("nav-open");
    burgerMenu.classList.toggle("change");
});

menuLink.forEach((menulinkk) => {
    menulinkk.addEventListener("click", () =>{
        burgerMenuWrapper.classList.toggle("nav-open");
        burgerMenu.classList.toggle("change");
    });
});


// open and close cart
cartIcon.addEventListener("click", toggleCartWrapper)
cross.addEventListener("click", unToggleCartWrapper)

cartWrapper.addEventListener("click", closeAtOutside)


// escape key
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {   
        unToggleCartWrapper();       
    }
};


// adding to cart
buttons.forEach((button) => {
    button.addEventListener("click", addToCart);
});


// toggle wrapper
function toggleCartWrapper(){
    cartWrapper.classList.add("cart-wrapper-open");
}

function unToggleCartWrapper(){
    cartWrapper.classList.remove("cart-wrapper-open");
}

// to close cart when click outside of cart
function closeAtOutside(event){
    const outside = !event.target.closest(".cart-background");
    if (outside){
        unToggleCartWrapper();
    }
}


// convert html code to js
function addProductToCart(product){
    const htmlString = `
    <div class="cartProductContainer" data-productname="${product.name}">
        <img src="${product.img}" class="cartProductImg">
        <div class="CPT">
            <h3 class="cartProductText">${product.name}</h3>
            <h4 class="cartProductPrice">$${product.price}</h4>
        </div>
        <div class="buttons">
            <button class="fas fa-minus minus"></button>
            <input id="numberInput" class="numInput" value="${product.quantity}"></input>
            <button class="fas fa-plus plus"></button><br>            
            <button class="delete far fa-trash-alt"></button>
            
        </div>
        
    </div>
    `;

    const htmlFragment = document.createRange().createContextualFragment(htmlString);

    const minusProduct = htmlFragment.querySelector(".minus")

    const plusProduct = htmlFragment.querySelector(".plus")
    
    const numberOfProduct = htmlFragment.querySelector(".numInput")

    const deleteProduct = htmlFragment.querySelector(".delete")
    
    minusProduct.addEventListener("click", minusP)

    plusProduct.addEventListener("click", plusP)

    numberOfProduct.addEventListener("input", changeP)

    deleteProduct.addEventListener("click", deleteP)


    return htmlFragment;
}


// addtocart
function addToCart(event){
    if(!productList.includes(event.currentTarget)){
        productList.push(event.currentTarget);
    
        const productDetails = event.currentTarget.dataset;
        const htmlFragment = addProductToCart(productDetails);
        cartContainer.appendChild(htmlFragment);

        changePrice(event)
    }
    
}

// change price

function changePrice(){
    let total = 0
    productList.forEach((product) => {
        total += product.dataset.price * product.dataset.quantity;
    })

    document.getElementById('cart-price-total').innerHTML = "$" + total.toFixed(2);

    
}

function minusP(event){
    const productIndex = getIndex(event)

    let amount = productList[productIndex].dataset.quantity
    
    if (amount > 0){
        amount --

        productList[productIndex].dataset.quantity = amount;

        event.currentTarget.nextSibling.nextSibling.value = amount;
        
        changePrice()
    }  
      
}




function plusP(event){
    const productIndex = getIndex(event)

    let amount = productList[productIndex].dataset.quantity
    
    if (amount >= 0){
        amount ++

        productList[productIndex].dataset.quantity = amount
        
        event.currentTarget.previousSibling.previousSibling.value = amount

        changePrice()
    }
}

function changeP(event){
    let inputNum = event.currentTarget.value
    
    const productIndex = getIndex(event)
    
    if (inputNum >= 0) {
        productList[productIndex].dataset.quantity = inputNum
    }
    console.log(event.currentTarget)
    changePrice()
}

function deleteP(event){
    productIndex = getIndex(event);

    productList[productIndex].dataset.quantity = 1;

    productList.splice(productIndex,1);

    const product = event.currentTarget.parentElement.parentElement;

    product.remove();

    changePrice();

    event.stopPropagation();
}


function getIndex(event){
    const productInfo = event.currentTarget.parentElement.parentElement.dataset.productname

    const cartIndex = productList.findIndex((item) => {
        return item.dataset.name === productInfo;
        
    })
    
    return cartIndex;
    
}





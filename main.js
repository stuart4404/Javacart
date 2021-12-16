console.log ("running");


let carts = document.querySelectorAll ('.add-cart');

let products = [
    {
        name:"ninja sword",
        tag: "ninjasword",
        price: 1000,
        inCart: 0
    },
    {
        name:"shuriken",
        tag: "shuriken",
        price: 2000,
        inCart: 0
    },
    {
        name:"smoke bomb",
        tag: "smokebomb",
        price: 1000,
        inCart: 0
    },
    {
        name:"ninja magic",
        tag: "ninjamagic",
        price: 8000,
        inCart: 0
    }
]

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers( ){
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart Span').textContent = productNumbers;
    }

}
    

function cartNumbers(product){
  
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);

    if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart Span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart Span').textContent = 1; 
    }
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    
    if(cartItems != null){

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart += 1;
      
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]:product
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}


function totalCost(product){

    let cartCost = localStorage.getItem('totalCost');
 
    
    if (cartCost !=null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost + product.price);
    } else {
    localStorage.setItem("totalCost",product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector
    (".product-container");
    let cartCost = localStorage.getItem('totalCost');


    if (cartItems && productContainer){
    productContainer.innerHTML ='';
    Object.values(cartItems).map(item =>{
        productContainer.innerHTML += `
        <div class ="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img scr="./images/${item.tag}.jpg">
            <span>${item.name}</span>
        </div>
        <div class="price">${item.price}</div>
        <div class="quantity">
            <ion-icon class="decrease"
             name="chevron-down-outline"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon class="increase"
            name="chevron-up-outline"></ion-icon>
        </div>
        <div class= "total">
            £${item.inCart*item.price},00
        </div>
        `
    });

    productContainer.innerHTML += `
    
        <div class= "basketTotalContainer">
        <h4 class= "basketTotalTitle">
            BasketTotal
        </h4>
        <h4 class="basketTotal">
            £${cartCost},00
        </h4> 
        `

    }
}

onLoadCartNumbers();
displayCart();
   




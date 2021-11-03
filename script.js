"use strict";

/* 🍚
when same item already is there , just QTY adding

when increase QTY, increase price on list
*/

document.addEventListener('DOMContentLoaded',init);

/* 🍄
    🦄1102-4. e.target의 특정 자식노드찾기 : for loop + querySelector

    (내가 한 다른 방식 : if(classList.contains('~'))로 클릭한 위치 찾음) 
    
    10 for loop 로 클릭한 위치 찾아낸 후
    20 찾아낸 위치의 e.target으로  parent element 지정
    30 parent element안의 clas 찾아내서, innerText, src 찾아냄
*/

function init() {
    
    // 🍖1102-4
   for (let i = 0; i < shopItemBtnAll.length; i++) {
    shopItemBtnAll[i].addEventListener('click',addToCartClicked);
   }

   document.querySelector('.btn-purchase').addEventListener('click',purchaseClicked);
}


/* 🍀1102-4 addToCartClicked*/
function addToCartClicked(e){
    console.log(e)  

    // 🦄parentElement
    // 🦄querySelector
    // 🦄src
    let shopItem = e.target.parentElement.parentElement;
    console.log(shopItem);
    let title = shopItem.querySelector('.shop_item-title').innerText;
    let price = shopItem.querySelector('.shop_item-price').innerText;
    let imgSrc = shopItem.querySelector('.shop_item-img').src;
    console.log(title)
    console.log(price)
    console.log(imgSrc)

    addItemToCart(title,price,imgSrc);

    updateCartTotal()
}


//🍀1102-20 addItemToCart
function addItemToCart(title,price,imgSrc) { 

    // 🍉1103-1. when same item already is there , just QTY adding

    let cartItemTitleAll = document.querySelectorAll('.cart-item-title')
    let cartQuantityInputAll = document.querySelectorAll('.cart-quantity-input')

    for (let i = 0; i < cartItemTitleAll.length; i++) {
        if (cartItemTitleAll[i].textContent == title) {

            // parseFloat(cartQuantityInputAll[i].value) += 1;
            alert('This item is already added to the cart')
            return
        }        
    }

    // 🍉innerHTML + append
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')

    cartRow.innerHTML =`
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger myButton" type="button">REMOVE</button>
        </div>`

    document.querySelector(".cart-items").append(cartRow)



    // 🍖removeCartItem
    cartRow.querySelector('.btn-danger').addEventListener('click',removeCartItem)

    // 🍖quantityChanged
    cartRow.querySelector('.cart-quantity-input').addEventListener('click',quantityChanged)        
}


// 🍀1102-30. updateCartTotal  (add, remove 모두 적용됨)...........🦄
/* 🍄 🦄
    cart-row 안의  items * quantity
    cart-row [0], cart-row [1], cart-row [2]..... 실행
*/
function updateCartTotal() {
    let cartItemContainer = document.querySelector('.cart-items');
    let cartRows = cartItemContainer.querySelectorAll('.cart-row');

    let total = 0;

    for (let i = 0; i < cartRows.length; i++) {
       let price = cartRows[i].querySelector('.cart-price');

        // 🦄parseFloat , replace(~,~)
       let priceFix = parseFloat(price.innerText.replace('$',''));
       let quantity = cartRows[i].querySelector('.cart-quantity-input').value;
        
       total = total + (priceFix * quantity);
    }

    //🦄parseFloat(~).toFixed(~), 소수점 ~자리까지
    total = parseFloat(total).toFixed(2)

     document.querySelector('.cart-total-price').innerText = "$" + total;
}

// removeCartItem
function removeCartItem(e) {
    e.target.parentElement.parentElement.remove()

    updateCartTotal();
}

// quantityChanged
function quantityChanged(e) {
    
    // 🦄isNaN(~) : number인지 확인
    if (isNaN(e.target.value) || e.target.value <=0) {
        e.target.value = 1;
    }    
    updateCartTotal();
}

function purchaseClicked() {
    
    alert("Thank you");
    
    let cartItems = document.querySelector('.cart-items');
    
    // 🦄while
    // 🦄hasChildNode
    // 🦄removeChild
    // 🦄firstChild
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }

    updateCartTotal();
}
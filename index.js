import {menuArray} from '/data.js'

const foodSection = document.getElementById('food-section')
const orderForm = document.getElementById('order-form')
const userNameId = document.getElementById('username')
const cardNumberId = document.getElementById('card-number')
const ccvNumberId = document.getElementById('ccv-id')

const currency = 'R'

let totalPrice = 0
let burgerPrice = 0
let beerPrice = 0
let pizzaPrice = 0
 
let htmlOrder = ''
let orderMessage = ''
let isOrder = false

orderForm.addEventListener('submit',function(e){
    e.preventDefault()
    const submitForm = new FormData(orderForm)
    const username = submitForm.get('username')
    isOrder = true
    clearAll()
    
     orderMessage = ` <div class='final-message'>
                         <p class='thank-message'>Thanks, ${username}!<span> Your order is on its way!</span></p>
                       </div>`
                                  
    renderCheckOutHtml()    
      
})

document.addEventListener('click',function(e){
    if(e.target.dataset.add)
    {
        addItemsToOrder(e.target.dataset.add)   
        isOrder = false    
        renderCheckOutItems()
       
    }
    else if(e.target.dataset.remove)
    {
        removeItemOrder(e.target.dataset.remove)  
        renderCheckOutItems()        
    }
    else if(e.target.id === 'complete-id')
    {
        if(totalPrice > 0)
        {
            orderForm.style.display = 'flex'
        }   
    }
})

function clearAll(){

    userNameId.value = ''
    cardNumberId.value = ''
    ccvNumberId.value = ''
    orderForm.style.display = 'none'
    totalPrice = 0
    burgerPrice = 0
    beerPrice = 0
    pizzaPrice = 0
    
}

function addItemsToOrder(orderId){
    
   const addItem = menuArray.filter(function(order){
      return order.id == orderId
 
    })[0]
    
 if(orderId == 0)
 { 
  pizzaPrice += addItem.price  
 }else if(orderId == 1)
 {
  burgerPrice += addItem.price
 }else if(orderId == 2)
 {
  beerPrice += addItem.price  
 }
    totalPrice = pizzaPrice + burgerPrice + beerPrice
    renderCheckOutHtml()    
}

function removeItemOrder(orderId){
    
const removeItem = menuArray.filter(function(order){
   return order.id == orderId 
})[0]


if(orderId == 0)
 {
     if(pizzaPrice > 0 && totalPrice > 0)
     {
      pizzaPrice -= removeItem.price 
      totalPrice -= removeItem.price
     }
     
 }else if(orderId == 1 )
 {
     if(burgerPrice > 0 && totalPrice > 0)
     {
      burgerPrice -= removeItem.price   
      totalPrice -= removeItem.price
     }
     
 }else if(orderId == 2)
 {
     if(beerPrice > 0 && totalPrice > 0)
     {
      beerPrice -= removeItem.price  
      totalPrice -= removeItem.price          
     }  
 }
   renderCheckOutHtml()
}

function renderCheckOutItems(){

   htmlOrder = `<div class='order-item'>
                <p class="checkout-order-item">Pizza</p>
                <button data-remove='0'>remove</button>
                <p class="checkout-order-price">${currency}${pizzaPrice}</p>
                </div>
                
                <div class='order-item'>
                <p class="checkout-order-item">Burger</p>
                <button data-remove='1'>remove</button>
                <p class="checkout-order-price">${currency}${burgerPrice}</p>
                </div>
        
                <div class='order-item'>
                <p class="checkout-order-item">Beer</p>
                <button data-remove='2'>remove</button>
                <p class="checkout-order-price">${currency}${beerPrice}</p>
                </div>           
                `
        
  renderCheckOutHtml()
}

function renderHtml(){

    let htmlStr = ''    
    
    menuArray.forEach(function(item){
        
        let ingredinetArray = []
        
        item.ingredients.forEach(function(ingredients){
        
        ingredinetArray.push(ingredients)
            
        })
        
        htmlStr +=  
                `<div>
                    <div class='food-container'>
                        <p class="menu-icon">${item.emoji}</p>
                        <div class='menu-container'>
                            <p class='menu-item'>${item.name}</p>
                            <p class='ingredient'>${ingredinetArray}</p>
                            <p class='item-price'>${currency}${item.price}</p>
                        </div>
                    <button id='${item.id}-item-order' data-add='${item.id}' class="add-item-btn">+</button>
                   </div>
                </div> 
        
`       
    })
    
return htmlStr
}


function renderCheckOutHtml()
{
    
        let checkoutHtml = ''
        let htmlItemsSection = renderHtml()
                
    checkoutHtml += `${htmlItemsSection}
                 <div id='checkout-section' class='checkout-section'>
                    <p class='your-order-title'>Your order</p>
                    <div class='your-order'>
                        ${htmlOrder}
                    </div>
                    <div class="total-order">
                            <p class='total-price-title'>Total price:</p>
                            <p class='final-price'>${currency}${totalPrice}</p>
                     </div>
                    <button id='complete-id' class="complete-order">Complete order</button>
                    </div>
            
 `

foodSection.innerHTML = checkoutHtml

if(isOrder)
{
document.getElementById('checkout-section').innerHTML = orderMessage      
}
    
}
renderCheckOutHtml()

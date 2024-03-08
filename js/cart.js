// Check if the document is still loading
if (document.readyState === 'loading') {
    // If the document is still loading, wait for the DOMContentLoaded event before calling the ready function
    document.addEventListener('DOMContentLoaded', ready);
} else {
    // If the document has already loaded, call the ready function immediately
    ready();
}

// Function called when the DOM is ready
function ready() {
    // Select all 'Remove' buttons and add click event listeners
    const removeCartItemButtons = document.querySelectorAll('.delate');
    removeCartItemButtons.forEach(button => {
        button.addEventListener('click', removeCartItem);
    });

    // Select all quantity input elements and add change event listeners
    const quantityInputs = document.querySelectorAll('.cart-quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', quantityChanged);
    });

    // Select all 'Add to Cart' buttons and add click event listeners
    const addToCartButtons = document.querySelectorAll('.shop-item-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCartClicked);
    });

    // Add click event listener to the 'Purchase' button
    document.querySelectorAll('.btn-purchase').forEach(button => {
        button.addEventListener('click', purchaseClicked);
    });
}


// Function called when the 'Purchase' button is clicked
function purchaseClicked() {
    // Display an alert message
    alert('Thank you for your purchase');
    // Get the cart items container and remove all child nodes
    const cartItems = document.querySelector('.cart-items');
    while (cartItems.hasChildNodes()) {
        cartItems.firstChild.remove();
    }
    // Update the cart total after removing items
    updateCartTotal();
    updateCartIcon();

}

// Function called when a 'Remove' button is clicked
function removeCartItem(event) {
    // Get the clicked button and remove the corresponding cart item
    const buttonClicked = event.target;
    const cartItem = buttonClicked.closest('.cart-row');
    cartItem.remove();
    // Update the cart total after removing an item
    updateCartTotal();
    updateCartIcon();

    // Remove the item from local storage
    removeFromLocalStorage(cartItem);
}

// Function to remove an item from local storage
function removeFromLocalStorage(cartItem) {
    const title = cartItem.querySelector('.cart-item-title').textContent;

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Find and remove the item from the cartItems array
    cartItems = cartItems.filter(item => item.title !== title);

    // Update local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function called when the quantity of an item is changed
function quantityChanged(event) {
    // Get the input element, ensure the value is valid, and update the cart total
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

// Function called when an 'Add to Cart' button is clicked
function addToCartClicked(event) {
    // Get the clicked button and its parent shop item
    const button = event.target;
    const shopItem = button.closest('.shop-item');
    // Extract information (title, price, image source) from the shop item
    const title = shopItem.querySelector('.shop-item-title').textContent;
    const price = shopItem.querySelector('.shop-item-price').textContent;
    const imageSrc = shopItem.querySelector('.shop-item-image').src;
    // Add the item to the cart and update the cart total
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
    updateCartIcon();
}

function updateCartIcon() {
    const count = document.getElementById('count');
    const Count = document.getElementById('Count');
    const cartItems = document.querySelector('.cart-items');
    const itemCount = cartItems.children.length;

    // Update the cart icon content with the item count
    count.textContent = `${itemCount}`;
    Count.textContent = `${itemCount}`;
}

// Function to add an item to the cart
function addItemToCart(title, price, imageSrc) {
    // Get the cart items container and check if the item is already in the cart
    const cartItems = document.querySelector('.cart-items');
    const existingCartItem = Array.from(cartItems.children).find(cartItem =>
        cartItem.querySelector('.cart-item-title').textContent === title
    );

    // If the item is already in the cart, display an alert and return
    if (existingCartItem) {
        alert('This item is already added to the cart');
        return;
    }

    // Create a new cart row element
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    // Create HTML content for the new cart row
    const cartRowContents = `
        <div class="cart-item">
            <img class="cart-item-image" src="${imageSrc}">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price">${price}</span>
        <div class="quantity-container">
        <input class="cart-quantity-input" type="number" value="1">
        </div>
        <button class="delate" type="button"><span class="material-symbols-outlined">
            delete
        </span></button>`;
    // Set the inner HTML of the cart row and append it to the cart items container
    cartRow.innerHTML = cartRowContents;
    cartItems.appendChild(cartRow);
    // Add event listeners for the 'Remove' button and quantity input in the new cart row
    const removeButton = cartRow.querySelector('.delate');
    removeButton.addEventListener('click', removeCartItem);
    const quantityInput = cartRow.querySelector('.cart-quantity-input');
    quantityInput.addEventListener('change', quantityChanged);

    // Alart when item is added to the cart
    alert(`${title} Has been Added to Your Cart`);
    
    // Add the item to local storage
    addToLocalStorage({ title, price, imageSrc });
}

// Function to add an item to local storage
function addToLocalStorage(item) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to update the total price of items in the cart
function updateCartTotal() {
    // Get the cart item container and all cart rows
    const cartItemContainer = document.querySelector('.cart-items');
    const cartRows = cartItemContainer.querySelectorAll('.cart-row');
    let total = 0;
    // Loop through each cart row and calculate the total price
    for (const cartRow of cartRows) {
        const priceElement = cartRow.querySelector('.cart-price');
        const quantityElement = cartRow.querySelector('.cart-quantity-input');
        const price = parseFloat(priceElement.textContent.replace('$', ''));
        const quantity = quantityElement.value;
        total += price * quantity;
    }
    // Round the total to two decimal places and update the cart total display
    total = Math.round(total * 100) / 100;
    const cartTotalPrice = document.querySelector('.cart-total-price');
    cartTotalPrice.innerText = `$${total}`;
}

// Function to retrieve and display cart items from local storage
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');

    cartItemsContainer.innerHTML = ''; // Clear previous items

    cartItems.forEach(item => {
        const cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');
        cartRow.innerHTML = `
            <div class="cart-item">
                <img class="cart-item-image" src="${item.imageSrc}">
                <span class="cart-item-title">${item.title}</span>
            </div>
            <span class="cart-price">${item.price}</span>
            <div class="quantity-container">
                <input class="cart-quantity-input" type="number" value="1">
            </div>
            <button class="delate" type="button"><span class="material-symbols-outlined">delete</span></button>`;
        
        cartItemsContainer.appendChild(cartRow);

        // Add event listeners for the 'Remove' button and quantity input in the new cart row
        const removeButton = cartRow.querySelector('.delate');
        removeButton.addEventListener('click', removeCartItem);
        const quantityInput = cartRow.querySelector('.cart-quantity-input');
        quantityInput.addEventListener('change', quantityChanged);
    });

    // Update the total price of items in the cart after displaying them
    updateCartTotal();

    updateCartIcon();
}

// Call displayCartItems function when the cart page loads
window.onload = displayCartItems;

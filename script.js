let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
    const tableBody = document.querySelector('#cart-items tbody');
    tableBody.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart`);
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    alert("Thank you for your order!");
    cart = [];
    localStorage.removeItem('cart');
    updateCartDisplay();
}

// Run on cart page only
if (window.location.pathname.includes("cart.html")) {
    document.addEventListener("DOMContentLoaded", updateCartDisplay);
}

// Hook add-to-cart buttons on other pages
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));
            addToCart(name, price);
        });
    });
});


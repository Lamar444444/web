let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
    const tableBody = document.querySelector('#cart-items tbody');
    tableBody.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        const row = document.createElement('tr');

        const itemTotal = item.price * item.quantity;
        total += itemTotal;

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
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
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
    alert("Checkout not implemented yet.");
}

// Call on page load if on cart.html
if (window.location.pathname.includes("cart.html")) {
    updateCartDisplay();
}

// Attach to all add-to-cart buttons
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            addToCart(name, price);
        });
    });
});

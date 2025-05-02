// Placeholder for future dynamic JS functionality
console.log("E-Commerce site loaded.");

let cart = [];

function addToCart(productName, price) {
  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: productName, price, quantity: 1 });
  }
  updateCartDisplay();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
      <button onclick="removeFromCart(${index})">❌</button>`;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.innerText = total.toFixed(2);
}

function toggleCart() {
  document.getElementById("cart-popup").classList.toggle("hidden");
}

function checkout() {
  alert("Checkout system not connected. Ready for Stripe or backend.");
} 

async function checkout() {
  const response = await fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ items: cart })
  });

  const data = await response.json();
  const stripe = Stripe("pk_test_YourPublicKeyHere"); // From Stripe dashboard
  stripe.redirectToCheckout({ sessionId: data.id });
}
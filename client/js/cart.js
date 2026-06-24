/*
 * Cart script used on the cart page. It renders the items stored in
 * localStorage, allows quantity adjustments and removal, computes
 * the total price, and submits an order to the backend when
 * checkout is clicked.
 */

document.addEventListener('DOMContentLoaded', () => {
  const cartItemsDiv = document.getElementById('cart-items');
  const totalElem = document.getElementById('total');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (!cartItemsDiv) return;

  function renderCart() {
    const cart = getCart();
    if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
      totalElem.textContent = '';
      return;
    }
    cartItemsDiv.innerHTML = cart
      .map((item, index) => `
        <div class="cart-item">
          <span>${item.name}</span>
          <span>
            Quantity: <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty">
          </span>
          <span>Price: $${(item.price * item.quantity).toFixed(2)}</span>
          <button data-index="${index}" class="remove">Remove</button>
        </div>
      `)
      .join('');
    const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    totalElem.textContent = 'Total: $' + total.toFixed(2);
  }

  // Remove items
  cartItemsDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
      const index = e.target.getAttribute('data-index');
      const cart = getCart();
      cart.splice(index, 1);
      setCart(cart);
      updateNav();
      renderCart();
    }
  });

  // Change quantities
  cartItemsDiv.addEventListener('change', (e) => {
    if (e.target.classList.contains('qty')) {
      const index = e.target.getAttribute('data-index');
      let value = parseInt(e.target.value);
      if (isNaN(value) || value < 1) value = 1;
      const cart = getCart();
      cart[index].quantity = value;
      setCart(cart);
      renderCart();
      updateNav();
    }
  });

  // Handle checkout
  checkoutBtn.addEventListener('click', async () => {
    const user = getUser();
    if (!user) {
      alert('You must be logged in to checkout');
      return;
    }
    const cart = getCart();
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    const items = cart.map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price
    }));
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        },
        body: JSON.stringify({ items })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Order placed successfully!');
        setCart([]);
        updateNav();
        renderCart();
      } else {
        alert(data.message || 'Error placing order');
      }
    } catch (err) {
      alert('Error placing order');
    }
  });

  renderCart();
});
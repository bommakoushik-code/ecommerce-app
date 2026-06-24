/*
 * Products script responsible for loading product data from the API
 * and rendering it on the homepage. Each product card includes a
 * button that adds the item to the cart stored in localStorage.
 */

document.addEventListener('DOMContentLoaded', () => {
  const productsDiv = document.getElementById('products');
  if (!productsDiv) return;
  fetch('/api/products')
    .then(res => res.json())
    .then(products => {
      productsDiv.innerHTML = products
        .map(product => `
          <div class="product">
            <img src="${product.image || 'https://via.placeholder.com/150'}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description || ''}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button data-id="${product._id}" data-name="${product.name}" data-price="${product.price}">Add to cart</button>
          </div>
        `)
        .join('');
    });

  // Listen for add to cart button clicks
  productsDiv.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.getAttribute('data-id');
      const name = e.target.getAttribute('data-name');
      const price = parseFloat(e.target.getAttribute('data-price'));
      const cart = getCart();
      const existing = cart.find(item => item.product === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ product: id, name, price, quantity: 1 });
      }
      setCart(cart);
      updateNav();
      alert('Added to cart');
    }
  });
});
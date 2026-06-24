/*
 * Admin script used on the admin page. It restricts access to admin
 * users, allows creation of new products, listing of existing products
 * and provides simple edit/delete functionality. Editing prompts the
 * administrator for new values which are then sent to the API.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-product-form');
  const adminProductsDiv = document.getElementById('admin-products');

  const user = getUser();
  // Redirect non‑admins to homepage
  if (!user || user.role !== 'admin') {
    alert('You are not authorised to view this page');
    window.location.href = 'index.html';
    return;
  }

  async function fetchProducts() {
    const res = await fetch('/api/products');
    const products = await res.json();
    adminProductsDiv.innerHTML = products
      .map(product => `
        <div class="admin-product">
          <span>${product.name} ($${product.price.toFixed(2)})</span>
          <button data-id="${product._id}" class="edit-btn">Edit</button>
          <button data-id="${product._id}" class="delete-btn">Delete</button>
        </div>
      `)
      .join('');
  }

  // Handle product creation
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newProduct = {
      name: document.getElementById('product-name').value,
      description: document.getElementById('product-description').value,
      price: parseFloat(document.getElementById('product-price').value),
      image: document.getElementById('product-image').value,
      stock: parseInt(document.getElementById('product-stock').value)
    };
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Product created');
        form.reset();
        fetchProducts();
      } else {
        alert(data.message || 'Error creating product');
      }
    } catch (err) {
      alert('Error creating product');
    }
  });

  // Handle edit and delete actions
  adminProductsDiv.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const id = e.target.getAttribute('data-id');
      if (confirm('Are you sure you want to delete this product?')) {
        const res = await fetch('/api/products/' + id, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        });
        if (res.ok) {
          fetchProducts();
        } else {
          const data = await res.json();
          alert(data.message || 'Error deleting product');
        }
      }
    }
    if (e.target.classList.contains('edit-btn')) {
      const id = e.target.getAttribute('data-id');
      // Prompt for new values – simple UI for brevity
      const name = prompt('Enter new name');
      const description = prompt('Enter new description');
      const price = prompt('Enter new price');
      const image = prompt('Enter new image URL');
      const stock = prompt('Enter new stock');
      const updated = {
        name,
        description,
        price: parseFloat(price),
        image,
        stock: parseInt(stock)
      };
      const res = await fetch('/api/products/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        fetchProducts();
      } else {
        const data = await res.json();
        alert(data.message || 'Error updating product');
      }
    }
  });

  // Load products on initial page load
  fetchProducts();
});
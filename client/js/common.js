/*
 * Common helper functions used across pages. These handle user
 * storage, cart storage, navigation updates and logout. Shared
 * functionality is centralised here to avoid duplication.
 */

// Retrieve the stored user object from localStorage
function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Store the user object into localStorage
function setUser(data) {
  localStorage.setItem('user', JSON.stringify(data));
}

// Remove the user from storage
function clearUser() {
  localStorage.removeItem('user');
}

// Retrieve the cart from storage
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Store the cart in storage
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update the navigation bar based on user and cart state
function updateNav() {
  const user = getUser();
  const authLinks = document.getElementById('auth-links');
  const userInfo = document.getElementById('user-info');
  const usernameSpan = document.getElementById('username');
  const adminLink = document.getElementById('admin-link');
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const cart = getCart();
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  }
  if (user) {
    if (authLinks) authLinks.style.display = 'none';
    if (userInfo) userInfo.style.display = 'inline';
    if (usernameSpan) usernameSpan.textContent = user.name;
    if (adminLink) adminLink.style.display = user.role === 'admin' ? 'inline' : 'none';
  } else {
    if (authLinks) authLinks.style.display = 'inline';
    if (userInfo) userInfo.style.display = 'none';
    if (adminLink) adminLink.style.display = 'none';
  }
}

// Log the user out
function logout() {
  clearUser();
  localStorage.removeItem('cart');
  window.location.href = 'index.html';
}

// Initialise common events on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }
  updateNav();
});
/*
 * Authentication script for handling user login and registration.
 * When forms are submitted the appropriate API endpoint is called
 * and on success the returned user data (including JWT token) is
 * persisted in localStorage via setUser(). After auth the user is
 * redirected back to the homepage.
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  // Handle login
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        const res = await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
          window.location.href = 'index.html';
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (err) {
        alert('Error logging in');
      }
    });
  }

  // Handle registration
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        const res = await fetch('/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
          window.location.href = 'index.html';
        } else {
          alert(data.message || 'Registration failed');
        }
      } catch (err) {
        alert('Error registering');
      }
    });
  }
});
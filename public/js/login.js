const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-button');
const userMenu = document.getElementById('user-menu');
const userName = document.getElementById('user-name');
const logoutBtn = document.getElementById('logout-button');

// Hàm hiển thị menu user khi login
function showUserMenu(user) {
  loginBtn.style.display = 'none';       // ẩn nút login
  userMenu.style.display = 'block';      // hiện menu
  userName.textContent = user.name;      // set tên user
}

// Logout
function logout() {
  fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    .then(res => res.json())
    .then(data => {
      if(data.success) location.reload();
    });
}
logoutBtn.onclick = logout;

// Xử lý submit form đăng nhập
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Ngăn reload trang

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value;
  const role = loginForm.role.value;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // gửi cookie session
      body: JSON.stringify({ email, password, role })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Đăng nhập thành công');

      // --- Thêm ngay UI Logout ---
      const loginBtn = document.getElementById('login-button');
      if (loginBtn) {
        loginBtn.textContent = 'Logout';
        loginBtn.onclick = () => {
          fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
            .then(r => r.json())
            .then(res => {
              if (res.success) location.reload();
            });
        };
      }

      // Redirect sang trang phù hợp
      window.location.href = role === 'admin' ? 'dashboard.html' : 'index.html';
    } else {
      alert(data.message || 'Đăng nhập thất bại');
    }
  } catch (err) {
    alert('Lỗi server');
    console.error(err);
  }
});

// Kiểm tra trạng thái login khi load trang
window.addEventListener('load', () => {
  fetch('/api/auth/status', {
    method: 'GET',
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => {
      if (data.user) {
        // User đang login → đổi nút
        const loginBtn = document.getElementById('login-button');
        if (loginBtn) {
          loginBtn.textContent = 'Logout';
          loginBtn.onclick = () => {
            fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
              .then(r => r.json())
              .then(res => {
                if (res.success) location.reload();
              });
          };
        }
      }
    })
    .catch(err => console.error(err));
});

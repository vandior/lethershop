const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (e)=>{
  e.preventDefault();

  const name = registerForm.name.value;
  const email = registerForm.email.value;
  const password = registerForm.password.value;
  const phone = registerForm.phone.value;
  const address = registerForm.address.value;

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name,email,password,phone,address})
    });

    const data = await res.json();
    if(res.ok){
      alert('Đăng ký thành công, mời đăng nhập');
      window.location.href = 'login.html';
    } else {
      alert(data.message);
    }
  } catch(err){
    alert('Lỗi server');
    console.error(err);
  }
});

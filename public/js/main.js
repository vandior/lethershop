async function checkLoginStatus(){
  try{
    const res = await fetch('/api/auth/status'); // backend trả thông tin user nếu login
    const data = await res.json();
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');

    if(res.ok && data.user){
      loginLink.style.display = 'none';
      logoutLink.style.display = 'inline';
      logoutLink.addEventListener('click', async ()=>{
        await fetch('/api/auth/logout',{method:'POST'});
        window.location.reload();
      });
    } else {
      loginLink.style.display = 'inline';
      logoutLink.style.display = 'none';
    }
  } catch(err){
    console.error(err);
  }
}

checkLoginStatus();

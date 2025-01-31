const formLogin = document.querySelector('#form__login');
const formRegister = document.querySelector('#form__register');

if (formRegister) {
  formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formRegister).entries());
    const result = await fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      window.location.replace('/');
    } else {
      alert('wrong any');
    }
  });
}

if (formLogin) {
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formLogin).entries());
    const result = await fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (result.status === 200) {
      console.log('log');
      window.location.replace('/');
    } else {
      alert('wrong any');
    }
  });
}

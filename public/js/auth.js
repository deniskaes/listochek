const formLogin = document.querySelector('#form__login');
const formLoginformRegister = document.querySelector('#form__register');

if (formRegister) {
  formMain.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(formRegister).entries);
    const result = await fetch('/user/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) ,
    });

    if (result.status === 200) {
      window.location.replace('/')
    } else {
      alert('wrong any')
    }

  });
}

if (formLogin) {
  formMain.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formLogin).entries);
    const result = await fetch('/user/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) ,
    });
    if (result.status === 200) {
      window.location.replace('/')
    } else {
      alert('wrong any')
    }
  });
}
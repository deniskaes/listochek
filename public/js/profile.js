const profile = document.querySelector('#show__profile');

if (profile) {
  profile.addEventListener('click', async (e) => {
    switch (e.target.id) {
      case 'profile__group':
        showGroup();
        break;
      case 'profile__list':
        showList();
        break;
      case 'logout':
        logout();
        break;
      default:
        break;
    }
    
  })
}

async function logout(){
  await fetch('/user/logout');
  window.location.replace('/user/login');
}



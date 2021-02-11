const profile = document.querySelector('#profile');

if (profile) {
  profile.addEventListener('click', async (e) => {
    switch (e.target.id) {
      case 'group':
        break;
      case 'list':
        break;
      case 'logout':
        logout();
        break;
      default:
        break;
    }
    
  })
}

function logout(){
  fetch('/user/logout');
}



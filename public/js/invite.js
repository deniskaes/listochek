const massege = document.querySelector('#massege');
const massegeInviteClone = document.querySelector('#massege_invite');
function invitePeople(id) {
  const invitePeopleId = [];
  // добавили форму для добовления списка пользователей
  const invitepeople = massegeInviteClone.content.cloneNode(true);
  console.log(invitepeople);
  const inviteTitle = invitepeople.querySelector('.invite__title');
  inviteTitle.textContent = 'Введите емейл пользователя для добовления';
  massege.append(invitepeople);
  massege.classList.toggle('massege_hide');
  console.log('invite people=>', id);
  // отлавливаем пользователя по логину и отоброжаем его имя и добовляем новое поля для следущего пользователя
  massege.addEventListener('click', async (e) => {
    if (e.target.id === 'add__user') {
      const parentLi = e.target.parentElement;
      const userEmail = parentLi.querySelector('#user_email_search');
      const resultSearch = await fetch(`/user/${userEmail.value}`);
      const userInfoClone = document
        .querySelector('#userInfoInvite')
        .content.cloneNode(true);
      const titleUserInfo = userInfoClone.querySelector(
        '#userInfoInvite__title',
      );
      const inviteLists = document.querySelector('#invite__lists');
      const newUserInviteLi = document
        .querySelector('#invite__new_user_search')
        .content.cloneNode(true);
      if (resultSearch.status === 200) {
        const userSearch = await resultSearch.json();
        invitePeopleId.push(userSearch._id);
        titleUserInfo.textContent = `${userSearch.firstName} ${userSearch.secondName}`;
        parentLi.innerHTML = '';
        parentLi.append(userInfoClone);
        inviteLists.append(newUserInviteLi);
      } else {
        titleUserInfo.textContent = 'Wrong Email';
        parentLi.innerHTML = '';
        parentLi.append(userInfoClone);
        inviteLists.append(newUserInviteLi);
      }
    }
    if (e.target.id === 'massege_invite__cancelBTN') {
      massege.innerHTML = ''
      massege.classList.toggle('massege_hide');
    }
    if (e.target.id === 'massege_invite__inviteBTN') {
      massege.innerHTML = '';
      massege.classList.toggle('massege_hide');
       const resultInvitePeople = await fetch('/list', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({idList: id, idUser: invitePeopleId})
       });
      window.location.replace('/')
    }
  });
}

function inviteGroup(id) {
  console.log('invite group=>', id);
  alert('В разработке');
}

const listsBTN = document.querySelector('#lists__btn');
const groupBTN = document.querySelector('#group__btn');
const addListBTN = document.querySelector('#addList__btn');
const profileBTN = document.querySelector('#profile__btn');
const show_profile = document.querySelector('#show__profile');
const show_lists = document.querySelector('#show__lists');
const show_group = document.querySelector('#show__group');
const show_addList = document.querySelector('#show__addList');
let activeMap = show_lists;

if (groupBTN) {
  groupBTN.addEventListener('click', () => {
    showGroup();
  });
}

if (listsBTN) {
  listsBTN.addEventListener('click', () => {
    showList();
  });
}

if (addListBTN) {
  addListBTN.addEventListener('click', () => {
    showAddList();
  });
}

if (profileBTN) {
  profileBTN.addEventListener('click', () => {
    showProfile();
  });
}

function showGroup() {
  activeMap.classList.toggle('hide');
  activeMap = show_group;
  show_group.classList.toggle('hide');
  console.log('showGroup');
}

function showList() {
  activeMap.classList.toggle('hide');
  activeMap = show_lists;
  show_lists.classList.toggle('hide');
  console.log('showList');
}

function showProfile() {
  activeMap.classList.toggle('hide');
  activeMap = show_profile;
  show_profile.classList.toggle('hide');
  console.log('showProfile');
}

function showAddList() {
  activeMap.classList.toggle('hide');
  activeMap = show_addList;
  show_addList.classList.toggle('hide');
  console.log('showAddList');
}

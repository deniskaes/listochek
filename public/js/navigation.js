const listsBTN = document.querySelector('#lists__btn');
const groupBTN = document.querySelector('#group__btn');
const addListBTN = document.querySelector('#addList__btn');
const profileBTN = document.querySelector('#profile__btn');

if (groupBTN) {
  groupBTN.addEventListener('click', () => {
    showGroup()
  })
}

if (listsBTN) {
  listsBTN.addEventListener('click', () => {
    showList();
  });
}

function showGroup() {
  console.log('showGroup');
}

function showList() {
  console.log('showList');
}
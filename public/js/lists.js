const showLists = document.querySelector('#show__lists');
const mainPageList = document.querySelector('#show__lists');
const showListsItem = document.querySelector('#show__list'); // куда добовляем наш лист
let listBase;
let idList;
if (showLists) {
  showLists.addEventListener('click', (e) => {
    if (e.target.dataset.note === 'listItems') {
      showList(e.target.id);
    }
  });
}

async function showList(id) {
  idList = id;
  const listFetch = await fetch(`/list/${id}`);
  const list = await listFetch.json();
  listBase = list;
  const itemsListTemplate = document
    .querySelector('#itemsListTemplate')
    .content.cloneNode(true); // сам лист

  const elementList = itemsListTemplate.querySelector('#element__list_lists'); // список покупок

  const elementListTitle = itemsListTemplate.querySelector(
    '#element__list_title',
  ); // титл листа

  elementListTitle.textContent = list.title;

  list.goods.forEach((element) => {
    const elementListItems = document
      .querySelector('#element_list__items')
      .content.cloneNode(true); // элемент списка покупок
    const elementsItemsLink = elementListItems.querySelector(
      '#elements__items_link',
    );
    elementsItemsLink.textContent = element.title;
    if (element.isCompleted) {
      elementsItemsLink.classList.add('.completed');
    } else {
      elementsItemsLink.classList.add('.completed_false');
    }
    elementList.append(elementListItems);
  });

  showListsItem.append(itemsListTemplate);
  showListsItem.classList.toggle('show__list_hide');
  mainPageList.classList.toggle('hide');
}

if (showListsItem) {
  showListsItem.addEventListener('click', async (e) => {
    if (e.target.id === 'element_list__action_cancel') {
      showListsItem.innerHTML = '';
      showListsItem.classList.toggle('show__list_hide');
      mainPageList.classList.toggle('hide');
    }

    if (e.target.id === 'element_list__action_save') {
      await fetch('/list/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listBase),
      });
      showListsItem.innerHTML = '';
      showListsItem.classList.toggle('show__list_hide');
      mainPageList.classList.toggle('hide');
    }
    if (e.target.id === 'element_list__action_invite_peple') {
      invitePeople(idList);
    }

    if (e.target.id === 'element_list__action_invite_group') {
      inviteGroup(idList);
    }
  });
}

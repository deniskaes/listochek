const goodsList = document.querySelector('#goods__list');
const newListGoods = document.querySelector('#newItemsGoods');
const addListForm = document.querySelector('.addList_form');



if (addListForm) {

  addListForm.addEventListener('click', (e) => {
    if (e.target.id === 'add__goods_btn_add') {
      const newGoods = newListGoods.content.cloneNode(true);
      goodsList.append(newGoods);
    }

    if (e.target.id === 'add__goods_btn_delete') {
      e.target.parentElement.remove();
    }

    if (e.target.id === 'addList_form__cancel') {
      const listItems = document.querySelectorAll('#goods__item');
      listItems.forEach((el, i) => {
        if (i > 0) {
          el.remove();
        }
      })
      
    }

  });
}

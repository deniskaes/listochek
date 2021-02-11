const showLists = document.querySelector('#show__lists');

if (showLists) {
  showLists.addEventListener('click', (e) => {
    if (e.target.dataset.note === 'listItems') {
      showList(e.target.id);
    }
  });
}

async function showList(id) {
  const list = await fetch(`/list/:${id}`)
  
}

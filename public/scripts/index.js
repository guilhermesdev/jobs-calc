import Modal from './modal.js';

const modal = Modal({ animateClasses: ['animate-pop', 'back'] })

const cards = document.querySelectorAll('.cards .card')
const deleteForm = document.querySelector('#delete-job')
const userImg = document.querySelector('#user-img');
const dropdown = document.querySelector('#user-img ~ .dropdown');

for (let card of cards) {
  const cardId = card.dataset.id

  const deleteButton = card.querySelector('button.delete')
  deleteButton.onclick = () => {
    modal.open()
    deleteForm.setAttribute('action', '/job/delete/' + cardId)
  }
}

userImg.addEventListener('click', () => {
  dropdown.classList.toggle('hidden');
});

document.addEventListener('click', ({ target }) => {
  if(target !== userImg && !dropdown.classList.contains('hidden')){
    dropdown.classList.add('hidden');
  }
});
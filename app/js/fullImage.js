(function () {

  let container = document.querySelector('.slider__container');
  let modalBlock = document.querySelector('.modal');
  let modalImage = modalBlock.querySelector('.modal__image');
  let modalClose = modalBlock.querySelector('.modal__close');

  function positionClose(){
    modalClose.style.left = modalImage.clientWidth + modalImage.getBoundingClientRect().left - 50  + 'px';
    modalClose.style.top = modalImage.getBoundingClientRect().top + 15 + 'px'
  }

  function closeModal(){
    modalBlock.style.display = 'none';
    modalImage.src = '';
  }

  function onEscPress(event){
    if(event.code === 'Escape'){
      closeModal();
      window.removeEventListener('keydown',onEscPress);
    }
  }

  container.addEventListener('click',function (event) {
    event.preventDefault();
    if(event.target.nodeName === 'IMG'){
      modalBlock.style.display = 'block';
      modalImage.src = event.target.dataset.src;
      modalImage.addEventListener('load',positionClose);
      modalClose.addEventListener('click',closeModal);
      window.addEventListener('keydown',onEscPress);
    }
  });

})();
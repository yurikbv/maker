(function () {
  function moveItem() {
    let windowHeight = document.documentElement.clientHeight;
    let itemsLeft = document.body.querySelectorAll('.transitionLeft');
    let itemsRight = document.body.querySelectorAll('.transitionRight');

    function makeDo(items) {
      for(let item of items){
        let coords = item.getBoundingClientRect();
        if(coords.top < windowHeight-100 && coords.top > -windowHeight || coords.bottom > -windowHeight && coords.bottom < windowHeight){
          item.classList.remove(items.name);
          item.style.transform = '';
        }
      }
    }
    makeDo(itemsLeft);
    makeDo(itemsRight);
  }
  window.onscroll = moveItem;
  moveItem();

})();
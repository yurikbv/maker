
(function () {

  let menu = document.querySelector('.menu');
  let menuMobile = document.querySelector('.menu-mobile');

  let openMenu = () => {
    menuMobile.classList.add('menu-mobile__opened');
    menu.classList.add('menu__opened');
    window.addEventListener('keydown',onEscPress);
    menuMobile.addEventListener('keydown',onEnterPress)
  };

  let closeMenu = () => {
    menuMobile.classList.remove('menu-mobile__opened');
    menu.classList.remove('menu__opened');
    window.removeEventListener('keydown',onEscPress);
  };

  let onEscPress = (event) => {
    if (event.code === 'Escape'){
      closeMenu();
    }
  };

  let onEnterPress = () => {
    if (event.code === 'Enter' && menuMobile.classList.contains('menu-mobile__opened')){
      closeMenu();
    }else if(event.code === 'Enter'){
      openMenu();
    }
  };

  menuMobile.addEventListener('click',function () {
    if (menuMobile.classList.contains('menu-mobile__opened')) closeMenu();
    else openMenu();
  });
  menuMobile.addEventListener('keydown',onEnterPress)
})();
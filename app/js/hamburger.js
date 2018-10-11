
(function () {
  'use strict';
  let menu = document.querySelector('.menu-header__list');
  let menuMobile = document.querySelector('.hamburger');

  let openMenu = () => {
    menuMobile.classList.add('hamburger__opened');
    menu.classList.add('menu-header__opened');
    window.addEventListener('keydown',onEscPress);
    menuMobile.addEventListener('keydown',onEnterPress)
  };

  let closeMenu = () => {
    menuMobile.classList.remove('hamburger__opened');
    menu.classList.remove('menu-header__opened');
    window.removeEventListener('keydown',onEscPress);
  };

  let onEscPress = (event) => {
    if (event.code === 'Escape'){
      closeMenu();
    }
  };

  let onEnterPress = () => {
    if (event.code === 'Enter' && menuMobile.classList.contains('hamburger__opened')){
      closeMenu();
    }else if(event.code === 'Enter'){
      openMenu();
    }
  };

  menuMobile.addEventListener('click',function () {
    if (menuMobile.classList.contains('hamburger__opened')) closeMenu();
    else openMenu();
  });
  menuMobile.addEventListener('keydown',onEnterPress)
})();
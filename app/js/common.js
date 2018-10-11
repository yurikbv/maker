
(function() {
	let transitionLeft = document.querySelectorAll('.transitionLeft');
	for (let item of transitionLeft){
	  item.setAttribute('style','transform: translateX(-'+ document.body.clientWidth +'px)')
  }
  let transitionRight = document.querySelectorAll('.transitionRight');
  for (let item of transitionRight){
    item.setAttribute('style','transform: translateX('+ document.body.clientWidth +'px)')
  }
})();

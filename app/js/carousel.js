(function () {
  class Carousel{
    constructor({width,count}){
      this.width = width;
      this.count = count;
      this.position = 0;
      this.elements = document.body.querySelectorAll('.slider__item');
      this.list = document.body.querySelector('.slider__container');
      this.prevButton = document.body.querySelector('.slider__button--left');
      this.nextButton = document.body.querySelector('.slider__button--right');
      this.prevButton.onclick =  this.prevImage.bind(this);
      this.nextButton.onclick =  () => this.nextImage();
      this.list.onmousedown = (event) => this.mouseMove(event);
    }
    prevImage(){
      this.position = Math.min(this.position + this.width * this.count,0);
      this.list.style.marginLeft = this.position + 'px'
    }
    nextImage(){
      this.position = Math.max(this.position - this.width * this.count , (-this.width * this.elements.length) + (this.width * this.count));
      this.list.style.marginLeft = this.position + 'px'
    }
    mouseMove(event){
      this.mouseCoordX = event.clientX;
      this.list.onmouseup = (ev) => this.mouseUp(ev);
    }
    mouseUp(ev){
      (ev.clientX < this.mouseCoordX) ? this.nextImage() : (ev.clientX > this.mouseCoordX) ? this.prevImage() : 0;
    }
  }

  let widthItem = 121.5;
  let getCount = () => (document.body.offsetWidth < 1116 && document.body.offsetWidth > 976)
      ? 2 : (document.body.offsetWidth < 976 && document.body.offsetWidth > 796)
          ? 1 : (document.body.offsetWidth < 796 && document.body.offsetWidth > 576)
              ? 4 : (document.body.offsetWidth < 576) ? 2 : 3;

  let carousel = new Carousel({
    width: widthItem,
    count: getCount()
  });
})();
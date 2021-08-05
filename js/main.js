$(function(){
  
  $('.sellers__slider').slick({
    // autoplay: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: '<button class="slider-btn btn-left"><img src="images/slider-arr-left.svg" alt=""></button>',
    nextArrow: '<button class="slider-btn btn-right"><img src="images/slider-arr-right.svg" alt=""></button>',

    responsive: [
      {
        breakpoint: 1330,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });

  $('.reviews__slider').slick({
    autoplay: 4000,
    fade: true,
    arrows: false,
    dots: true,
  });

  $('.menu-btn').on('click', function () {
    $('.mob-menu').toggleClass('active');
    $('.menu-btn').toggleClass('active');
    $('body').toggleClass('lock');
  });


  const animItems = document.querySelectorAll('._anim');
  
  if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
      for (let i = 0; i < animItems.length; i++) {
        const animItem = animItems[i];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top; //насколько объект ниже
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animStart > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }
        if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
          animItem.classList.add('anim');
          animItem.classList.add('animed');
        } else {
          if (!animItem.classList.contains('animed')) {
            animItem.classList.remove('anim');
          }
        }
      }
    }
    function offset(el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
    animOnScroll();
  }
});
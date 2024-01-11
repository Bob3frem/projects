const slider = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 0,
  breakpoints: {
    0: {
      slidesPerView: 'auto',
      spaceBetween: 20
    },

    560: {
      slidesPerView: 'auto',
      spaceBetween: 0,
    },

    1250: {
      slidesPerView: 'auto',
      spaceBetween: 57,
    }
  }
});
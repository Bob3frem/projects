const slider = new Swiper('.nav', {
  breakpoints: {
    0: {
      slidesPerView: 3,
      spaceBetween: 20
    },

    560: {
      slidesPerView: 5,
      spaceBetween: 20
    }
  }
});
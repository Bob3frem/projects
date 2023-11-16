const swiper = new Swiper('.swiper-container', {
  a11y: {
    paginationBulletMessage: 'К следующему слайду {{index}}',
  },
  slidesPerView: 1,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

const mainSwiper = new Swiper('.hero__swiper', {
  slidesPerView: 1,
  loop: true,
});

const galerySwiper = new Swiper('.galery__swiper', {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 50,
  breakpoints: {

    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },

    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },

    768: {
      slidesPerView: 2,
      spaceBetween: 38,
      slidesPerGroup: 3,
    },

    1024: {
      slidesPerView: 2,
      spaceBetween: 34,
    },

    1625: {
      slidesPerView: 3,
      spaceBetween: 50,
    }
  },

  navigation: {
    nextEl: '.swiper-button-next-unique',
    prevEl: '.swiper-button-prev-unique',

  },

  pagination: {
    el: '.swiper-pagination-unique',
    type: 'fraction'
  },
});

const eventsSwiper = new Swiper('.events__swiper', {
  slidesPerView: 3,
  spaceBetween: 50,
      pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
  breakpoints: {

    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },

    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },

    768: {
      slidesPerView: 2,
      spaceBetween: 34,
      slidesPerGroup: 2,
    },

    1024: {
      slidesPerView: 3,
      spaceBetween: 27,
      slidesPerGroup: 2,
    },

    1625: {
      slidesPerView: 3,
      spaceBetween: 50,
    }
  },

  navigation: {
    nextEl: '.swiper-button-next-events',
    prevEl: '.swiper-button-prev-events',

  },
});

const projectsSwiper = new Swiper('.projects__swiper', {
  slidesPerView: 3,
  spaceBetween: 50,
  breakpoints: {

    320: {
      slidesPerView: 1,
    },

    768: {
      slidesPerView: 2,
      spaceBetween: 34,
    },

    1024: {
      slidesPerView: 2,
      spaceBetween: 50,
    },

    1625: {
      slidesPerView: 3,
      spaceBetween: 50,
    }
  },

  navigation: {
    nextEl: '.swiper-button-next-projects',
    prevEl: '.swiper-button-prev-projects',

  },
});

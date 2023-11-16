document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.selection__droptop');

  tabs.forEach(heroBtn => {
    heroBtn.addEventListener('click', event => {
      const way = event.currentTarget.dataset.way;
      const dataWay = document.querySelector(`[data-point=${way}]`);

      heroBtn.classList.toggle('selection__droptop-active');
      dataWay.classList.toggle('selection__dropdown-active');
    });
  });


  const btns = document.querySelectorAll('.description__button');

  btns.forEach(function(catalogBtn) {
    catalogBtn.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.banner').forEach(function(catalogBanner) {
        catalogBanner.classList.remove('_active');
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('_active');

      btns.forEach((btn) => {
        btn.classList.remove('is-active');
      });

      catalogBtn.classList.add('is-active');

    });
  });


  const burger = document.querySelector('.header__burger');
  const navDrop = document.querySelector('.header__nav');
  const headerBtn = document.querySelector('.header__btn');
  const headerSrch = document.querySelector('.header__search');
  const headerForm = document.querySelector('.header__form');

  burger.addEventListener('click', function(e) {
    burger.classList.toggle('active');
    navDrop.classList.toggle('active');
    headerBtn.classList.toggle('active');
  });

  headerSrch.addEventListener('click', function(ev) {
    headerSrch.classList.toggle('active');
    headerForm.classList.toggle('active');
  });

});

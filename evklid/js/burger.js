document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.header__burger');
  if (burger) {
    const burgerMenu = document.querySelector('.header-nav');
    burger.addEventListener('click', function(e) {
      burger.classList.toggle('active');
      burgerMenu.classList.toggle('active');
    });
  }

  const headerForm = document.querySelector('.header__form');
  const search = document.querySelector('.header-btn');
  if (search) {
      search.addEventListener('click', function(e) {
      headerForm.classList.toggle('active');
    });
  }

  const searchClose = document.querySelector('.header__form-btn');
  if (searchClose) {
    searchClose.addEventListener('click', function(e) {
      headerForm.classList.remove('active');
    });
  }

})
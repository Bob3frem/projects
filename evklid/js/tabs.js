//Tabs
document.addEventListener('DOMContentLoaded', function() {
  const btns = document.querySelectorAll('.steps__link');

	btns.forEach(function(stepsBtn) {
    stepsBtn.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.do__list').forEach(function(doList) {
        doList.classList.remove('do__list-active');
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('do__list-active');

      btns.forEach((btn) => {
        btn.classList.remove('is-active');
      });

      stepsBtn.classList.add('is-active');
    })
  })
})
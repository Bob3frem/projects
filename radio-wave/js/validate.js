const validator = new window.JustValidate('.form');

validator
  .addField('.input-name', [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Ошибка'
    },
    {
      rule: 'minLength',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 15,
    },
  ])
  .addField('.input-email', [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Ошибка'
    },
    {
      rule: 'email',
      value: true,
      errorMessage: 'Ошибка ввода'
    },
  ])
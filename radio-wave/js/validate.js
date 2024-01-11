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
      errorMessage: 'Введите минимум 3 символа',
    },
    {
      rule: 'maxLength',
      value: 15,
      errorMessage: 'Вводите не более 15 символов',
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

  .addField('.checkbox', [
    {
      rule: 'required',
      errorMessage: 'Согласие'
    },
  ],
  {
    errorsContainer: '.checkbox__error'
  }
  )
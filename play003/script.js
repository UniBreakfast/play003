function mur(what) { console.log(what) }
function check() {
  if (!login.value && !mail.value) return response.innerText =
    "Чтобы войти введите ваш Логин или Электронную почту"
  if (!pass.value) return response.innerText =
    "Без пароля войти нельзя"
  if (!mail.value) {
    for (let user of state.users) {
      if (user.login == login.value) {
        if (user.pass == pass.value) return response.innerText = "Заходим"
        else {
          pass.value = ''
          return response.innerText = "Неправильный пароль"
        }
      }
    }
    login.value = ''
    return response.innerText = "Пользователь с таким Логином не найден"
  }
  if (!login.value) {
    for (let user of state.users) {
      if (user.mail == mail.value) {
        if (user.pass == pass.value) return response.innerText = "Заходим"
        else {
          pass.value = ''
          return response.innerText = "Неправильный пароль"
        }
      }
    }
    mail.value = ''
    return response.innerText =
      "Пользователь с такой Электронной почтой не найден"
  }
  for (let user of state.users) {
    if (user.mail==mail.value || user.login==login.value) {
      if (user.pass == pass.value) return response.innerText = "Заходим"
      else {
        pass.value = ''
        return response.innerText = "Неправильный пароль"
      }
    }
  }
  login.value = mail.value = ''
  return response.innerText =
    "Пользователь с таким Логином или Электронной почтой не найден"
}

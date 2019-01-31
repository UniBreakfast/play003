function mur(what) { console.log(what) }

function rit(str) { response.innerText = str }

function SignUP() {
  if (!login.value && !mail.value)
    return rit("Для регистрации нужен Логин и/или Электронная почта")
  if (!pass.value) return rit("Придумайте Пароль, который не сможете забыть")
  if (login.value) {
    for (let u of state.users) {
      if (u.login==login.value) return rit("Этот Логин уже занят")
    }
  }
  if (mail.value) {
    for (let u of state.users) {
      if (u.mail==mail.value)
        return rit("Пользователь с этой Электронной почтой уже есть")
    }
  }
  let user = {pass: pass.value}
  if (login.value) user.login = login.value
  if ( mail.value) user.mail  =  mail.value
  state.users.push(user)
  mur(JSON.stringify(state, null, 2))
  return rit("Пользователь зарегистрирован. Заходим")
}

function SignIN() {
  if (!login.value && !mail.value)
    return rit("Чтобы войти введите ваш Логин или Электронную почту")
  if (!pass.value) return rit("Без Пароля войти нельзя")
  if (!mail.value) {   // введён только логин
    for (let u of state.users) {
      if (u.login==login.value) {
        if (u.pass==pass.value) return rit("Заходим")
        else return rit("Неправильный Пароль")
      }
    }
    return rit("Пользователь с таким Логином не найден")
  }
  if (!login.value) {   // введён только мэйл
    for (let u of state.users) {
      if (u.mail==mail.value) {
        if (u.pass==pass.value) return rit("Заходим")
        else return rit("Неправильный Пароль")
      }
    }
    return rit("Пользователь с такой Электронной почтой не найден")
  }
  for (let u of state.users) {   // введены и логин, и мэйл
    if (u.mail==mail.value || u.login==login.value) {
      if (u.pass==pass.value) return rit("Заходим")
      else return rit("Неправильный Пароль")
    }
  }
  return rit("Пользователь с таким Логином или Электронной почтой не найден")
}

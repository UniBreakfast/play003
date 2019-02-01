function mur(what) { console.log(what) }

function rit(str) { response.innerText = str }

function toggle(el, prop, val1, val2) {
  if (Array.isArray(el)) return el.forEach(el=>toggle(el,prop,val1,val2))
  if (el[prop]!==undefined) return el[prop] = el[prop]===val1? val2:val1
  el.style[prop] = el.style[prop]===val1? val2:val1
}

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
  return rit("Пользователь зарегистрирован. Заходим")==igi()
}

function SignIN() {
  if (!login.value && !mail.value)
    return rit("Чтобы войти введите ваш Логин или Электронную почту")
  if (!pass.value) return rit("Без Пароля войти нельзя")
  if (!mail.value) {   // введён только логин
    for (let u of state.users) {
      if (u.login==login.value) {
        if (u.pass==pass.value) return rit("Заходим")==igi()
        else return rit("Неправильный Пароль")
      }
    }
    return rit("Пользователь с таким Логином не найден")
  }
  if (!login.value) {   // введён только мэйл
    for (let u of state.users) {
      if (u.mail==mail.value) {
        if (u.pass==pass.value) return rit("Заходим")==igi()
        else return rit("Неправильный Пароль")
      }
    }
    return rit("Пользователь с такой Электронной почтой не найден")
  }
  for (let u of state.users) {   // введены и логин, и мэйл
    if (u.mail==mail.value || u.login==login.value) {
      if (u.pass==pass.value) return rit("Заходим")==igi()
      else return rit("Неправильный Пароль")
    }
  }
  return rit("Пользователь с таким Логином или Электронной почтой не найден")
}

function igi() {
  form.style.display = "none"
  main.style.display = "block"
}

const pad = num => (''+num).padStart(2,'0')
tick = 'Seconds'
t = new Date()
upDate()

function upDate() {
  date.innerText =
    t.getFullYear()+'-'+pad(t.getMonth()+1)+'-'+pad(t.getDate())
  time.innerText =
    pad(t.getHours())+':'+pad(t.getMinutes())+':'+pad(t.getSeconds())
}

function doTick() {
  t['set'+tick](t['get'+tick]()+1)
  upDate()
}

function TimeIT(e) {
  if (e.target==timing || e.target.className=='selbtn') return
  if (e.target==go) tak = setInterval(doTick, 1000)
  if (e.target==pause) clearInterval(tak)
  if (e.target==pause || e.target==go) {
    toggle(clock, 'boxShadow', "rgb(230, 230, 230) 0px 0px 0px 120px inset", '')
    return toggle([pause, go], 'className', 'selbtn', '')
  }
  if (e.target==sec || e.target==min || e.target==hour || e.target==day) {
    sec.className = min.className = hour.className = day.className = ''
    tick = e.target.dataset.tick
    return e.target.className = 'selbtn'
  }
  if (e.target.className = 'ML') {
    if (e.target.innerText == '+') {
      t['set'+e.target.dataset.tick](t['get'+e.target.dataset.tick]()+1)
      upDate()
    }
    else {
      t['set'+e.target.dataset.tick](t['get'+e.target.dataset.tick]()-1)
      upDate()
    }
  }
}
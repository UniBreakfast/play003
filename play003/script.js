const _ = undefined
function mur(what) { console.log(what) }

let respond = str => response_line.innerText = str

function toggle(el, prop, val1, val2) {
  if (Array.isArray(el)) el.forEach(el=>toggle(el,prop,val1,val2))
  else if (el[prop]!==_) el[prop] = el[prop]===val1? val2:val1
  else       el.style[prop] = el.style[prop]===val1? val2:val1
}
function trySignup() {
  if (!login_field.value && !mail_field.value)
    return respond("Для регистрации нужен Логин и/или Электронная почта")
  if (!pass_field.value)
    return respond("Придумайте Пароль, который не сможете забыть")
  if (login_field.value) {
    for (let u of state.users) {
      if (u.login==login_field.value) return respond("Этот Логин уже занят")
    }
  }
  if (mail_field.value) {
    for (let u of state.users) {
      if (u.mail==mail_field.value)
        return respond("Пользователь с этой Электронной почтой уже есть")
    }
  }
  let user = {pass: pass_field.value}
  if (login_field.value) user.login = login_field.value
  if ( mail_field.value) user.mail  =  mail_field.value
  state.users.push(user)
  respond("Пользователь зарегистрирован. Заходим") == signin()
}

function trySignin() {
  if (!login_field.value && !mail_field.value)
    return respond("Чтобы войти введите ваш Логин или Электронную почту")
  if (!pass_field.value) return respond("Без Пароля войти нельзя")
  if (!mail_field.value) {   // введён только логин
    for (let u of state.users) {
      if (u.login==login_field.value) {
        if (u.pass!=pass_field.value) return respond("Неправильный Пароль")
        else return respond("Заходим") == signin()
      }
    }
    return respond("Пользователь с таким Логином не найден")
  }
  if (!login_field.value) {   // введён только мэйл
    for (let u of state.users) {
      if (u.mail==mail_field.value) {
        if (u.pass!=pass_field.value) return respond("Неправильный Пароль")
        else return respond("Заходим") == signin()
      }
    }
    return respond("Пользователь с такой Электронной почтой не найден")
  }
  for (let u of state.users) {   // введены и логин, и мэйл
    if (u.mail==mail_field.value || u.login==login_field.value) {
      if (u.pass!=pass_field.value) return respond("Неправильный Пароль")
      else return respond("Заходим")==signin()
    }
  }
  return respond("Нет пользователя с этими Логином и Электронной почтой")
}

function signin() {
  auth_form.style.display = "none"
  main_win.style.display = "block"
}

let pad = num => (''+num).padStart(2,'0'),
tick = 'Seconds'
t = new Date()
upDate()

function upDate() {
  date_line.innerText =
    t.getFullYear()+'-'+pad(t.getMonth()+1)+'-'+pad(t.getDate())
  time_line.innerText =
    pad(t.getHours())+':'+pad(t.getMinutes())+':'+pad(t.getSeconds())

  const [[uNum, uWord], [lNum, lWord]] = timeLeft2by2(t, 'ru')

  left1_line.innerText = uNum
  left2_line.innerText = uWord
  left3_line.innerText = lNum
  left4_line.innerText = lWord
}

function doTick() {
  t['set'+tick](t['get'+tick]()+1)
  upDate()
}

function handleTime(e) {
  if (e.target==timing_ctrl || e.target.className=='sel_btn') return
  if (e.target==go_btn) tak = setInterval(doTick, 1000)
  if (e.target==pause_btn) clearInterval(tak)
  if (e.target==pause_btn || e.target==go_btn) {
    toggle([pause_btn, go_btn], 'className', 'sel_btn', '')
    return toggle(clock_block, 'boxShadow',
                  "rgb(230, 230, 230) 0px 0px 0px 120px inset", '')
  }
  if (e.target==sec_btn  || e.target==min_btn ||
      e.target==hour_btn || e.target==day_btn) {
    sec_btn.className  = min_btn.className = ''
    hour_btn.className = day_btn.className = ''
    tick = e.target.dataset.tick
    return e.target.className = 'sel_btn'
  }
  if (e.target.className = 'add_sub') {
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
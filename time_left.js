mur = console.log
unTom = untilTomorrow

function makeDate(time) {
  return new Date('2000-02-20 '+time)
}

function test(time, str1, str2) {
  let [res1, res2] = untilTomorrow(new makeDate(time))
  mur(time)
  mur(str1+"\t\t"+res1)
  mur(str2+"\t\t"+res2)
  mur(str1==res1 && str2==res2 ?
      "~~~~~~~~~~ IT WORKS!!! ~~~~~~~~~":"~~~   something's wrong...   ~~~")
}

function untilTomorrow(time) {
  let hh = time.getHours(),
      mm = time.getMinutes(),
      ss = time.getSeconds()
  let s = ss? 60-ss : 0,
      m = mm? 59-mm : 0,
      h = 23 - hh

  let str1 = 23-hh+' часов', str2 = 59-mm+' минут'
  return [str1, str2]
}

test("12:33:11", '11 часов', '26 минут')
test("13:00:11", '10 часов', '59 минут')
test("14:59:11", '9 часов', '49 секунд')
test("15:00:00", '9 часов', '')
test("23:01:02", '58 минут', '58 секунд')
test("23:59:02", '', '58 секунд')
test("00:00:00", '24 часов', '')

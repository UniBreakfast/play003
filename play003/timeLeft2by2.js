function timeLeft2by2(date, lang) {
  let {h,m,s} = tilMidnight(date)
  if (h) return [numberAndWord(h, 'hour',   lang),
              m? numberAndWord(m, 'minute', lang) :
              s? numberAndWord(s, 'second', lang) : ['','']]
  return [m? numberAndWord(m, 'minute', lang) : ['',''],
          s? numberAndWord(s, 'second', lang) : ['','']]
}

function tilMidnight(date) {
  const hh = date.getHours(),
        mm = date.getMinutes(),
        ss = date.getSeconds(),
        left = 86400 - hh*3600 - mm*60 - ss,
        s = 60 - (ss || 60),
        m = left%3600 - s,
        h = left - m - s
  return ({h:h/3600, m:m/60, s})
}

const countables = {
  en: {
    schemaLike: 'en',
    piece: { '1': 'piece',
             '2': 'pieces' },
    day: { '1': 'day',
           '2': 'days' },
    hour: { '1': 'hour',
            '2': 'hours' },
    minute: { '1': 'minute',
              '2': 'minutes' },
    second: { '1': 'second',
              '2': 'seconds' },
  },
  ru: {
    schemaLike: 'ru',
    piece: { '1': 'штука',
             '2': 'штуки',
             '5': 'штук' },
    day: { '1': 'день',
           '2': 'дня',
           '5': 'дней' },
    hour: { '1': 'час',
            '2': 'часа',
            '5': 'часов' },
    minute: { '1': 'минута',
              '2': 'минуты',
              '5': 'минут' },
    second: { '1': 'секунда',
              '2': 'секунды',
              '5': 'секунд' },
  },
  ua: {
    schemaLike: 'ru',
    piece: { '1': 'штука',
             '2': 'штуки',
             '5': 'штук' },
    day: { '1': 'день',
           '2': 'дні',
           '5': 'днів' },
    hour: { '1': 'година',
            '2': 'години',
            '5': 'годин' },
    minute: { '1': 'хвилина',
              '2': 'хвилини',
              '5': 'хвилин' },
    second: { '1': 'секунда',
              '2': 'секунди',
              '5': 'секунд' },
  },
}

function numberAndWord(num, alias, lang) {
  const n = Math.abs(num),
        words = !countables[lang] ? {'1':alias, '2':alias+'s'} :
          countables[lang][alias] || countables['en'][alias] ||
          {'1':alias, '2':alias+'s'}
  lang = countables[lang]? countables[lang].schemaLike : 'en'
  switch (lang) {
    case 'ru':
      if (!(n%10) || n%10>4 || n%100>10 && n%100<15)
        return [num, words['5']]
      if (n%10-1) return [num, words['2']]
      return [num, words['1']]
    case 'en':
    default:
      if (n-1) return [num, words['2']]
      return [num, words['1']]
  }
}

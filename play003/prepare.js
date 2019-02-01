function request(file, cb) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', file)
  xhr.onload = () => cb(xhr.response)
  xhr.send()
}
request('state.json', response => state=JSON.parse(response))

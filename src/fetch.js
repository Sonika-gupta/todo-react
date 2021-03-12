const url = 'http://localhost:3001/'

async function fetch (route, data, method) {
  const res = await window.fetch(url + route, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const value = await res.json()
  if (value.error) throw Error(value.error)
  return value
}

async function getLists () {
  return await fetch('lists')
}

export {
  getLists
}

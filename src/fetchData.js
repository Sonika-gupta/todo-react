const url = 'http://localhost:3001/'

async function fetchData (route, data, method = 'GET') {
  try {
    const res = await window.fetch(url + route, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const value = await res.json()
    if (value.error) console.log(value.error)
    return value
  } catch (err) {
    console.log(err)
    throw Error({ message: 'Fetch Failed', err })
  }
}

async function getLists () {
  return await fetchData('lists')
}

async function getListById (id) {
  return await fetchData(`lists/${id}`)
}

async function newList (name) {
  return await fetchData('lists', { name }, 'POST')
}

async function deleteLists (ids) {
  return await fetchData('lists', { ids: [...ids] }, 'DELETE')
}

async function updateList (id, key, value) {
  return await fetchData('lists', { id, key, value }, 'PUT')
}

async function getTasks (listId) {
  return await fetchData(`tasks/${listId}`)
}

async function getTasksTitles (listId) {
  return await fetchData(`tasks/${listId}/title`)
}

async function newTask (title, listId) {
  return await fetchData('tasks', { title, listId }, 'POST')
}

async function updateTask (id, key, value) {
  return await fetchData('tasks', { id, key, value }, 'PUT')
}

async function deleteTask (id) {
  return await fetchData('tasks', { id }, 'DELETE')
}

export {
  newList,
  getLists,
  getListById,
  updateList,
  deleteLists,
  getTasks,
  getTasksTitles,
  newTask,
  updateTask,
  deleteTask
}

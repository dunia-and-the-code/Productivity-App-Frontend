//live update time and date//////////////////////
//Daily quotes pulle din from API///////////////
//To Do list - checkboxes and create form
//Pomodoro clock - excuses alert
//Excuses redered in excuses card with timestamps
//Daily journal rendered with time stamp
//Daily journal form avaliable once a day
//Journal posts are editable
//CSS
//Object Oriented JavaScript

const userId = 2

const tasksURL = 'http://localhost:3000/tasks'
const quotesURL = 'http://quotes.rest/qod.json'

const toDoList = document.querySelector('#to_do_list')
const toDoForm = document.querySelector('#to_do_form')
const input = document.querySelector('#description')
const quotesContainer = document.querySelector('#quotes_container')


function updateDateTime() {

    const dateTimetag = document.querySelector('#date-time')
    let now = new Date()
    let hour = now.getHours()
    let minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
    let date = now.getDate()
    let day = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let year = now.getFullYear()

    let fullDateTime = `${hour}:${minutes}<br>${date} ${day[now.getDay()]} ${month[now.getMonth()]} ${year}`

    dateTimetag.innerHTML = fullDateTime
    setTimeout(updateDateTime, 100)

}


function getDailyQuote() {

    return fetch(quotesURL) 
    .then(resp => resp.json())
    .then(json => renderQuote(json))

}


function renderQuote(quote) {

    const quoteContent = document.createElement('h3')
    const quoteAuthor = document.createElement('p')

    quoteContent.innerText = `"${quote.contents.quotes[0].quote}"`
    quoteAuthor.innerText += quote.contents.quotes[0].author

    quotesContainer.append(quoteContent)
    quotesContainer.append(quoteAuthor)

}


function getTasks() {

    return fetch(tasksURL)
        .then(resp => resp.json())
        .then(json => renderTasks(json))

}


function renderTask(task) {

    const taskEl = document.createElement('li')
    // debugger
    console.log(task)
    taskEl.setAttribute('id', 'task_el')
    taskEl.dataset.id = task.id
    taskEl.innerHTML = task.description

    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox')
    checkBox.setAttribute('id', 'checkbox')

    taskEl.append(checkBox)
    toDoList.append(taskEl)

    checkBox.addEventListener('click', () => {
        // debugger
        const task = checkBox.parentNode
        const taskId = task.dataset.id
        task.parentNode.removeChild(task)

        deleteTaskFromServer(taskId)

    })
}


function renderTasks(tasks) {

    tasks.forEach(task => {
        renderTask(task)
        const taskEl = document.querySelector('#task_el')

    })

}


function deleteTaskFromServer(taskId) {

    return fetch(`${tasksURL}/${taskId}`, {
        method: 'DELETE',
    })
        .then(resp => resp.json())
        .then(json => console.log(json))

}


toDoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const task = {
        description: input.value,
        user_id: userId
    }

    console.log(task)
    createTaskOnServer(task)

})


function createTaskOnServer(task) {

    return fetch(tasksURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    })
        .then(resp => resp.json())
        .then(task => renderTask(task))
}

updateDateTime()
getDailyQuote()
getTasks()

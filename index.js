//Pomodoro clock - excuses alert
//increment / decrement pomodoro timer
//Excuses redered in excuses card with timestamps
//Fix back button on journal posts (renders null at fetch)
//CSS


const userId = 2

const tasksURL = 'http://localhost:3000/tasks'
const quotesURL = 'http://quotes.rest/qod.json'
const journalPostsURL = 'http://localhost:3000/journal_posts'

const toDoList = document.querySelector('#to_do_list')
const toDoForm = document.querySelector('#to_do_form')
const toDoFormContainer = document.querySelector('#form_container')
const input = document.querySelector('#description')
const quotesContainer = document.querySelector('#quotes_container')
const sessionTime = document.querySelector('#session_time')
const resetBtn = document.querySelector('#reset_btn')
const sessionStartBtn = document.querySelector('#session_start_btn')
const breakStartBtn = document.querySelector('#break_start_btn')
const breakTime = document.querySelector('#break_time')
const journalContainer = document.querySelector('#daily_journal')
const journalFormContainer = document.querySelector('#journal_form_container')
const journalFormInput = document.querySelector('#post_description')

toDoFormContainer.style.display = "none"
journalFormContainer.style.display = "none"

function updateDateTime() {

    const dateTimetag = document.querySelector('#date-time')
    let now = new Date()
    let hour = now.getHours()
    let minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
    let date = now.getDate()
    let day = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let year = now.getFullYear()

    let fullDateTime = `${hour}:${minutes}<br>${day[now.getDay()]} ${date} ${month[now.getMonth()]} ${year}`

    dateTimetag.innerHTML = fullDateTime
    setTimeout('updateDateTime()', 100)

}


function getDailyQuote() {

    return fetch(quotesURL)
        .then(resp => resp.json())
        .then(json => renderQuote(json))

}


function renderQuote(quote) {

    const quoteContent = document.createElement('p')
    const quoteAuthor = document.createElement('p')

    quoteContent.setAttribute('id', 'quoteContent')
    quoteAuthor.setAttribute('id', 'quoteAuthor')

    // let quoteLine = quote.contents.quotes[0].quote
    // let quoteLineSplit = quoteLine.split(' ')
    // let quoteLineOne = quoteLineSplit.slice(1,15)
    // let quoteLineTwo = quoteLineSplit.slice(16,30)
    // let quoteLineOneString = quoteLineOne.join(' ')
    // let quoteLineTwoString = quoteLineTwo.join(' ')
    // let brEl = document.createElement('br')
    // let quoteLineFull = `"${quoteLineOneString} \n ${quoteLineTwoString}"`

    // quoteContent.innerText = quoteLineFull
    quoteContent.innerText += quote.contents.quotes[0].quote
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

    taskEl.setAttribute('id', 'task_el')
    taskEl.dataset.id = task.id
    taskEl.innerHTML = task.description

    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox')
    checkBox.setAttribute('class', 'checkbox')

    taskEl.append(checkBox)
    toDoList.append(taskEl)

    checkBox.addEventListener('click', () => {

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

const addTaskBtn = document.querySelector('#add_task_btn')
const toDoContainer = document.querySelector('#to_do_container')
const toDoCard = document.querySelector('#to_do_card')
const formContainer = document.querySelector('#form_container')

addTaskBtn.addEventListener('click', () => {

    toDoContainer.innerHTML = ''
    toDoFormContainer.style.display = "block"
    toDoContainer.append(formContainer)
})

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

    createTaskOnServer(task)

        .then(toDoForm.reset())

    toDoContainer.innerHTML = ''
    toDoFormContainer.style.display = "none"
    toDoContainer.append(toDoList)
    toDoContainer.append(addTaskBtn)

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


let sessionMinutes = 26

function setSessionMinutes() {

    if (sessionMinutes > 0) {

        sessionMinutes--
        breakTime.innerHTML = `${sessionMinutes}:${sessionSeconds}`
        breakTime.setAttribute('id', 'session_time')

        // } else if () {



    } else {

        breakTime.innerHTML = "Session over, well done!"

    }
}


let sessionSeconds = 60

function setSessionSeconds() {

    if (sessionSeconds > 0) {

        sessionSeconds--

        if (sessionSeconds < 10) {
            sessionTime.innerHTML = `${sessionMinutes}:0${sessionSeconds}`
        } else {
            sessionTime.innerHTML = `${sessionMinutes}:${sessionSeconds}`
        }
    } else {

        sessionSeconds = 60

    }
}

sessionTime.innerHTML = `${sessionMinutes}:${sessionSeconds}`

sessionStartBtn.addEventListener('click', () => {

    setInterval('setSessionMinutes()', 60000)
    setInterval('setSessionSeconds()', 1000)

})


let breakMinutes = 26

function setBreakMinutes() {

    if (breakMinutes > 0) {

        breakMinutes--
        breakTime.innerHTML = `${breakMinutes}:${breakSeconds}`
        breakTime.setAttribute('id', 'break_time')

    } else {

        breakTime.innerHTML = "Break over, back to work."

    }
}


let breakSeconds = 60

function setBreakSeconds() {

    if (breakSeconds > 0) {

        breakSeconds--

        if (breakSeconds < 10) {
            breakTime.innerHTML = `${breakMinutes}:0${breakSeconds}`
        } else {
            breakTime.innerHTML = `${breakMinutes}:${breakSeconds}`
        }
    } else {

        breakSeconds = 60

    }
}

breakTime.innerHTML = `${breakMinutes}:${breakSeconds}`

breakStartBtn.addEventListener('click', () => {

    setInterval('setBreakMinutes()', 60000)
    setInterval('setBreakSeconds()', 1000)

})

function getJournalPosts() {

    fetch(journalPostsURL)
        .then(resp => resp.json())
        .then(json => renderJournalPosts(json))
}


function renderJournalPosts(posts) {

    posts.forEach(post => renderJournalPost(post))

    const createPostBtn = document.createElement('button')
    createPostBtn.setAttribute('id', 'create_post_btn')
    createPostBtn.innerHTML = 'Create new post'
    journalContainer.append(createPostBtn)

    createPostBtn.addEventListener('click', () => {

        journalContainer.innerHTML = ''
        journalFormContainer.style.display = "block"
        journalContainer.append(journalFormContainer)

    })
}


function renderJournalPost(post) {

    const parseDate = dateString => new Date(Date.parse(dateString)).toString().slice(0, 15)

    const fullPostEl = document.createElement('li')
    fullPostEl.setAttribute('id', 'full_post_el')
    fullPostEl.innerHTML = parseDate(post.created_at)

    journalContainer.append(fullPostEl)

    fullPostEl.addEventListener('click', (e) => {

        journalContainer.innerHTML = ''

        const target = e.target
        renderFullJournalPost(post)

        const backBtn = document.createElement('button')
        backBtn.setAttribute('id', 'back_btn')
        backBtn.innerHTML = 'Back'
        journalContainer.append(backBtn)

        const createPostBtn = document.querySelector('#create_post_btn')

        backBtn.addEventListener('click', () => {
            debugger
            journalContainer.innerHTML = ''
            getJournalPosts()
            journalContainer.append(createPostBtn)

        })
    })
}

function renderFullJournalPost(post) {

    const postEl = document.createElement('p')
    postEl.setAttribute('id', 'post_el')
    postEl.dataset.id = post.id
    postEl.innerHTML = post.description

    const editBtn = document.createElement('button')
    editBtn.setAttribute('id', 'edit_btn')
    editBtn.innerHTML = 'Edit'

    postEl.append(editBtn)
    journalContainer.append(postEl)

    editBtn.addEventListener('click', (e) => {
        
        editBtn.disabled = true

        editPostForm(e, post)
    })

}

function editPostForm(e, post) {

    const editForm = document.createElement('form')
    const editInput = document.createElement('textarea')
    const currentPost = e.target.parentNode
    const submitEditBtn = document.createElement('button')

    submitEditBtn.innerHTML = 'Submit'

    editForm.append(editInput)
    editForm.append(submitEditBtn)
    currentPost.append(editForm)

    editForm.addEventListener('submit', (e) => {

        e.preventDefault()

        post.description = editInput.value

        currentPost.innerHTML = post.description
        const editBtn = document.createElement('button')

        editBtn.setAttribute('id', 'edit_btn')

        editBtn.innerHTML = 'Edit'
        currentPost.append(editBtn)

        editBtn.addEventListener('click', (e) => editPostForm(e, post))

        editPostOnServer(post)

    })
}


function editPostOnServer(post) {

    return fetch(journalPostsURL + `/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })
        .then(resp => resp.json())
}


function editPost(post) {


}

updateDateTime()
getDailyQuote()
getTasks()
getJournalPosts()



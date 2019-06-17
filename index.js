//NA - The productivity app that holds you accountable
//One page
//title / No refresh
//todays time and date
//a daily quote - pulled in from an API - you can write your own
//to do list (daily and weekly- tick boxes
//pomodoro timer - takes over the screen with a count down timer (set by user).
////when the user clicks anywhere an alert message asking why the user has stopped working
////and what they need from their phone - thw answer is saved in a list of distractions that can be viewed seperately
//daily journal


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

updateDateTime()
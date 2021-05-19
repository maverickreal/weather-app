console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')

m1.textContent = 'Hang in here...'
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                m1.textContent = 'Sorry, some error occured!'
                m2.textContent = ''
                console.log(data.error)
            } else {
                m1.textContent = data.location
                m2.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})
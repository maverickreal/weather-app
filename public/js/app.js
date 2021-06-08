//console.log('Client side javascript file is loaded!')

//Getting hold of html
const weatherForm = document.querySelector('form'),
    search = document.querySelector('input'),
    m1 = document.querySelector('#m1'),
    m2 = document.querySelector('#m2');

//fetches a random quote array
fetch('https://type.fit/api/quotes').then((res) => res.json()).then((res) => m1.textContent = res[0].text).catch((err) => m1.textContent = 'A moment..');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    //fetch & pass
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                m1.textContent = 'Sorry, some error occured! You should check the provided location.';
                m2.textContent = '';
                //console.log(data.error);
            } else {
                m1.textContent = data.location;
                m2.textContent = data.forecast;
                //console.log(data.location);
                //console.log(data.forecast);
            }
        });
    });
});
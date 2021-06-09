const form = document.getElementById('form')
const input = document.getElementById('input')
const forecastLabel = document.getElementById('forecast_label')
const locationLabel = document.getElementById('location_label')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    forecastLabel.innerText = "Loading..."

    fetch(`/weather?address=${encodeURI(input.value)}`)
    .then(res => res.json())
    .then(res => {
        if(res.error){
            forecastLabel.innerText = res.error
            input.value = ''
        }
        else{
            forecastLabel.innerHTML = res.data
            locationLabel.innerText = res.address
            input.value = ''
        }
    })
})




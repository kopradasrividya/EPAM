const apiKey = "d4a5631477b3419c12b7aadaad6bdb5a";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
    try {
        const resp = await fetch(url(city), {
            mode: "cors"  
        });
        const respData = await resp.json();

        if (respData.cod === '404') {
            displayErrorMessage("City not found. Please check the input😕.");
        } else {
            addWeatherToPage(respData);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        displayErrorMessage("An error occurred while fetching weather data.");
    }
}

function displayErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error');
    errorDiv.innerText = message;
    errorDiv.style.color = 'red';
    errorDiv.style.marginBottom = '2em';
    main.innerHTML = "";
    main.appendChild(errorDiv);
}
function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
            ${temp}°C
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        </h2>
        <small>${data.weather[0].main}</small>
    `;

    main.innerHTML = "";
    main.appendChild(weather);
}

function Ktoc(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    } else {
        displayErrorMessage("Please enter a city name.");
    }
});

const apiKey = "d4a5631477b3419c12b7aadaad6bdb5a";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
    try {
        const resp = await fetch(url(city), {
            origin: "cros"
        });
        const respData = await resp.json();

        if (respData.cod === '404') {
            displayErrorMessage("City not found. Please check the input.");
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

    main.innerHTML = "";
    main.appendChild(errorDiv);
}

function handleSubmit() {
    var searchInput = document.getElementById('search');
    var inputValue = searchInput.value.trim();

    if (!inputValue) {
        displayErrorMessage("Oops! It does not exist. Please check the input.");
        return false; // Prevent form submission
    }

    // Your code for handling the form submission goes here

    return true; // Allow form submission
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

    // cleanup
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

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "5368a9d40892546ae72d6e0b10fd248a";



weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {

            const weatherData = await getWeatherData(city);
            // console.log(weatherData);
            displayWeatherInfo(weatherData);

        }
        catch (error) {
            console.log(error);
            displayEror(error);
        }
    }
    else {
        displayEror("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiurl);


    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();

}

function displayWeatherInfo(data) {

    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";


    const cityDisplay = document.createElement("h1");
    const temptDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");


    cityDisplay.textContent = city;
    temptDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id)

    cityDisplay.classList.add("cityDisplay")
    temptDisplay.classList.add("temptDisplay")
    humidityDisplay.classList.add("humidityDisplay")
    descDisplay.classList.add("descDisplay")
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(temptDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}


function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";

        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";

        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";

        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800 ):
            return "☀️";
        case (weatherID >= 801 && weatherId < 810):
            return "🌥️";
        default:
            return "🛸"

    }
}

function displayEror(message) {

    const errorDisplay = document.createElement("P");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}
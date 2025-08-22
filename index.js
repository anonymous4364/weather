const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const celsius = document.getElementById("celsius");
const fahrenheit = document.getElementById("fahrenheit");
const apiKey = "bfc43e5bd26b4cd17b268c7a584e0b7e";

let weatherData;

// form submission
weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    // get the value of user input
    const city = cityInput.value;

    if(city){
        try{
            weatherData = await getWeatherData(city);
            displayWeatherData(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("please enter a city");
    }
});

celsius.addEventListener("click", () =>{
    if(weatherData) displayWeatherData(weatherData);
});

fahrenheit.addEventListener("click", () =>{
    if(weatherData) displayWeatherData(weatherData);
});

async function getWeatherData(city){
    // fetch data 
    const apiUrL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrL);
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    // return data
    return await response.json();
}

function displayWeatherData(data) {
    const { 
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }] 
    } = data;

    // Clear previous content
    card.textContent = "";
    card.style.display = "flex";

    // Create elements
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    // Set content
    cityDisplay.textContent = city;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    if(celsius.checked){
        const c = temp - 273.15;
        tempDisplay.textContent = `${c.toFixed(1)}°C`;
    }
    else if(fahrenheit.checked){
        const f = (temp - 273.15) * 9 / 5 + 32;
        tempDisplay.textContent = `${f.toFixed(1)}°F`;
    }

    // Add Classes
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    // Append elements to card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300): return "🌩️";
        case(weatherId >= 300 && weatherId < 400): return "🌦️";
        case(weatherId >= 500 && weatherId < 600): return "🌧️";
        case(weatherId >= 600 && weatherId < 700): return "❄️";
        case(weatherId >= 700 && weatherId < 800): return "🌫️";
        case(weatherId >= 200 && weatherId < 300): return "🌩️";
        case(weatherId === 800): return "☀️";
        case(weatherId >= 801 && weatherId < 900): return "☁️";
        default: return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

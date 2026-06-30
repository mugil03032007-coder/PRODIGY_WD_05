const apiKey = "209abd9d6b8e4b0a5f5f39ee6af29bfe";

async function getWeather() {
    const city = document.getElementById("city").value.trim();

    if (!city) {
        alert("Enter City Name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 404) {
            alert("City Not Found");
            return;
        }

        if (data.cod !== 200) {
            alert("Error: " + data.message);
            return;
        }

        document.getElementById("weather").style.display = "block";

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temp").textContent = data.main.temp + " °C";
        document.getElementById("condition").textContent = data.weather[0].main;
        document.getElementById("humidity").textContent = "Humidity : " + data.main.humidity + "%";
        document.getElementById("wind").textContent = "Wind Speed : " + (data.wind.speed * 3.6).toFixed(1) + " km/h";
        document.getElementById("icon").src =
            "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

    } catch (error) {
        alert("Something went wrong");
        console.error(error);
    }
}

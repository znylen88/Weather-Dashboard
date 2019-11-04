// Create event listener for button click

var searchForm = document.getElementById("searchForm");
var searchInput = document.getElementById("searchInput");

searchForm.addEventListener("submit", function (event) {

    if (searchInput.value === "") {
        return null;

    }

    localStorage.setItem("City", (searchInput.value));

});

// Current Date

// function stoppedTyping() {
//     if (searchInput.value == "") {
//     document.getElementById('start_button').disabled = false;
// } else {
//     document.getElementById('start_button').disabled = true;

var currentDate = moment().format("MMM Do YY");

// API key

var APIKey = "72b3dd6d5427d95c4537e74e9191ff5e";
var savedCity = localStorage.getItem("City");

// Running AJAX current weather call to the OpenWeatherMap API

$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + savedCity + ",usa&appid=" + APIKey,
    method: "GET"
})

    .then(function (response) {

        console.log(response);

        // Append city name, current date, and weather description

        $("#cityName").text(response.name + " (" + currentDate + ")");

        if ((response.weather[0].main) === "Clouds") {
            $("#cityName").append(" " + '<i class="fas fa-cloud">');
        }
        if ((response.weather[0].main) === "Clear") {
            $("#cityName").append(" " + '<i class="fas fa-sun">');
        }
        if ((response.weather[0].main) === "Rain") {
            $("#cityName").append(" " + '<i class="fas fa-cloud-rain">');
        }
        if ((response.weather[0].main) === "Snow") {
            $("#cityName").append(" " + '<i class="far fa-snowflake">');
        }
        if ((response.weather[0].main) === "Fog") {
            $("#cityName").append(" " + '<i class="fas fa-smog">');
        }
        if ((response.weather[0].main) === "Mist") {
            $("#cityName").append(" " + '<i class="fas fa-smog">');
        }

        // Grab current temperature info and convert to Farenheit and round to one decimal place

        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        var roundedTempF = Math.round(tempF * 10) / 10;

        // Append info to the current weather divs

        $("#temperature").text("Temperature: " + roundedTempF + " °F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#uvIndex").text("UV Index: ");

        var newDiv = $("<div>")
        $("#innerContainer").append(newDiv);
        newDiv.text(savedCity);
        newDiv.css({ "height": "auto", "line-height": "2.5", "font-size": "30px" });

        var cityLat = response.coord.lat;
        var cityLng = response.coord.lon;

        // Running AJAX UV index call to the OpenWeatherMap API

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLng,
            method: "GET"
        })

            .then(function (response) {

                // Append UV index values to the current weather div

                $("#uvIndex").text("UV Index: " + response.value);

                console.log(response);

            });

    });

// Running AJAX 5 day forecast call to the OpenWeatherMap API

$.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + savedCity + ",usa&appid=" + APIKey,
    method: "GET"
})

    .then(function (response) {

        console.log(response);

        // Day 1 of 5-day forecast weather and text appending

        for (var i = 0; i < response.list.length - 32; i++) {

            var datePlus1 = moment().add(1, 'days').format("MMM Do YY");
            var forecastTempDay1F = (response.list[i].main.temp - 273.15) * 1.80 + 32;
            var roundedDay1 = Math.round(forecastTempDay1F * 10) / 10;
            var timeSlice = response.list[i].dt_txt.slice(11);

            if (timeSlice === "18:00:00") {

                $("#weatherBoxDate1").text(datePlus1);
                $("#weatherBoxTemp1").text("Temp: " + roundedDay1 + " °F");
                $("#weatherBoxHum1").text("Humidity: " + response.list[i].main.humidity + "%");

                if ((response.list[i].weather[0].main) === "Clouds") {
                    $("#weatherDescription1").append(" " + '<i class="fas fa-cloud">');
                }
                if ((response.list[i].weather[0].main) === "Clear") {
                    $("#weatherDescription1").append(" " + '<i class="fas fa-sun">');
                }
                if ((response.list[i].weather[0].main) === "Rain") {
                    $("#weatherDescription1").append(" " + '<i class="fas fa-cloud-rain">');
                }
                if ((response.list[i].weather[0].main) === "Snow") {
                    $("#weatherDescription1").append(" " + '<i class="far fa-snowflake">');
                }
                if ((response.list[i].weather[0].main) === "Fog") {
                    $("#weatherDescription1").append(" " + '<i class="fas fa-smog">');
                }
                if ((response.list[i].weather[0].main) === "Mist") {
                    $("#weatherDescription1").append(" " + '<i class="fas fa-smog">');
                }
            }
        }

        // Day 2 of 5-day forecast weather and text appending

        for (var i = 8; i < response.list.length - 24; i++) {

            var datePlus2 = moment().add(2, 'days').format("MMM Do YY");
            var forecastTempDay2F = (response.list[i].main.temp - 273.15) * 1.80 + 32;
            var roundedDay2 = Math.round(forecastTempDay2F * 10) / 10;
            var timeSlice = response.list[i].dt_txt.slice(11);

            if (timeSlice === "18:00:00") {

                $("#weatherBoxDate2").text(datePlus2);
                $("#weatherBoxTemp2").text("Temp: " + roundedDay2 + " °F");
                $("#weatherBoxHum2").text("Humidity: " + response.list[i].main.humidity + "%");

                if ((response.list[i].weather[0].main) === "Clouds") {
                    $("#weatherDescription2").append(" " + '<i class="fas fa-cloud">');
                }
                if ((response.list[i].weather[0].main) === "Clear") {
                    $("#weatherDescription2").append(" " + '<i class="fas fa-sun">');
                }
                if ((response.list[i].weather[0].main) === "Rain") {
                    $("#weatherDescription2").append(" " + '<i class="fas fa-cloud-rain">');
                }
                if ((response.list[i].weather[0].main) === "Snow") {
                    $("#weatherDescription2").append(" " + '<i class="far fa-snowflake">');
                }
                if ((response.list[i].weather[0].main) === "Fog") {
                    $("#weatherDescription2").append(" " + '<i class="fas fa-smog">');
                }
                if ((response.list[i].weather[0].main) === "Mist") {
                    $("#weatherDescription1").append(" " + '<i class="fas fa-smog">');
                }
            }
        }

        // Day 3 of 5-day forecast weather and text appending

        for (var i = 16; i < response.list.length - 16; i++) {

            var datePlus3 = moment().add(3, 'days').format("MMM Do YY");
            var forecastTempDay3F = (response.list[i].main.temp - 273.15) * 1.80 + 32;
            var roundedDay3 = Math.round(forecastTempDay3F * 10) / 10;
            var timeSlice = response.list[i].dt_txt.slice(11);

            if (timeSlice === "18:00:00") {

                $("#weatherBoxDate3").text(datePlus3);
                $("#weatherBoxTemp3").text("Temp: " + roundedDay3 + " °F");
                $("#weatherBoxHum3").text("Humidity: " + response.list[i].main.humidity + "%");

                if ((response.list[i].weather[0].main) === "Clouds") {
                    $("#weatherDescription3").append(" " + '<i class="fas fa-cloud">');
                }
                if ((response.list[i].weather[0].main) === "Clear") {
                    $("#weatherDescription3").append(" " + '<i class="fas fa-sun">');
                }
                if ((response.list[i].weather[0].main) === "Rain") {
                    $("#weatherDescription3").append(" " + '<i class="fas fa-cloud-rain">');
                }
                if ((response.list[i].weather[0].main) === "Snow") {
                    $("#weatherDescription3").append(" " + '<i class="far fa-snowflake">');
                }
                if ((response.list[i].weather[0].main) === "Fog") {
                    $("#weatherDescription3").append(" " + '<i class="fas fa-smog">');
                }
                if ((response.list[i].weather[0].main) === "Mist") {
                    $("#weatherDescription3").append(" " + '<i class="fas fa-smog">');
                }
            }
        }

        // Day 4 of 5-day forecast weather and text appending

        for (var i = 24; i < response.list.length - 8; i++) {

            var datePlus4 = moment().add(4, 'days').format("MMM Do YY");
            var forecastTempDay4F = (response.list[i].main.temp - 273.15) * 1.80 + 32;
            var roundedDay4 = Math.round(forecastTempDay4F * 10) / 10;
            var timeSlice = response.list[i].dt_txt.slice(11);

            if (timeSlice === "18:00:00") {

                $("#weatherBoxDate4").text(datePlus4);
                $("#weatherBoxTemp4").text("Temp: " + roundedDay4 + " °F");
                $("#weatherBoxHum4").text("Humidity: " + response.list[i].main.humidity + "%");

                if ((response.list[i].weather[0].main) === "Clouds") {
                    $("#weatherDescription4").append(" " + '<i class="fas fa-cloud">');
                }
                if ((response.list[i].weather[0].main) === "Clear") {
                    $("#weatherDescription4").append(" " + '<i class="fas fa-sun">');
                }
                if ((response.list[i].weather[0].main) === "Rain") {
                    $("#weatherDescription4").append(" " + '<i class="fas fa-cloud-rain">');
                }
                if ((response.list[i].weather[0].main) === "Snow") {
                    $("#weatherDescription4").append(" " + '<i class="far fa-snowflake">');
                }
                if ((response.list[i].weather[0].main) === "Fog") {
                    $("#weatherDescription4").append(" " + '<i class="fas fa-smog">');
                }
                if ((response.list[i].weather[0].main) === "Mist") {
                    $("#weatherDescription4").append(" " + '<i class="fas fa-smog">');
                }
            }
        }

        // Day 5 of 5-day forecast weather and text appending

        for (var i = 32; i < response.list.length; i++) {

            var datePlus5 = moment().add(5, 'days').format("MMM Do YY");
            var forecastTempDay5F = (response.list[i].main.temp - 273.15) * 1.80 + 32;
            var roundedDay5 = Math.round(forecastTempDay5F * 10) / 10;
            var timeSlice = response.list[i].dt_txt.slice(11);

            if (timeSlice === "18:00:00") {

                $("#weatherBoxDate5").text(datePlus5);
                $("#weatherBoxTemp5").text("Temp: " + roundedDay5 + " °F");
                $("#weatherBoxHum5").text("Humidity: " + response.list[i].main.humidity + "%");

                if ((response.list[i].weather[0].main) === "Clouds") {
                    $("#weatherDescription5").append(" " + '<i class="fas fa-cloud">');
                }
                if ((response.list[i].weather[0].main) === "Clear") {
                    $("#weatherDescription5").append(" " + '<i class="fas fa-sun">');
                }
                if ((response.list[i].weather[0].main) === "Rain") {
                    $("#weatherDescription5").append(" " + '<i class="fas fa-cloud-rain">');
                }
                if ((response.list[i].weather[0].main) === "Snow") {
                    $("#weatherDescription5").append(" " + '<i class="far fa-snowflake">');
                }
                if ((response.list[i].weather[0].main) === "Fog") {
                    $("#weatherDescription5").append(" " + '<i class="fas fa-smog">');
                }
                if ((response.list[i].weather[0].main) === "Mist") {
                    $("#weatherDescription5").append(" " + '<i class="fas fa-smog">');
                }

            }
        }
    });

// Create event listener for button click

var searchForm = document.getElementById("searchForm");
var searchInput = document.getElementById("searchInput");

searchForm.addEventListener("submit", function (event) {
    localStorage.setItem("City", (searchInput.value));
});

// Current Date

var currentDate = moment().format("dddd h:mm A");

// API key

var APIKey = "72b3dd6d5427d95c4537e74e9191ff5e";
var savedCity = localStorage.getItem("City");

// Running AJAX current weather call to the OpenWeatherMap API

$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + savedCity + "&units=imperial&appid=" + APIKey,
    method: "GET"
})

    .then(function (response) {

        console.log(response);

        // Append city name, current date, and weather description

        $("#cityName").text(response.name);
        $("#date").text(currentDate);

        // Grab current temperature info and convert to Farenheit and round to one decimal place
        var roundedTempF = Math.round(response.main.temp);
        var roundedWind = Math.round(response.wind.speed);
        var weatherDescription = response.weather[0].main;
        var iconcode = response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        // Append info to the current weather divs

        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#windSpeed").text("Wind Speed: " + roundedWind + " MPH");
        $('#weather').text(weatherDescription);
        $('#wicon').attr('src', iconurl);
        $('#icon').append(`${roundedTempF}°`);
        $('#icon').css({
            "font-size":"72px",
            "font-weight":"bolder" 
        });


        var cityLat = response.coord.lat;
        var cityLng = response.coord.lon;

        // Running AJAX UV index call to the OpenWeatherMap API

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLng,
            method: "GET"
        })

            .then(function (response) {

                console.log(response);

                // Append UV index values to the current weather div

                $("#uvIndex").text("UV Index: " + response.value);
            });

    });

// Running AJAX 5 day forecast call to the OpenWeatherMap API

$.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + savedCity + "&units=imperial&appid=" + APIKey,
    method: "GET"
})

    .then(function (response) {

        console.log(response);

        // Day 1 of 5-day forecast weather and text appending

        for (var i = 0; i < response.list.length - 32; i++) {

            var datePlus1 = moment().add(1, 'days').format("dddd");
            var forecastTempDay1 = response.list[i].main.temp;
            var roundedDay1 = Math.round(forecastTempDay1);
            var iconcode1 = response.list[i].weather[0].icon;
            var iconurl1 = "http://openweathermap.org/img/w/" + iconcode1 + ".png";
            var timeSlice = response.list[i].dt_txt.slice(11);

            if (timeSlice === "18:00:00") {

                $("#weatherBoxDate1").text(datePlus1);
                $('#wicon1').attr('src', iconurl1);
                $("#weatherBoxTemp1").text(roundedDay1 + "°");
                $("#weatherBoxHum1").text("Humidity: " + response.list[i].main.humidity + "%");
            }
        }

        // Day 2 of 5-day forecast weather and text appending

        for (var i = 8; i < response.list.length - 24; i++) {

            var datePlus2 = moment().add(2, 'days').format("dddd");
            var forecastTempDay2 = (response.list[i].main.temp);
            var roundedDay2 = Math.round(forecastTempDay2);
            var iconcode2 = response.list[i].weather[0].icon;
            var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";
            var timeSlice = response.list[i].dt_txt.slice(11);

            if (timeSlice === "18:00:00") {

                $("#weatherBoxDate2").text(datePlus2);
                $("#weatherBoxTemp2").text(roundedDay2 + "°");
                $("#weatherBoxHum2").text("Humidity: " + response.list[i].main.humidity + "%");
                $('#wicon2').attr('src', iconurl2);
            }
        }

        // Day 3 of 5-day forecast weather and text appending

        for (var i = 16; i < response.list.length - 16; i++) {

            var datePlus3 = moment().add(3, 'days').format("dddd");
            var forecastTempDay3 = (response.list[i].main.temp);
            var roundedDay3 = Math.round(forecastTempDay3);
            var iconcode3 = response.list[i].weather[0].icon;
            var iconurl3 = "http://openweathermap.org/img/w/" + iconcode3 + ".png";
            var timeSlice = response.list[i].dt_txt.slice(11);

            if (timeSlice === "18:00:00") {

                $("#weatherBoxDate3").text(datePlus3);
                $("#weatherBoxTemp3").text(roundedDay3 + "°");
                $("#weatherBoxHum3").text("Humidity: " + response.list[i].main.humidity + "%");
                $('#wicon3').attr('src', iconurl3);
            }
        }

        // Day 4 of 5-day forecast weather and text appending

        for (var i = 24; i < response.list.length - 8; i++) {

            var datePlus4 = moment().add(4, 'days').format("dddd");
            var forecastTempDay4 = (response.list[i].main.temp);
            var roundedDay4 = Math.round(forecastTempDay4);
            var iconcode4 = response.list[i].weather[0].icon;
            var iconurl4 = "http://openweathermap.org/img/w/" + iconcode4 + ".png";
            var timeSlice = response.list[i].dt_txt.slice(11);

            if (timeSlice === "18:00:00") {

                $("#weatherBoxDate4").text(datePlus4);
                $("#weatherBoxTemp4").text(roundedDay4 + "°");
                $("#weatherBoxHum4").text("Humidity: " + response.list[i].main.humidity + "%");
                $('#wicon4').attr('src', iconurl4);
            }
        }

        // Day 5 of 5-day forecast weather and text appending

        for (var i = 32; i < response.list.length; i++) {

            var datePlus5 = moment().add(5, 'days').format("dddd");
            var forecastTempDay5 = (response.list[i].main.temp);
            var roundedDay5 = Math.round(forecastTempDay5);
            var iconcode5 = response.list[i].weather[0].icon;
            var iconurl5 = "http://openweathermap.org/img/w/" + iconcode5 + ".png";
            var timeSlice = response.list[i].dt_txt.slice(11);

            if (timeSlice === "18:00:00") {

                $("#weatherBoxDate5").text(datePlus5);
                $("#weatherBoxTemp5").text(roundedDay5 + "°");
                $("#weatherBoxHum5").text("Humidity: " + response.list[i].main.humidity + "%");
                $('#wicon5').attr('src', iconurl5);
            }
        }
    });

    // document.addEventListener('DOMContentLoaded', function() {
    //     var elems = document.querySelectorAll('.dropdown-trigger');
    //     var instances = M.Dropdown.init(elems, options);
    //   });
    
    //   // Or with jQuery
    
    //   $('.dropdown-trigger').dropdown();
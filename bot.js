/*
$$\   $$\ $$\     $$\       $$\   $$\          $$\            $$\                 $$\
$$ |  $$ |\$$\   $$  |      $$ | $$  |         $$ |           \__|                $$ |
$$ |  $$ | \$$\ $$  /       $$ |$$  / $$$$$$\  $$ |$$\    $$\ $$\ $$$$$$$\        $$ |      $$$$$$\   $$$$$$\
$$$$$$$$ |  \$$$$  /        $$$$$  / $$  __$$\ $$ |\$$\  $$  |$$ |$$  __$$\       $$ |     $$  __$$\ $$  __$$\
$$  __$$ |   \$$  /         $$  $$<  $$$$$$$$ |$$ | \$$\$$  / $$ |$$ |  $$ |      $$ |     $$$$$$$$ |$$$$$$$$ |
$$ |  $$ |    $$ |          $$ |\$$\ $$   ____|$$ |  \$$$  /  $$ |$$ |  $$ |      $$ |     $$   ____|$$   ____|
$$ |  $$ |    $$ |$$\       $$ | \$$\\$$$$$$$\ $$ |   \$  /   $$ |$$ |  $$ |      $$$$$$$$\\$$$$$$$\ \$$$$$$$\
\__|  \__|    \__|\__|      \__|  \__|\_______|\__|    \_/    \__|\__|  \__|      \________|\_______| \_______|
*/
// -------------------------------INTRODUCTION SPEECH-------------------------------
var bot_name = "Oxygen";
var introduction = "Hi, my name is " + bot_name + ". What can I help you today?";
// -------------------------------API KEY-------------------------------
var openweathermap_api = ""  // openweathermap.org API token
var fixer_api = ""  // fixer.io API token
var newsapi_api = ""  // newsapi_org API token
// -------------------------------SPEECH API-------------------------------
var synthesis = window.speechSynthesis;
SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
var recognition = new SpeechRecognition();
recognition.lang = "en-US";

function displayItemHTML(message) {
  document.getElementById("textBlock").innerHTML = message;
}

function text_to_speech(message) {
  var utterance = new SpeechSynthesisUtterance(message);
  utterance.addEventListener("start", function(event) {
    console.log("We have started uttering this speech: " + event.utterance.text);
    displayItemHTML(message);
  });
  utterance.addEventListener("end", function(event) {
    console.log("Utterance has finished being spoken after " + event.elapsedTime + "milliseconds.");
  });
  synthesis.speak(utterance);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function speech_to_text() {
  var result;
  recognition.addEventListener("start", function(event) {
    console.log("Speech recognition has started.");
    displayItemHTML("I am listening");
  };
  recognition.addEventListener("result", function(event) {
    result = event.results[0][0].transcript;
    console.log("You said: ", result);
    recognition.stop();
  };
  recognition.addEventListener("end", function(event) {
    console.log("Speech recognition has stopped.");
  };
  recognition.start();
  /*if (window.hasOwnProperty("webkitSpeechRecognition")) {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = function(event) {
      var text = event.results[0][0].transcript;
      document.getElementById("textBlock").innerHTML = text;
      recognition.stop();
      console.log(text);
      return text
    };
    recognition.onerror = function(event) {
      document.getElementById("textBlock").innerHTML = "Error";
      recognition.stop();
    };
  }*/
  return result;
}

function jokes() {
  var jokes = [
          "I never make mistakes. I thought I did once, but I was wrong.",
          "I can totally keep secrets. It's the people I tell them to that can't.",
          "What do you call a cow with two legs? Lean beef.",
          "What is the difference between a snowman and a snowwoman? Snowballs."
  ];
  var response = jokes[Math.floor(Math.random() * jokes.length)];
  text_to_speech(response);
}

function get_locationAndIP() {
  var settings = {
    "async": false,
    "url": "http://ip-api.com/json",
    "method": "GET"
  };
  var IPObject;
  $.ajax(settings).done(function (json_data) {
    IPObject = json_data;
  });
  // console.log(IPObject);
  return IPObject;
}

function weather() {
  IPObject = get_locationAndIP();
  var lat = IPObject.lat;
  var lon = IPObject.lon;
  var ip = IPObject.query;
  var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + openweathermap_api;
  var settings = {
    "async": false,
    "url": url,
    "method": "GET"
  };
  var weatherObject;
  $.ajax(settings).done(function (json_data) {
    weatherObject = json_data;
  });
  // console.log(weather.Object);
  var temperature = Math.round((weatherObject.main.temp - 273.15) * 10) / 10;
  var description = weatherObject.weather[0].description;
  var area = weatherObject.name;
  var response = "The temperature is now " + temperature + " degree Celsius and " + description + " in " + area;
  // console.log(response);
  text_to_speech(response);
}

function currency() {
  var url = "http://data.fixer.io/api/latest?access_key=" + fixer_api;
  var settings = {
    "async": false,
    "url": url,
    "method": "GET"
  };
  var currencyObject;
  $.ajax(settings).done(function (json_data) {
    currencyObject = json_data;
  });
  // console.log(currencyObject);
  var base_currency = "European dollar";
  var convert_currency = "US dollars";  // default conversion: EUR to USD
  var conversion_rate = currencyObject.rates.USD;
  var response = "One dollar of " + base_currency + " is now " + conversion_rate + " " + convert_currency;
  // console.log(response);
  text_to_speech(response);
}

function news() {
  var source = "the-new-york-times";
  var area = "us";  // default area: US
  var sURL = "https://newsapi.org/v2/top-headlines?sources=" + source + "&apiKey=" + newsapi_api;
  // var cURL = "https://newsapi.org/v2/top-headlines?country=" + area + "&apiKey=" + newsapi_api;
  var settings = {
    "async": false,
    "url": sURL,
    "method": "GET"
  };
  var newsObject;
  $.ajax(settings).done(function (json_data) {
    newsObject = json_data;
  });
  // console.log(newsObject);
  var total_result = newsObject.totalResults;
  var result = Math.floor(Math.random() * total_result);
  // console.log(result);
  var response_title = newsObject.articles[result].title;
  // console.log(response_title);
  var response_description = newsObject.articles[result].description;
  // console.log(response_description);
  text_to_speech(response_title);
  text_to_speech(response_description);
}

function main_loop() {
  var command;
  var flag = true;
  text_to_speech(introduction);
  while (flag) {
    command = speech_to_text();
    if (command === "fun") {
      jokes();
    }
    else if (command === "weather") {
      weather();
    }
    else if (command === "currency") {
      currency();
    }
    else if (command === "news") {
      news();
    }
    else if (command === "stop") {
      flag = false;
      break;
    }
    else {
      var error_message = "Sorry, I don't understand. " + command;
      text_to_speech(error_message);
    }
    text_to_speech("What can I do for you?");
  }
}

main_loop();

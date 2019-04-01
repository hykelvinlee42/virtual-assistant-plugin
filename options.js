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
var openweathermap = document.getElementById("API_openweathermap").value;  // openweathermap.org API token
var fixer = document.getElementById("API_fixer").value;  // fixer.io API token
var newsapi = document.getElementById("API_newsapi").value;  // newsapi_org API token

var button = document.getElementById("saveButton");
Button.addEventListener("click", function() {
  chrome.storage.local.set({"openweathermap" : openweathermap, "fixer": fixer, "newsapi": newsapi}, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
    else {
      console.log("Saved");
    }
  });
});

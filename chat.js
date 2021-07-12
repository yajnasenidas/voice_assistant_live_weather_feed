const voice = document.querySelector(".voice");
const voice2text = document.querySelector(".voice2text");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recorder = new SpeechRecognition();

function addHumanText(text){
	const chatContainer = document.createElement("div");
    chatContainer.classList.add("chat-Container");

const chatBox = document.createElement("p");
chatBox.classList.add("voice2text"); 

const chatText = document.createTextNode(text);
chatBox.appendChild(chatText);

chatContainer.appendChild(chatBox);
return chatContainer;

}

function addBotText(text){
	const chatContainer1 = document.createElement("div");
    chatContainer1.classList.add("chat-Container");
    chatContainer1.classList.add("darker");

const chatBox1 = document.createElement("p");
chatBox1.classList.add("voice2text"); 

const chatText1 = document.createTextNode(text);
chatBox1.appendChild(chatText1);

chatContainer1.appendChild(chatBox1);
return chatContainer1;

}

function botVoice(message){
	const speech = new SpeechSynthesisUtterance();
	speech.text = "Sorry, I don't understand this";

	if (message.includes('how are you')) {
		speech.text = " I am fine, Thank You. How are You?"
	}

	if (message.includes('hello')) {
		speech.text = " hello there, I am Robbo. Y's new chatbot. What's Up?"
	}

	if (message.includes('hey')) {
		speech.text = "hello, I am Robbo. Y's new chatbot. How's it going?";
	}

	if (message.includes('fine')) {
		speech.text = "Nice to hear that. How can I help you?";
	}
	if (message.includes('dance')) {
		speech.text = "Check Youtube!";
	}

	if (message.includes('sing')) {
		speech.text = "Check Youtube";
	}

	if (message.includes('weather')) {
		speech.text = "Please enter your location on the search bar and check the weather";
	}
    
    

	if (message.includes('thank you')) {
		speech.text = "You are welcome & have a good day";
	}

	if (message.includes('good morning')) {
		speech.text = "Good Morning to you too";
	}

	if (message.includes('good afternoon')) {
		speech.text = "Good Afternoon to you too";
	}

	if (message.includes('good evening')) {
		speech.text = "Good Evening to you too";
	}

	if (message.includes('good night')) {
		speech.text = "Good Night & Sweet Dreams";
	}

	if (message.includes('okay')) {
		speech.text = "Thank You & have a good day";
	}

	if (message.includes('amazing')) {
		speech.text = "Thanks!";
	}

	if (message.includes('fantastic')) {
		speech.text = "Thanks!";
	}

	if (message.includes('name')) {
		speech.text = "Robbo- Y's chatbot!";
	}

	if (message.includes('bye')) {
		speech.text = "bye-bye, take care and stay safe";
	}

	

	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 1;
	window.speechSynthesis.speak(speech);
	var element = document.getElementById("container");
	element.appendChild(addBotText(speech.text));
}



recorder.onstart = () => {
	console.log("Voice Activated");
};

recorder.onresult = (event) => {
	//console.log(event);
	const resultIndex = event.resultIndex;
	const transcript = event.results[resultIndex][0].transcript;
	//voice2text.textContent = transcript;
	var element = document.getElementById("container");
	element.appendChild(addHumanText(transcript));
	botVoice(transcript);
}
voice.addEventListener('click', () =>{
	recorder.start();
});


let weather = {
	"apiKey": "e4574b113ded486407c039179b44dcec",
	fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Maldives");
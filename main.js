function successFunction(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  console.log('Your latitude is :' + lat + ' and longitude is ' + long);
}

console.log(successFunction);

// const iconElement = document.createElement("i");
// iconElement.classList.add("fas", "fa-cloud-showers-heavy");
const iconContainer = document.getElementById('icon-container');
// iconContainer.appendChild(iconElement);

const apiKey = 'b3a474b4d5f1701a20aa1ced20b63219';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');


async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if(response.status == 404){
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }else{
    var data = await response.json();


    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°F';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + 'mph';
    const weatherDescriptor = data.weather[0].main;

    const iconMap = {
      Clouds: 'fa-cloud',
      Rain: 'fa-showers-heavy',
      Clear: 'fa-sun',
      Snow: 'fa-snowflake',
      Mist: 'fa-cloud-sun',
      Drizzle: 'fa-cloud-sun-rain',
  
    };
  
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  
    const iconClass = iconMap[weatherDescriptor]; // equilivant to iconMap.Clouds ===> 'fa-clouds'
  
    iconContainer.innerHTML = `
      <i class="fa-solid fa-xl ${iconClass}"></i>
    `;
  }
  
}


searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener('keydown', (e) => {  
  if(e.key === 'Enter'){
    checkWeather(searchBox.value);
  }
}); 
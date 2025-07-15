
const apiKey = "8b1786cea3f4480baa9214214251407";

const searchInput = document.querySelector("#findLocation");
searchInput.addEventListener('input' , function(e){
    console.log(e.target.value);
    getWeather(e.target.value)
})


async function getWeather(cityName){
    try {
     if(cityName.length > 2){
           const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=3&key=${apiKey}`)
        let data = await response.json();
        console.log(data);
        displayData(data)
     }
       
        
    } catch (error) {
        console.log(error);
        
    }
}


function displayData(weatherData){
   console.log(weatherData.forecast.forecastday);
   let forecastList = weatherData.forecast.forecastday;
   let blackBox = "";
   for (let i = 0; i < forecastList.length; i++) {
    let dayDate = new Date(forecastList[i].date);
    let dayName = dayDate.toLocaleString('en-us' , {weekday:"long"});
    let dayNum = dayDate.getDate();
    let monthName = dayDate.toLocaleString('en-us' , {month:"long"});
    let location = weatherData.location.name;

    blackBox+=` <div class="col-lg-4 col-md-6 mb-4">
        <div class="forecast-card p-4 rounded-3 ${i==1?'bg-custom-two':'bg-custom'} text-white h-100">
        <div class=" ${i ==0? ' d-flex justify-content-between mb-2' : 'text-center'}">
        <div>${dayName}</div>
        <div>${i==0? dayNum+" "+monthName : ""}</div>
        </div>
        <div>${i==0? location : ""}</div>
        <div class="${i==0? 'd-flex flex-column align-items-start' : 'd-flex flex-column align-items-center'}">
            <div class="fs-1"><span id="todayTemp">${forecastList[i].day.maxtemp_c}
            </span><sup>o</sup>C </div> 
            <div class="fs-5 ${i==0? "d-none":'d-block'}"><span id="todayTemp">${i==0? "" :forecastList[i].day.mintemp_c}
            </span><sup>o</sup>C </div>

<div class="">
        <img src="https:${forecastList[i].day.condition.icon}"  alt="" class='w-100'>

</div>               
        
        <div class="text-primary order-3" id="todayCondition">${forecastList[i].day.condition.text}</div>
        </div>
    ${i==0? `<img src="./images/imgi_3_icon-umberella@2x.png" class="w-20 me-1" alt=""><span id="humidity">${weatherData.current.humidity}%</span>
        <img src="./images/imgi_4_icon-wind@2x.png" class="w-20 me-1" alt=""><span id="wind-speed">${weatherData.current.wind_kph}km/h</span>
        <img src="./images/imgi_5_icon-compass@2x.png" class="w-20 me-1" alt=""><span id="wind-dir">${weatherData.current.wind_dir}</span>` : ""}
    
    </div>
    </div>`

}
document.getElementById('row-data').innerHTML = blackBox;
}


if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(function(position){
    console.log(position)
    let lat = position.coords.latitude;
    let lon = position.coords.longitude
    getWeather(`${lat},${lon}`)
})
}






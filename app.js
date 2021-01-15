const ApiKey = "e73e542b96f389ffe6e1cf4d2474b470";
let long;
let lat;
let prepend = "https://cors-anywhere.herokuapp.com/"
let city = document.querySelector('.city');
let status = document.querySelector('.state');
let temp = document.querySelector('.degree');
let search = document.querySelector('#search')
let searchS = document.querySelector('.searchS')
let pressureS = document.querySelector('.pressure');

window.addEventListener('load', function() {

	

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function (pos) {
			long = pos.coords.longitude;
			lat = pos.coords.latitude;
			let weather = prepend+`api.openweathermap.org/data/2.5/weather?lat=${lat}&units=metric&lon=${long}&appid=${ApiKey}&lang=pl`
			

			fetch(weather)
				.then(function(response)  {
				return response.json();
				})
				.then(function(data) {
				console.log(data.main.temp);
				console.log(data);
				temp.innerHTML = Math.round(data.main.temp) + '&#8451;'
				city.innerHTML = data.name;
				status.lastChild.src = `http:openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
				pressureS.innerHTML = data.main.pressure + ' hPa'
			})
			
		});
	}  else {
 	let error  ="Geolocation not allowed";
 }
});


searchS.addEventListener('keypress', function(e) {
	if(e.key === 'Enter'){
		let cityNow = searchS.value;
		let weather = prepend+`api.openweathermap.org/data/2.5/weather?q=${cityNow}&units=metric&appid=${ApiKey}`
	
			fetch(weather)
				.then(function(response)  {
				return response.json();
				})
				.then(function(data) {
				console.log(data.main.temp);
				console.log(data);
				temp.innerHTML = Math.round(data.main.temp) + '&#8451;'
				city.innerHTML = data.name;
				status.lastChild.src = `http:openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
			})





	}
})


import logo from './logo.svg';
//import './App.css';



import React from 'react';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';


//api key from OpenWeatherMap.org
const API_KEY = process.env.REACT_APP_OWM_API_KEY;

// wrapper component:
class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    //prevent full page refresh:
    e.preventDefault();
    //get input values from Form component:
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    //make API call:
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    //convert info from API call to JSON:
    const data = await api_call.json();
    if (city && country && data.cod !== '404') {
      //console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });  
    } else if (city && country && data.cod === '404'){
      this.setState({
        error: "Invalid city or country"
      });  
    } else {
      this.setState({
        error: "Please enter city and country name."
      });
    }
  }
  render() {
    return (
      <div className="app-container">
        <Titles />
        <div className="app-form-holder">
          <Form getWeather={this.getWeather}/>
          <Weather 
            temperature={this.state.temperature} 
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }
};

//export the App component:
export default App;

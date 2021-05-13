import React from 'react';

// this is a stateless functional component:
const Weather = (props) => (
    <div class="weather-info">
        {props.city && props.country && <p><span>Locaton:</span> {props.city}, {props.country}</p>}
        {props.temperature && <p><span>Temperature:</span> {props.temperature}</p>}
        {props.humidity && <p><span>Humidity:</span> {props.humidity}</p>}
        {props.description &&<p><span>Conditions:</span> {props.description}</p>}
        {props.error && <p id="error-msg">{props.error}</p>}
    </div>
);

export default Weather;
import React from 'react';

export default function Geolocation({location}) {
    const url = `http://maps.google.com/maps?q=${location.lat}, ${location.lon}&z=15&output=embed`;

    return (
        <div>
            <iframe title="map" width="100%" height="200" src={url} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"><a href="https://www.maps.ie/map-my-route/"></a></iframe>
        </div>
    )
}
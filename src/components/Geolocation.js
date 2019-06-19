import React from 'react';

export default function Geolocation({location}) {
    console.log(location)
    return (
        <div>
            <ul>
                <li>latitude: {location.lat}&deg;</li>
                <li>longitude: {location.lon}&deg;</li>
            </ul>
        </div>
    )
}
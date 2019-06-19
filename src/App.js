import React from 'react';
import Geolocation from './components/Geolocation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {}
    }
  }

  componentDidMount() {
    this._geolocation();
  }

  render() {
    return (
      <div>
        Data Selfie
        <Geolocation location={this.state.location} />
      </div>
    );
  }

  _geolocation = () => {
    if ('geolocation' in navigator) {
      console.log('geolocation available');
      navigator.geolocation.getCurrentPosition(async position => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
        });

        const response = await fetch('http://localhost:3001/api', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.location)
        });
        const data = await response.json();
        console.log(data);
      });
    } else {
      console.log('geolocation not available');
    }
  }

}

export default App;

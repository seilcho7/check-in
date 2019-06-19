import React from 'react';
import Geolocation from './components/Geolocation';
import SubmitButton from './components/SubmitButton';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {}
    }
  }

  componentDidMount() {
    this._getLocation();
  }

  render() {
    return (
      <div>
        Data Selfie
        <Geolocation location={this.state.location} />
        <SubmitButton submitLocation={this.state.location !== {} ? this._submitLocation : null} />
      </div>
    );
  }

  _getLocation = () => {
    if ('geolocation' in navigator) {
      console.log('geolocation available');
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
        });
      });
    } else {
      console.log('geolocation not available');
    }
  }

  _submitLocation = async () => {
    const response = await fetch('http://localhost:3001/api', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.location)
        });
    const data = await response.json();
    console.log(data);
  }

}

export default App;

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
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
        })
      })
    } else {
      console.log('geolocation not available');
    }
  }

}

export default App;

import React from 'react';
import Geolocation from './components/Geolocation';
import SubmitButton from './components/SubmitButton';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      mood: ''
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
        <SubmitButton inputValue={this.state.mood}
                      handleInput={this._handleInput} 
                      submitLocation={this.state.location !== {} ? this._submitLocation : null}
                      />
      </div>
    );
  }

  // Get geolocation
  _geolocation = () => {
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

  // Save data to nedb when submit button is clicked
  _submitLocation = async () => {
    const response = await fetch('http://localhost:3001/api', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            location: this.state.location,
            mood: this.state.mood
          })
        });
    const data = await response.json();
    console.log(data);
    this.setState({
      mood: ''
    }, this._getLocation);
  }

  _getLocation = async () => {
    const response = await fetch('http://localhost:3001/api');
    const data = await response.json();
    console.log(data);
  }

  _handleInput = (mood) => {
    this.setState({
      mood
    })
  }

}

export default App;

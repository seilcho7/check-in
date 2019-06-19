import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this._geolocation();
  }

  render() {
    return (
      <div>
        Data Selfie
      </div>
    );
  }

  _geolocation = () => {
    if ('geolocation' in navigator) {
      console.log('geolocation available');
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
      })
    } else {
      console.log('geolocation not available');
    }
  }
}

export default App;

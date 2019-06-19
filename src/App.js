import React from 'react';
import { Link, HashRouter, Route } from 'react-router-dom'
import Home from './components/Home';
import Geolocation from './components/Geolocation';
import SubmitButton from './components/SubmitButton';
import List from './components/List';

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
        <HashRouter basename='/'>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/post">Post</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/list">List</Link>
            </li>
          </ul>
          <Route exact path='/' component={Home} />
          <Route path='/post'
            render={() => (
              <div>
                <Geolocation location={this.state.location}/>
                <SubmitButton
                        inputValue={this.state.mood}
                        handleInput={this._handleInput} 
                        submitLocation={this.state.location !== {} ? this._submitLocation : null}
                        />
              </div>
            )} />
          <Route path='/list'
            render={() => (
              <div>
                <List data={this.state.data}/>
              </div>
            )} />
        </HashRouter>
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
    });
  }

  _handleInput = (mood) => {
    this.setState({
      mood
    })
  }

}

export default App;

import React from 'react';
import './App.css';
import { Link, HashRouter, Route } from 'react-router-dom'
import Post from './components/Post';
import List from './components/List';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      mood: '',
      picture: ''
    }
  }

  componentDidMount() {
    this._geolocation();
  }

  render() {
    return (
      <div>
        <HashRouter basename='/'>
          <div className="title">
            <h2>check!n</h2>
          </div>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" to="/post">Post</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/list">List</Link>
            </li>
          </ul>
          <Route exact path='/' component={List}/>
          <Route path='/post'
            render={() => (
              <div>
                <Post
                        location={this.state.location}
                        inputValue={this.state.mood}
                        handleInput={this._handleInput} 
                        submitLocation={this.state.location !== {} ? this._submitLocation : null}
                        submitPicture={this._submitPicture}
                        savePicture={this._savePicture}
                        resetMood={this._resetMood}
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
            mood: this.state.mood,
            picture: this.state.picture
          })
        });
    const data = await response.json();
    console.log(data);
    this.setState({
      mood: '',
      picture: ''
    });
  }

  _handleInput = (mood) => {
    this.setState({
      mood
    })
  }

  _savePicture = (picture) => {
    this.setState({
      picture
    })
  }

  _resetMood = () => {
    this.setState({
      mood: ''
    })
  }

}

export default App;

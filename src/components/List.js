import React from 'react';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:3001/api');
        const data = await response.json();
        this.setState({
            data
        })
        console.log(this.state.data);
    }

    render() {
        
        return (
            <div>
                    {this.state.data.map((post, i) => {
                        const date = new Date(post.timestamp).toLocaleString();
                        const url = `http://maps.google.com/maps?q=${post.location.lat}, ${post.location.lon}&z=15&output=embed`;
                    return (
                        <ul key={i}>
                            <li>
                                <div><iframe title="map" width="100%" height="600" src={url} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"><a href="https://www.maps.ie/map-my-route/">Map a route</a></iframe></div>
                            </li>
                            <li>Location: {post.location.lat.toFixed(2)}&deg;, {post.location.lon.toFixed(2)}&deg;</li>
                            <li>Mood: {post.mood}</li>
                            <li>{date}</li>
                            <li><img src={post.picture} alt=""></img></li>
                        </ul>
                    )
                    })}
            </div>
        )

    }
    
}
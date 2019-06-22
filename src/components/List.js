import React from 'react';
import '../App.css';

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
        const sortedData = data.sort(function(a, b) {
            return b.timestamp - a.timestamp
        })
        this.setState({
            data: sortedData
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
                    <div key={i} className="card">
                        <iframe className="card-img-top" title="map" src={url} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"><a href="https://www.maps.ie/map-my-route/">map</a></iframe>
                        <img src={post.picture} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{date}</h5>
                            <p className="card-text">{post.mood}</p>
                            <button className="btn btn-primary">delete</button>
                        </div>
                    </div>
                )
                })}
            </div>
        )

    }
    
}
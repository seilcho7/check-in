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
                    return (
                        <ul key={i}>
                            <li>Location: {post.location.lat.toFixed(2)}&deg;, {post.location.lon.toFixed(2)}&deg;</li>
                            <li>Mood: {post.mood}</li>
                            <li>{date}</li>
                        </ul>
                    )
                    })}
            </div>
        )

    }
    
}
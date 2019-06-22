import React from 'react';
import Webcam from "react-webcam";
import '../App.css';

export default class Post extends React.Component {
    setRef = webcam => {
        this.webcam = webcam;
    };

    render() {
        const url = `http://maps.google.com/maps?q=${this.props.location.lat}, ${this.props.location.lon}&z=15&output=embed`;
        return (
            <div className="card">
                <iframe className="card-img-top" title="map" src={url} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"><a href="https://www.maps.ie/map-my-route/">map</a></iframe>
                <Webcam
                    className="card-img-top"
                    audio={false}
                    height={360}
                    // width={10}
                    ref={this.setRef}
                    />
                <div className="card-body">
                    <h5 className="card-title">check!n</h5>
                    <p className="card-text"><input value={this.props.inputValue} onChange={(e) => {
                        this.props.handleInput(e.target.value);
                    }}
                    /></p>
                    <button className="btn btn-primary" onClick={async () => {
                        await this._capture();
                        this.props.submitLocation();
                    }}>post</button>
                </div>
            </div>
        )
    }
    
    _capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.props.savePicture(imageSrc);
    };

}
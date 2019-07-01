import React from 'react';
import Webcam from "react-webcam";
import '../App.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            show: false
        }
    }
    setRef = webcam => {
        this.webcam = webcam;
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            this._date();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

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
                    <h5 className="card-title">{this.state.date}</h5>
                    <p className="card-text"><input value={this.props.inputValue} onChange={(e) => {
                        this.props.handleInput(e.target.value);
                    }}
                    /></p>
                    <button variant="primary" className="btn btn-primary" onClick={async () => {
                        await this._capture();
                        this._handleShow();
                        this.props.submitLocation();
                    }}>post</button>
                </div>
        <Modal show={this.state.show} onHide={this._handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this._handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this._handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
            </div>
        )
    }
    
    _capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.props.savePicture(imageSrc);
    };

    _date = () => {
        const timestamp = Date.now();
        const date = new Date(timestamp).toLocaleString();
        this.setState({
            date
        })
    }

    _handleClose = () => {
        this.setState({
            show: false
        })
    }

    _handleShow = () => {
        this.setState({
            show: true
        })
    }

}
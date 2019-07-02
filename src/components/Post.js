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
            saveDate: '',
            show: false,
            tempPicture: ''
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
                    className="card-video-top"
                    audio={false}
                    // height={360}
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
                        this._saveDate();
                    }}>check!n</button>
                </div>
                <Modal show={this.state.show} onHide={this._handleClose}>
                    <Modal.Header closeButton onClick={() => {
                        this.props.resetMood();
                    }}>
                        <Modal.Title>post check!n?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="card">
                        <iframe className="card-img-top" title="map" src={url} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"><a href="https://www.maps.ie/map-my-route/">map</a></iframe>
                        <img src={this.state.tempPicture} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{this.state.saveDate}</h5>
                            <p className="card-text">{this.props.inputValue}</p>
                        </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            this._handleClose();
                            this.props.submitLocation();
                            }}>
                            post
                        </Button>
                        <Button variant="secondary" onClick={() => {
                            this._handleClose();
                            this.props.resetMood();
                            }}>
                            cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    
    _capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.props.savePicture(imageSrc);
        this.setState({
            tempPicture: imageSrc
        })
    };

    _date = () => {
        const timestamp = Date.now();
        const date = new Date(timestamp).toLocaleString();
        this.setState({
            date
        })
    }

    _saveDate = () => {
        const timestamp = Date.now();
        const saveDate = new Date(timestamp).toLocaleString();
        this.setState({
            saveDate
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
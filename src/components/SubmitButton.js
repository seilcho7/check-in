import React from 'react';
import Webcam from "react-webcam";

export default class SubmitButton extends React.Component {
    setRef = webcam => {
        this.webcam = webcam;
    };

    render() {
        return (
            <div>
                <div>
                    <Webcam
                    audio={false}
                        height={320}
                        width={320}
                        ref={this.setRef}
                        />
                </div>
                <div>
                    <input placeholder="Mood" value={this.props.inputValue} onChange={(e) => {
                        this.props.handleInput(e.target.value);
                    }}
                    />
                    <button onClick={async () => {
                        await this._capture();
                        this.props.submitLocation();
                    }}>
                        Submit
                    </button>
                </div>
            </div>
        )
    }
    
    _capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.props.savePicture(imageSrc);
    };

}
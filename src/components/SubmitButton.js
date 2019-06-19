import React from 'react';

export default function SubmitButton({submitLocation, inputValue, handleInput}) {
    return (
        <div>
            <input placeholder="Mood" value={inputValue} onChange={(e) => {
                handleInput(e.target.value);
            }}
            />
            <button onClick={() => {
                submitLocation();
            }}>
                Submit
            </button>
        </div>
    )
}
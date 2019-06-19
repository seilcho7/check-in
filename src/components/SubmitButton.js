import React from 'react';

export default function SubmitButton({submitLocation}) {
    return (
        <div>
            <button onClick={() => {
                submitLocation();
            }}>
                Submit
            </button>
        </div>
    )
}
import React from 'react'

const DisplayValidation = ({validateMessage}) => {
    return (
        <div className="validation">
            {validateMessage}
        </div>
    )
}

export default DisplayValidation;
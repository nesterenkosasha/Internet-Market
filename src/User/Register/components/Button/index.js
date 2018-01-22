import React from 'react'
import PropTypes from 'prop-types'

const ButtonComponent = ({
    classButton,
    text,
    isDisabled,
    handelButtonClick
}) => {
    return(
        <button 
        onClick ={({target }) => handelButtonClick(target)}
        disabled={isDisabled}
        className={`button ${classButton.join(' ')}`}
        >
        {text}
        </button>
    )
}

ButtonComponent.propTypes = {
    classButton: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string,
    isDisabled: PropTypes.bool,
    handelButtonClick: PropTypes.func
}

export default ButtonComponent








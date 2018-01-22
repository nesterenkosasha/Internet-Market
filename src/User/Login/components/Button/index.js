import React from 'react'
import PropTypes from 'prop-types'

const ButtonComponent = ({
    buttonClassNames,
    text,
    handelClick,
    isDisabled
}) => {
    return (
        <button 
        disabled={isDisabled}
        onClick={handelClick}
        className={`${buttonClassNames.join(' ')}`}>
        {text}
        </button>
    )
}

ButtonComponent.propTypes = {
    buttonClassNames: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string,
    handelClick: PropTypes.func,
    isDisabled: PropTypes.bool
}

export default ButtonComponent
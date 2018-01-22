import React from 'react'
import PropTypes from 'prop-types'

const InputComponent = ({
    inputClass,
    type,
    placeholder,
    iconClass,
    isValid,
    handelInputBlur,
    validation,
    inputRef,
    inputId
}) => {
    return(
        <div>
           <p className="control has-icon has-icon-right">
                <input 
                ref={inputRef}
                className={`input ${inputClass.join(' ')} ${isValid ? 'is-danger' : ''}`}
                type={type} 
                onBlur={({ target: { value }}) => handelInputBlur(inputId, validation, value)}
                placeholder={placeholder}
                />
                <span className="icon user">
                <i 
                className={`fa ${iconClass.join(' ')}`}
                >
                </i>
                </span>
            </p>  
        </div>
    )
}
InputComponent.propTypes = {
    inputClass: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
    placeholder: PropTypes.string,
    iconClass: PropTypes.arrayOf(PropTypes.string),
    isValid: PropTypes.bool,
    handelInputBlur: PropTypes.func,
    validation: PropTypes.func,
    inputRef: PropTypes.func,
    inputId: PropTypes.string
}

export default InputComponent
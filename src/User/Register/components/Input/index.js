import React from 'react'
import PropTypes from 'prop-types'

const InputComponent = ({
    label,
    type,
    placeholder,
    inputId,
    validation,
    handelBlur,
    inputRef,
    isValid
}) => {
    return(
        <div>
            <label className='label'>{label}</label>
                <p className='control'>
                    <input 
                    className={`input ${isValid ? 'is-danger' : ''}`}
                    type={type} 
                    ref={inputRef}
                    onBlur={({ target: { value }}) => handelBlur(inputId, validation, value)}
                    placeholder={placeholder} 
                    />
                </p>
                    {
                        isValid
                        ? (<p className="help is-danger">{isValid}</p>)
                        : null
                    }
        </div>
    )   
}

InputComponent.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    inputId: PropTypes.string,
    validation: PropTypes.func,
    handelBlur: PropTypes.func,
    inputRef: PropTypes.func,
    isValid: PropTypes.bool
}

export default InputComponent
import React from 'react'
import PropTypes from 'prop-types' 
import './style.scss'

const OrderComponent = ({
    id,
    img,
    title,
    price,
    inputRef,
    handelChange,
    amount
}) => {
return(
        <div className='orderComponent'>
            <img width='30px' height='30px' src={img} />
            <span><div className='orderTitle'>{title}</div></span>
            <span><div className='orderPrice'>{price}</div></span> 
            <input
            defaultValue={amount}
            className='inputComponent' 
            onChange={() => handelChange(id)}
            type='text'
            ref={inputRef}
            />
        </div>
    )
}

OrderComponent.propTypes = {
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inputRef: PropTypes.func,
    handelChange: PropTypes.func,
    amount: PropTypes.number,
}

export default OrderComponent
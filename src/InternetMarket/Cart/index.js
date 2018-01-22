import React from 'react'
import './style.scss'
import { arrReduce } from '../helper.js'
import PropTypes from 'prop-types' 

const CartComponent = ({boughtProducts}) => {
    const toPay = arrReduce(boughtProducts)
    return(
        <div id='cartClassName'>
            <div>
                Amount products: {boughtProducts.length}
            </div>
            <div>
            To pay: {
                toPay.toFixed(2)
            } $
            </div>
        </div>
    )
}

CartComponent.propTypes = {
    boughtProducts: PropTypes.array
}

export default CartComponent
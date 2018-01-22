import React from 'react'
import PropTypes from 'prop-types' 
import './style.scss' 
let firstdata = 0

const ProductComponent = ( el ) => {
    const {
        title,
        id, 
        handelAddClick,
        handelRemoveClick,
        flag,
        data
    } = el
    
    const item = data[firstdata++ % data.length]

    return(
        <div 
        className={` productClass ${flag && 'chosen' || ''}`}>
            <div id='productId'>
			    <span className='spanClassName'>{item.title}</span>
			    <span className='priceClassName'><strong>100g</strong></span>		
			    <div id='img'>
                    <img src={item.img} alt="Image" />
                </div>
			    <p id='titleId'>{title}</p>
                <span className='spanClassName'>
                    {
                        flag
                        ? ( 
                            <button
                                className="button is-danger"
                                onClick={() => handelRemoveClick({id})}
                                >
                                Remove
                            </button>
                            )
                        : (
                            <button
                                className="button is-primary"
                                onClick={() => handelAddClick(el, item)}
                                >
                                Buy
                            </button> 
                        )
                    }			
                </span>
                <span className='priceClassName'><strong>{item.price}$</strong></span>
		    </div>			
        </div>         
    )
}

ProductComponent.propTypes = {
    title: PropTypes.string,
    id: PropTypes.number, 
    handelAddClick: PropTypes.func,
    handelRemoveClick: PropTypes.func,
    flag: PropTypes.bool,
    data: PropTypes.array
}

export default ProductComponent
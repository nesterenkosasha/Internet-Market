import React from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types' 
import OrderComponent from './OrderComponent.js'
import { arrReduce } from '../helper.js'

import './style.scss'

export default class Order extends React.PureComponent{

    static propTypes = {
        boughtProducts: PropTypes.array,
        handelClickCancel: PropTypes.func, 
        handelClickBuy: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            toPay: arrReduce(this.props.boughtProducts),
        }
    }

    handelChange = (id) => { 
        const { boughtProducts } = this.props
        const newBoughtProducts = boughtProducts.reduce((acc, el) => {
            if(el.id == id) el.amount = this[id].value        
            return acc += (el.price * el.amount)
        }, 0)
            this.setState({ toPay: newBoughtProducts})    
    }

    componentWillReceiveProps(nextProps) {
        const { boughtProducts } = nextProps
        this.setState({toPay: arrReduce(boughtProducts)})
    }

    render(){
        const { boughtProducts, handelClickCancel, handelClickBuy } = this.props
        const { toPay } = this.state
        return(
            <div className='orderContainer'>
                Your order
               {
                boughtProducts.map(({ id, img, title, price, amount }) => (
                    <OrderComponent 
                    key={id}
                    id={id}
                    img={img}
                    title={title}
                    amount={amount}
                    price={price}
                    handelChange={this.handelChange}
                    inputRef={el => this[id] = el}
                    />
                ))
               }
               <div className='summary'>
                  {`To pay:  ${toPay.toFixed(2)}`}
                  
                </div>
                <button
                    onClick={handelClickBuy}
                    className="button is-danger btnOrder"
                    >
                    Buy
                </button>
                <button
                onClick={handelClickCancel}
                    className="button is-danger btnOrder"
                    >
                    Cancel
                </button>
            </div>
        )
    }
}




{/* <input 
   type='text'
 //  ref={el => this.inputComponent = el}
/> */}



// ({ boughtProducts }) => {
//     console.log("-->", boughtProducts)
//     const { img, title } = boughtProducts
//     return(
//         <div>
//             <span>"{title}"</span>
//         </div>
//     )
// }
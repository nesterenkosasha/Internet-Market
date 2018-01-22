import React from 'react'
import PropTypes from 'prop-types' 
import ProductComponent from '../Product'
import './style.scss'
import { data } from './getProducts.js'

export default class ProductsContainer extends React.Component{

    static propTypes = {
        boughtProducts: PropTypes.array,
        products: PropTypes.array
    }

    constructor(props){
        super(props)
        this.state = {
            products: []
        }
    }
    
    componentWillReceiveProps({boughtProducts, products}) {
        const updatedProducts = products.reduce((acc, product) => {
            acc.push({
                ...product,
                flag: !!~boughtProducts.findIndex(({id}) => id == product.id )
            })
            return acc
        },[])
        this.setState({
            products: updatedProducts
        })
    }

    render(){
        const { products } = this.state
        const { 
            handelAddClick, 
            boughtProducts,
            handelRemoveClick
        } = this.props
        return(
            <div id="column">
            {
            products.map(el => (
                <ProductComponent
                handelAddClick={handelAddClick}
                handelRemoveClick={handelRemoveClick}
                {...el} 
                key={el.id} 
                data={data}
                />
                ))
            }
          </div>
        )
    }
}


import React from 'react'
import PropTypes from 'prop-types' 
import ProductsContainer from '../Products'
import CartComponent from '../Cart'
import { getProducts } from '../Products/getProducts.js'
import { browserHistory } from 'react-router'
import './style.scss'

export default class Market extends React.PureComponent{
    static propTypes = {
        children: PropTypes.object
    }

    constructor(props){
        super(props)
        this.state = {
            products: [],
            productsToRender: [],
            boughtProducts: [],
            n: 20,
            flag: false,
            flag2: false
        }
        document.addEventListener("scroll",this.handleScroll)
    }
    async componentDidMount() {
        const products = await getProducts()
        const productsToRender = await products.slice(0, 20)
        const boughtProducts = this.getBoughtProducts()
          this.setState({
              products,
              productsToRender, 
              boughtProducts              
          })
          
      }

    handleScroll = () => {
        const { n } = this.state
        const { body: { scrollHeight, clientHeight }, scrollingElement: {scrollTop} } = document
        if (scrollHeight - scrollTop.toFixed(0) <= (clientHeight + 30)){
            const newProductsToRender = this.state.products.slice(n, n + 10)
            this.setState(({productsToRender, n}) => {
                newProductsToRender.forEach(el => {
                    productsToRender.push(el)
                })
                return {
                    productsToRender,
                    n: n+10
                }
            })
        }
    }  
    
    handelAddClick = (el, item) => {
        this.setState(({boughtProducts}) => {
            const amount = 1
            boughtProducts.push({...el, ...item, amount})
                return { boughtProducts:[...boughtProducts] }                            
        }, () => {
            this.setBoughtProducts(this.state.boughtProducts)            
        })}

    handelRemoveClick = ({ id }) => {
        this.setState(({ boughtProducts }) => ({
            boughtProducts: boughtProducts.filter(el => el.id != id)
        }), () => {
            this.setBoughtProducts(this.state.boughtProducts)
    })}

    setBoughtProducts = (boughtProducts) => {
        localStorage.setItem("boughtProducts", JSON.stringify(boughtProducts))
        return this
    }

    getBoughtProducts = () => {
        return localStorage.getItem("boughtProducts")
            ? JSON.parse(localStorage.getItem("boughtProducts"))
            : []
    }

    onMouseEnter = (e) => {
        e.stopPropagation()        
        this.setState(({flag}) => ({
            flag: true
        }))
    }

    onMouseLeave = (e) => {
        e.stopPropagation()
        this.setState(({flag}) => ({
            flag: false
        }))
    }

    handelHome = () => {
        localStorage.removeItem("user")
        browserHistory.push('/main')
    }

    handelOrderClick = () => {
        this.setState(({flag2}) => ({
            flag2: true
        }))
        browserHistory.push('/market/order')
    }

    handelClickCancel = () => {
        this.setState(({flag2}) => ({
            flag2: false
        }))
    }

    handelClickBuy = () => {
        this.setState(({boughtProducts}) => ({
            boughtProducts: []
        }), () => {localStorage.removeItem("boughtProducts")})
    }

    render(){
        const { boughtProducts, productsToRender, flag, flag2 } = this.state
        const { children } = this.props
        const handelClickCancel = this.handelClickCancel
        const handelClickBuy = this.handelClickBuy 
        return(
            <div>
                <nav className="navMarket">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                            <p className="control">  
                                    <button 
                                        className="button is-info"
                                        onClick={this.handelOrderClick}
                                        >
                                        Order
                                    </button>
                                </p>
                                <p className="control">  
                                    <button 
                                        className="button is-info"
                                        onMouseEnter={this.onMouseEnter}
                                        onMouseLeave={this.onMouseLeave}
                                        >
                                        Cart
                                    </button>
                                </p>
                                <p className="control">    
                                    <button 
                                        className="button is-info"
                                        onClick={this.handelHome}
                                        >
                                        Logout
                                    </button>                                                                
                                </p>
                            </div>
                        </div>
                    </div>             
                </nav>
            <div id='marketComponent'>
            {
                flag2
                    ? (React.cloneElement(children, { boughtProducts, handelClickBuy, handelClickCancel, handelClickBuy }))
                    : null
            }    
            {
                flag
                    ? <CartComponent
                        boughtProducts={boughtProducts}
                      /> 
                    : null
            }            
            <ProductsContainer 
            products={productsToRender}
            boughtProducts={boughtProducts}
            handelRemoveClick={this.handelRemoveClick}
            handelAddClick={this.handelAddClick}
            /> 
            </div>
            </div>          
        )
    }
}

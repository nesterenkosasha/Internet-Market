export const arrReduce = (boughtProducts) => { return boughtProducts.reduce((acc, el) => {
    return acc += (el.price * el.amount)
}, 0)}
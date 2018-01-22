import photo1 from './images/photo1.jpg'
import photo2 from './images/photo2.jpg'
import photo3 from './images/photo3.jpg'
import photo4 from './images/photo4.jpg'
import photo5 from './images/photo5.jpg'


export const getProducts = async() => {
    try{
        const item = await fetch('https://jsonplaceholder.typicode.com/photos', {
            method: 'GET'
        })
        const data = await item.json()
        return data
    } catch ({message}) {
        console.error(message)
    }
}

export const data = [
    {
        img: photo1,
        title: "Sweet dragées",
        price: 2.15
    },
    {
        img: photo2,
        title: "Chocolate",
        price: 1.65
    },
    {
        img: photo4,
        title: "Sweet hearts",
        price: 6.05
    },
    {
        img: photo5,
        title: "Cakes",
        price: 4.65
    }
]
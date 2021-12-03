import React, { useEffect, useState } from 'react'
import { DEFAULT_BACKEND_PATH } from '../../../App'
import FrontDoorCardsContainer, { CARDS_PLACEMENT } from '../../frontDoorCards/FrontDoorCardsContainer'
import './Products.css'

const productPhoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvzcRo7hGHWmSduX3YZ9loiRXeU5RMr2mdqbf-4f_7eYqIIQ6diWut7XVyiZkT4kVt_d4&usqp=CAU'
const title = 'Highest quality supplements'

function Products() {
    const [products, setProducts] = useState(null)

    useEffect(() => {
        fetch(DEFAULT_BACKEND_PATH + 'products')
            .then(response => response.json())
            .then(productsResponse => {
                const productsData = productsResponse.map(product => {
                    return {
                        src: productPhoto,
                        text: product.name,
                        label: product.price + '$',
                        path: product.id,
                    }
                })
                setProducts(productsData)
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <div>
            <h1 className='default-page-front products'>PRODUCTS</h1>
            {!!products && <FrontDoorCardsContainer data={products} placement={CARDS_PLACEMENT[1]} title={title}/>}
        </div>
    )
}

export default Products

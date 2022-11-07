import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { ProductsModel } from '../interface/index-page/products'

const Context = createContext(undefined) as any

type ChildrenProps = {
    children: any
}



export const StateContext = (props: ChildrenProps) => {
    const { children } = props
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [quantity, setQuantity] = useState(1)

    let foundProduct: { quantity: number; price: number } | undefined;
    let index;

    const onAddToCart = (product: ProductsModel, quantity: number) => {
        const checkProductInCart = cartItems.find((item) => item._id == product._id)
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

            if(checkProductInCart) {

                    const updatedCartItems = cartItems.map((cartProduct) => {
                        if(cartProduct._id === product._id) return {
                            ...cartProduct,
                            quantity: cartProduct.quantity + quantity,
                        }
                    })

                    setCartItems(updatedCartItems)
                } else { 
                    product.quantity = quantity
                    
                    setCartItems([...cartItems, {...product }])
                }

        toast.success(`${quantity} ${product.name} added to the cart.`)

    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
    
        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = ( id, value ) => {

        foundProduct = cartItems.find((item) => item._id === id)

        index = cartItems.findIndex((item) => item._id === id)

        const newCartItems = cartItems.filter((item) => item._id !== id)

        if(value === 'increment') {

            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1 } ])
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)

        } else if(value === 'decrement') {

            if(foundProduct.quantity  > 1){
                setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1 } ])
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }

        }

    }


    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1)
    }

    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => {
            if( prevQuantity - 1  < 1) return 1;

            return prevQuantity - 1
        })
    }

    return (
        <Context.Provider value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            quantity,
            increaseQuantity,
            decreaseQuantity,
            onAddToCart,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities,
        }}>
            { children }
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)
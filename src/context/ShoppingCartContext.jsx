import { createContext, useContext, useState } from "react";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  function getItemQuantity(id) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }
  function getAllItemQuantity() {
    console.log(cartItems)
    return cartItems
  }
  function getCountItemCart() {

    return cartItems.length
  }
  function insertCartItem(data) {
    setCartItems(currItems => {
      if (!currItems.find(item => item.id === data.id)) {
        return [...currItems, { ...data, quantity: 1 }]
      }
      else {
        return [...currItems]
      }
    })
  }
  function sumPrice() {
    return cartItems.map(item => item.price * item.quantity).reduce((before, after) => before + after, 0)
  }

  function increaseCartQuantity(id) {
    setCartItems(currItems => {
      return currItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 }
        } else {
          return item
        }
      })
    }
    )
  }

  function decreaseCartQuantity(id) {
    setCartItems(currItems => {
      return currItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 }
        } else {
          return item
        }
      })
    }
    )
  }

  function removeFromCart(id) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })

  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        insertCartItem,
        getCountItemCart,
        getAllItemQuantity,
        removeFromCart,
        sumPrice
      }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

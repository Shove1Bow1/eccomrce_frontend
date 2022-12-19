import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [packageBackend, setPackageBackend] = useState();
  async function RetriveCartList() {

    const Package = await axios(
      {
        url: `${process.env.REACT_APP_BACKEND}products/retrive_cart_list`,
        method: "get",
        headers: {
          token: process.env.REACT_APP_TOKEN_CONFIRM,
          userId: localStorage.getItem("userId")
        }
      }
    )
    const jsonData = await Package.data.data;
    return await jsonData;
  }
  useEffect(() => {
    if (localStorage.getItem("userId"))
      setPackageBackend(RetriveCartList());
  }, [])
  useEffect(() => {
    if (packageBackend && localStorage.getItem("userId")) {
      const itemAvailable = localStorage.getItem("cartList").replace("]", "");
      const itemUser = packageBackend.replace("[", ",");
      localStorage.setItem("cartList", itemAvailable + itemUser);
    }
    if (localStorage.getItem("cartList") && !cartItems[0]) {
      setCartItems(JSON.parse(localStorage.getItem("cartList")));
    }
  }, [])
  function getItemQuantity(id) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }
  function getAllItemQuantity() {
    return cartItems
  }
  function getCountItemCart() {

    return cartItems.length
  }
  function insertCartItem(data) {
    setCartItems(currItems => {
      if (!currItems.find(item => item.id === data.id)) {
        localStorage.setItem("cartList", JSON.stringify([...currItems, { ...data, quantity: 1 }]));
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
      localStorage.setItem("cartList", JSON.stringify(currItems.map(item => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        } else {
          return item
        }
      })))
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
      localStorage.setItem("cartList", JSON.stringify(currItems.map(item => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 }
          }
          return item
        } else {
          return item
        }
      })))
      return currItems.map(item => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 }
          }
          return item
        } else {
          return item
        }
      })
    }
    )
  }

  function removeFromCart(id) {
    setCartItems(currItems => {
      localStorage.setItem("cartList", JSON.stringify(currItems.filter(item => item.id !== id)))
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

import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = newProduct => {
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state

    // check whether the product is already added in the cartList or not

    const isExistingProduct = cartList.some(
      product => product.id === newProduct.id,
    )

    // if already added the product in the cartList update the quatity of the particular product
    if (isExistingProduct) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(cartProduct => {
          if (cartProduct.id === newProduct.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + newProduct.quantity,
            }
          }
          return cartProduct
        }),
      }))
    }
    // if the product in not add prevously then add it to the cartList
    else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, newProduct],
      }))
    }
  }

  // increasing the quantity of the product in the cartList

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: [
        ...prevState.cartList.map(cartItem => {
          if (cartItem.id === id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          }
          return cartItem
        }),
      ],
    }))
  }

  // decreasing the quantity of the product in the cartList

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(cartItem => {
          if (cartItem.id === id) {
            // If quantity is 1, remove the item from the cart list
            if (cartItem.quantity === 1) {
              return null
            }
            // If quantity is greater than 1, decrease the quantity by 1
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            }
          }

          return cartItem
        })
        .filter(cartItem => cartItem !== null), // Filter out null values (removed items)
    }))
  }

  // removing the particular product from cartList

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: [
        ...prevState.cartList.filter(cartItem => {
          if (cartItem.id !== id) {
            console.log(cartItem.quantity)
            return cartItem
          }
          return false
        }),
      ],
    }))
  }

  // removing all the products from the cartList

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path='/login' component={LoginForm} />
          <ProtectedRoute exact path='/' component={Home} />
          <ProtectedRoute exact path='/products' component={Products} />
          <ProtectedRoute
            exact
            path='/products/:id'
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path='/cart' component={Cart} />
          <Route path='/not-found' component={NotFound} />
          <Redirect to='not-found' />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

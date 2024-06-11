import {Component} from 'react'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import PaymentPopup from '../PaymentPopup'

import './index.css'

class Cart extends Component {
  state = {
    isPaymentPopupOpen: false,
    isOrderPlaced: false,
  }

  handleCheckout = () => {
    this.setState({isPaymentPopupOpen: true})
  }

  handleOrderConfirmed = () => {
    this.setState({isOrderPlaced: true})
  }

  handleShopMore = () => {
    this.setState({isOrderPlaced: false})
    const {history} = this.props
    history.replace('/products')
  }

  render() {
    const {isPaymentPopupOpen, isOrderPlaced} = this.state
    console.log(isOrderPlaced)
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const showEmptyView = cartList.length === 0

          const totalItems = cartList.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0,
          )
          const totalPrice = cartList.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0,
          )

          return (
            <>
              <Header />
              <div className="cart-container">
                {showEmptyView ? (
                  <EmptyCartView />
                ) : (
                  <div className="cart-content-container">
                    <h1 className="cart-heading">My Cart</h1>
                    <div className="remove-all-button-container">
                      <button
                        type="button"
                        className="remove-all-button"
                        onClick={value.removeAllCartItems}
                      >
                        Remove All
                      </button>
                    </div>

                    <CartListView />
                    <div className="cart-summery-card-container">
                      <div className="cart-summery-card">
                        <h2 className="card-heading">Order Summary:</h2>
                        <p className="card-paragraph total-price">
                          Order Total: {totalPrice}/-
                        </p>
                        <p className="card-paragraph no-of-items">
                          {totalItems} items in cart
                        </p>
                        <button
                          type="button"
                          className="checkout-button"
                          onClick={this.handleCheckout}
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Popup
                open={isPaymentPopupOpen}
                modal
                onClose={() => this.setState({isPaymentPopupOpen: false})}
              >
                <PaymentPopup
                  totalPrice={totalPrice}
                  totalItems={totalItems}
                  onConfirm={this.handleOrderConfirmed}
                  onCancel={() => this.setState({isPaymentPopupOpen: false})}
                  isOrderPlaced={isOrderPlaced}
                  handleShopMore={this.handleShopMore}
                />
              </Popup>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart

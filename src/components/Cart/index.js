import {useContext} from 'react'
import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const totalItems = cartList.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cartList.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  )

  const onClickRemoveAllFeature = () => {
    removeAllCartItems()
  }

  return (
    <>
      <Header />
      <div className='cart-container'>
        <>
          {cartList.length === 0 ? (
            <EmptyCartView />
          ) : (
            <div className='cart-content-container'>
              <h1 className='cart-heading'>My Cart</h1>
              <div className='remove-all-button-container'>
                <button
                  type='button'
                  className='remove-all-button'
                  onClick={onClickRemoveAllFeature}
                >
                  Remove All
                </button>
              </div>
              <CartListView />
              <div className='cart-summery-card-container'>
                <div className='cart-summery-card'>
                  <h1 className='card-heading'>
                    Order Total:{' '}
                    <span className='total-price'>RS {totalPrice}/-</span>
                  </h1>
                  <p className='card-paragraph'>
                    <span className='no-of-items'>{totalItems}</span> items in
                    cart
                  </p>
                  <button type='button' className='checkout-button'>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  )
}

export default Cart

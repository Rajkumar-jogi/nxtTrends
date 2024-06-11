import {useState, useContext} from 'react'
import './index.css'

import cartContext from '../../context/CartContext'

const PaymentPopup = ({
  totalPrice,
  totalItems,
  onConfirm,
  onCancel,
  isOrderPlaced,
  handleShopMore,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

  const {removeAllCartItems} = useContext(cartContext)

  const handlePaymentMethodChange = e => {
    setSelectedPaymentMethod(e.target.value)
  }

  const handleConfirmOrder = () => {
    if (selectedPaymentMethod === 'Cash on Delivery') {
      onConfirm()
    }
  }

  const handleShopMoreItems = () => {
    removeAllCartItems()
    handleShopMore()
  }

  return (
    <>
      {isOrderPlaced ? (
        <div className="order-confirmation-popup">
          <h2 className="order-confirmed-text">
            Your order has been placed successfully!
          </h2>
          <button
            type="button"
            className="shop-more-button"
            onClick={handleShopMoreItems}
          >
            Shop More
          </button>
        </div>
      ) : (
        <div className="payment-popup">
          <h2>Payment</h2>
          <div className="payment-methods">
            <label>
              <input
                type="radio"
                value="Card"
                checked={selectedPaymentMethod === 'Card'}
                onChange={handlePaymentMethodChange}
                name="payment-mode"
                disabled
              />
              Card
            </label>
            <label>
              <input
                type="radio"
                value="Net Banking"
                onChange={handlePaymentMethodChange}
                name="payment-mode"
                disabled
              />
              Net Banking
            </label>
            <label>
              <input
                type="radio"
                value="UPI"
                onChange={handlePaymentMethodChange}
                name="payment-mode"
                disabled
              />
              UPI
            </label>
            <label>
              <input
                type="radio"
                value="Wallet"
                onChange={handlePaymentMethodChange}
                name="payment-mode"
                disabled
              />
              Wallet
            </label>
            <label>
              <input
                type="radio"
                value="Cash on Delivery"
                onChange={handlePaymentMethodChange}
                name="payment-mode"
              />
              Cash on Delivery
            </label>
          </div>
          <div className="order-summary">
            <h3>Summary</h3>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: {totalPrice}</p>
          </div>
          <div className="button-container">
            <button
              type="button"
              onClick={handleConfirmOrder}
              disabled={selectedPaymentMethod !== 'Cash on Delivery'}
            >
              Confirm Order
            </button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default PaymentPopup

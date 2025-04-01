// Write your code here
import {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => {
  const [selected, setSelected] = useState('')
  const [orderplaced, setOrder] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        let total = 0
        cartList.forEach(item => {
          total += item.price * item.quantity
        })

        return (
          <div>
            <h1>Order Total: Rs {total}</h1>
            <p>{cartList.length} items in Cart</p>
            <Popup
              modal
              trigger={
                <button type="button" className="">
                  Checkout
                </button>
              }
            >
              {orderplaced ? (
                <div>
                  <p>Your order has been placed successfully</p>
                </div>
              ) : (
                <div>
                  <h1>Payment Mode</h1>
                  <ul>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="UPI"
                        checked={selected === 'UPI'}
                        onChange={e => setSelected(e.target.value)}
                        disabled
                      />
                      UPI
                    </label>
                    <br />
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="Card"
                        checked={selected === 'Card'}
                        onChange={e => setSelected(e.target.value)}
                        disabled
                      />
                      Credit / Debit / ATM Card
                    </label>
                    <br />
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="Netbanking"
                        checked={selected === 'Netbanking'}
                        onChange={e => setSelected(e.target.value)}
                        disabled
                      />
                      Net Banking
                    </label>
                    <br />
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="COD"
                        checked={selected === 'COD'}
                        onChange={e => setSelected(e.target.value)}
                      />
                      Cash on Delivery
                    </label>
                  </ul>
                  <div>
                    <h1>Order Summary</h1>
                    <p>
                      No of Items : <span>{cartList.length}</span>
                    </p>
                    <p>
                      Total Bill : <span>{total}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOrder(true)}
                    disabled={selected !== 'COD'}
                  >
                    Confirm Order
                  </button>
                </div>
              )}
            </Popup>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary

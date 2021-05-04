import React from 'react'
import { useOrderDetails } from '../../Context/OrderDetails'
import Options from './Options'

function OrderEntry() {

  const [orderDetails, ] = useOrderDetails()
  
  return (
    <div>
      <Options optionType="scoops"/>
      <Options optionType="toppings"/>
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
    </div>
  )
}

export default OrderEntry

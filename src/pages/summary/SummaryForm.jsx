import React, { useState } from 'react'
import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap'

function SummaryForm() {
  const [checked, setChecked] = useState(false)
  const [popovervisible, setPopOverVisible] = useState(false)

  const popOver=(
    <Popover id="popover-basic">
      <Popover.Content>No icecrem will be actually delivered</Popover.Content>
    </Popover>
  )
  const checkboxlabel= (
    <OverlayTrigger overlay={popOver} placement="right">
      <span>Accept Terms and Conditions</span>
    </OverlayTrigger>
  )
  return (
    <Form>
      <Form.Group controlId="terms-and-condition">
        <Form.Check 
        type="checkbox" 
        checked={checked} 
        onChange={(e)=>setChecked(e.target.checked)}
        label={checkboxlabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!checked}>Confirm Order</Button>
    </Form>
  )
}

export default SummaryForm

import React from 'react'
import { Alert } from 'react-bootstrap'

function AlertBanner({message="An unexpected error occurred. Please try again later",variant="danger"}) {
  return (
    <Alert variant={variant}>
    {message}
    </Alert>
  )
}

export default AlertBanner

import React from 'react'
import userFetchData from './Customhook'

const HookComponent = () => {
    const data = userFetchData(url)
  return (
    <div>HookComponent</div>
  )
}

export default HookComponent
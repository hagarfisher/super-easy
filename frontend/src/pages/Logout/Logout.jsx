import React from 'react'
import styles from './style.module.scss'

function Logout() {
  return (
    <div className={styles['logout-wrapper']}>
      <h3>See you next time!</h3>
      <img src="https://supereasy.s3.us-east-2.amazonaws.com/sadcart.jpg" alt="sad-cart" />
    </div>
  )
}

export default Logout
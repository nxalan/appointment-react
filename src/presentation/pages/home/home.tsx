/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './home-styles.scss'
import { Footer, Header, Input, Button, FormStatus } from '@/presentation/components'

const HomePage: React.FC = () => {

  return (
    <div className={Styles.root}>
      <div className={Styles.headerBase}>
        <Header />
      </div>
      <div className={Styles.centerBase}>
      </div>
      <div className={Styles.footerBase}>
        <Footer />
      </div>
    </div>
  )
}

export default HomePage

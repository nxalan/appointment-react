import React, { memo } from 'react'
import { Logo } from '@/presentation/components'
import Styles from './header-styles.scss'

const Header: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>Enquetes</h1>
    </header>
  )
}

export default memo(Header)

import React, { memo } from 'react'
import Styles from './footer-styles.scss'

const Footer: React.FC = () => {
  return (
    <>
      <div className={Styles.divider} />
      <div className={Styles.root}>
        <div className={Styles.buttonInfo}>
          <p className={Styles.text}>
            {`© ${new Date().getFullYear()} Alan Oliveira - Todos os Direitos Reservados`}
          </p>
        </div>
      </div>
    </>
  )
}

export default memo(Footer)

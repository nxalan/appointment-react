import React from 'react'
import Styles from './header-styles.scss'
import { GiSyringe } from 'react-icons/gi';
import { IoMdPeople, } from 'react-icons/io';
import { MdPersonAddAlt1} from 'react-icons/md';
import { Link } from 'react-router-dom';

export const navMap = [
  { name: 'Listar Agendamentos', to: '/', icon: <IoMdPeople /> },
  { name: 'Adicionar Agendamento', to: '/agendamento', icon: <MdPersonAddAlt1 /> },
];

const HomeHeader: React.FC = () => {
  return (
    <div className={Styles.root}>
      <div className={Styles.subLogo}>
        <Link to="/">
          <div className={Styles.subLogoText}>
            <GiSyringe /> Agendamentos.com
          </div>
        </Link>
      </div>
      <div className={Styles.navBar}>
          {navMap.map((nav) => (
            <div
              className={Styles.navButton}
              key={nav.name}
            >
              <Link to={nav.to}>
                {nav.icon}
                {nav.name}
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

export default HomeHeader

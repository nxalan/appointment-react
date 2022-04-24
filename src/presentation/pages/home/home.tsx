/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './home-styles.scss'
import { Footer, Header, Input, Button, FormStatus } from '@/presentation/components'
import { useHistory } from 'react-router-dom'
import { MdOutlineCoronavirus } from 'react-icons/md'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material'
import { GridExpandMoreIcon } from '@mui/x-data-grid'

const HomePage: React.FC = () => {
  const history = useHistory()

  return (
    <div className={Styles.root}>
      <div className={Styles.headerBase}>
        <Header />
      </div>
      <div className={Styles.homeCenter}>
      <div className={Styles.title}>
        Plataforma de Agendamentos Para COVID19
        <div className={Styles.icon}>
        <MdOutlineCoronavirus />
      </div>
      </div>
        <div className={Styles.buttons}>
          <Button
            buttonLabel="Listar Agendamentos"
            type="submit"
            onClick={() => history.push('/agendamentos')}
          />
          <Button
            buttonLabel="Adicionar Agendamento"
            type="submit"
            onClick={() => history.push('/agendamento')}
          />
        </div>
        <div className={Styles.homeBottom}>
          <Accordion>
            <AccordionSummary
              expandIcon={<GridExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Qual o limite de agendamento diário?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                O limite de agendamento diário atualmente é de 20 agendamentos. 
                Se o limite for alcançado, o calendário seletor de data automaticamente desativará o dia e não será possivel seleciona-lo!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<GridExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Qual o limite de agendamento por hora?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                O limite de agendamento diário atualmente é de 2 agendamentos. 
                Se o limite for alcançado, o relógio seletor de horário automaticamente desativará a hora e não será possivel seleciona-la!
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className={Styles.footerBase}>
        <Footer />
      </div>
    </div>
  )
}

export default HomePage

import React from 'react'
import { Main } from './style'
import Character from '../Character'

const Square = ({color, code}) => {
  return (
    <Main color={color} code={code}>
      <Character code={code} />
    </Main>
  )
}

export default Square
import './Card.css'
import { useState, useEffect } from 'react'

import { CardType } from './utils'

interface CardProps {
  value: number | string
  selected: boolean
  cleared?: boolean
  handleCardClick?: (value: number | string) => void
  deckType: string
  cardType: string
  delayRunning?: boolean
}

const Card = ({
  value,
  selected,
  cleared,
  handleCardClick,
  deckType,
  cardType,
  delayRunning,
}: CardProps) => {
  const [deckIcon, setDeckIcon] = useState<string>('')

  useEffect(() => {
    switch (deckType) {
      case 'numbers':
        setDeckIcon('#')
        break
      case 'emoji':
        setDeckIcon('🎨')
        break
    }
  }, [deckType])

  return (
    <div
      className={`card-wrapper
        ${cardType === 'game' ? ' game-card' : ''}
        ${cardType === 'select' ? ' select-deck-card' : ''}
        ${cardType === 'victory' ? ' victory-card-wrapper' : ''}
        ${cleared ? ' cleared' : ''}
        ${
          selected ? (cardType === 'game' ? ' selected' : ' selected-deck') : ''
        }
        ${deckType === 'numbers' ? ' number-card' : ''}
        ${deckType === 'emoji' ? ' emoji-card' : ''}
        ${!delayRunning ? ' selectable' : ''}`}
      onClick={() =>
        cardType === 'game' && handleCardClick
          ? handleCardClick(value)
          : () => {}
      }
    >
      <div className='content'>
        <div className={`card-back`}>{deckIcon}</div>
        <div className='card-front'>{value}</div>
      </div>
    </div>
  )
}

export default Card

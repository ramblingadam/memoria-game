/*
deck:
  [
    {
      value: number,
      selected: boolean,
      cleared: boolean
    }
  ]

state:
current deck (deck array)
gameOver(boolean)
selected(single card + index property)
need index to keeptrack of which was clicked on first, so that clicking on it again doesn't tirgger a math or anything



*/

import './App.css'
import { useState } from 'react'

import { buildDeck } from './utils'
import Card from './Card'
import Timer from './Timer'
import TitleCard from './TitleCard'
import HighScores from './HighScores'

// TYPES
import { CardType, DeckType, SelectableDeck } from './utils'
type DifficultyType = null | 'easy' | 'medium' | 'hard'
type selectedCardType = {
  value: number | string
  selected: boolean
  cleared: boolean
  i?: number
}

// CONST VARS
const APP_TITLE = 'MEMORIA'
const VICTORY_TEXT = 'YOU WIN!'

export default function App() {
  const [gameState, setGameState] = useState('new')
  const [newHighScore, setNewHighScore] = useState(false)

  const [deck, setDeck] = useState<null | DeckType>(null)
  const [size, setSize] = useState(new Array(6).fill(6))
  const [selectedDeck, setSelectedDeck] = useState<SelectableDeck>('emoji')
  const [difficulty, setDifficulty] = useState<DifficultyType>(null)

  const [selected, setSelected] = useState<selectedCardType | null>(null)
  const [delayRunning, setDelayRunning] = useState(false)

  const [timerRunning, setTimerRunning] = useState(false)
  const [resetTimer, setResetTimer] = useState(true)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const handleDifficultyClick = (difficulty: DifficultyType) => {
    switch (difficulty) {
      case 'easy':
        console.log('Easy selected.')
        setDifficulty('easy')
        setSize(new Array(4).fill(4))
        setDeck(buildDeck(8, selectedDeck))
        break
      case 'medium':
        console.log('Medium selected.')
        setDifficulty('medium')
        setSize(new Array(6).fill(6))
        setDeck(buildDeck(18, selectedDeck))
        break
      case 'hard':
        console.log('Hard selected.')
        setDifficulty('hard')
        setSize(new Array(8).fill(8))
        setDeck(buildDeck(32, selectedDeck))
        break
      default:
        console.log(`SHOULDN'T BE HERE`)
    }
    setGameState('active')
    setResetTimer(true)
    setTimerRunning(true)
  }

  const handleResetClick = () => {
    setGameState('new')
    setTimerRunning(false)
    setDifficulty(null)
  }

  const handleCardClick = (card: CardType, i: number) => {
    if (delayRunning) return

    if (selected === null) {
      // const deckCopy = deck
      const deckCopy = deck!.map((card, cardI) => {
        if (cardI === i) {
          return { ...card, selected: true }
        } else return card
      })
      setDeck(deckCopy)
      setSelected({ ...card, i })
      return
    }

    if (selected.i === i) {
      // console.log('already selected')
      return
    } else {
      setDelayRunning(true)
      let deckCopy = deck!.map((card, cardI) => {
        if (cardI === i) {
          return { ...card, selected: true }
        } else return card
      })
      setDeck(deckCopy)
    }

    if (selected.value === card.value) {
      // console.log('match found!')

      setTimeout(() => {
        const deckCopy = deck!.map((card) => {
          if (card.value === selected.value) return { ...card, cleared: true }
          else return card
        })
        if (deckCopy.every((card) => card.cleared === true)) {
          console.log('YOU WIN!')
          setTimerRunning(false)
          setTimeout(() => {
            setGameState('over')
            setDelayRunning(false)
          }, 1000)
        }
        setDeck(deckCopy)
        setSelected(null)
        setDelayRunning(false)
      }, 800)
    } else {
      //mismatch
      // console.log('mismatch!')
      setTimeout(() => {
        const deckCopy = deck!.map((card) => {
          return { ...card, selected: false }
        })
        setDeck(deckCopy)
        setSelected(null)
        setDelayRunning(false)
      }, 800)
    }
  }

  const handleDeckSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setSelectedDeck(e.target.value as SelectableDeck)
  }

  return (
    <main className='gradient-background'>
      <h1 className='title-wrapper'>
        {APP_TITLE.split('').map((char, i) => (
          <TitleCard
            value={char}
            gameState={gameState}
            key={i}
          />
        ))}
      </h1>
      <h2 className='social-icons'>
        <a
          href='https://github.com/ramblingadam'
          target='_blank'
        >
          <i className='fa-brands fa-github'></i>
        </a>
        <a
          href='https://twitter.com/ramblingadam'
          target='_blank'
        >
          <i className='fa-brands fa-twitter'></i>
        </a>
        <a
          href='https://www.linkedin.com/in/adam-morsa/'
          target='_blank'
        >
          <i className='fa-brands fa-linkedin'></i>
        </a>
      </h2>

      {/* DECK SELECTION */}
      {gameState === 'new' && (
        <section className='deck-select-wrapper'>
          <h2 className='deck-select-heading'>Choose Your Deck</h2>
          <div className='deck-select-options'>
            {/* Emoji */}
            <label className='deck-select-option'>
              <Card
                value={'⭐'}
                selected={selectedDeck === 'emoji'}
                deckType={'emoji'}
                cardType={'select'}
              />
              <input
                type='radio'
                name='deck-type'
                value='emoji'
                id='emoji'
                onChange={handleDeckSelect}
              />
            </label>
            {/* Numbers */}
            <label className='deck-select-option'>
              <Card
                value={12}
                selected={selectedDeck === 'numbers'}
                deckType={'numbers'}
                cardType={'select'}
              />
              <input
                type='radio'
                name='deck-type'
                value='numbers'
                id='numbers'
                onChange={handleDeckSelect}
              />
            </label>
          </div>
        </section>
      )}

      {/* DIFFICULTY SELECT */}
      {gameState === 'new' && (
        <section className='difficulty-select'>
          <button
            onClick={() => handleDifficultyClick('easy')}
            className='btn-easy'
          >
            Easy
          </button>
          <button
            onClick={() => handleDifficultyClick('medium')}
            className='btn-medium'
          >
            Medium
          </button>
          <button
            onClick={() => handleDifficultyClick('hard')}
            className='btn-hard'
          >
            Hard
          </button>
        </section>
      )}

      {/* VICTORY TEXT */}
      {gameState === 'over' && (
        <h1 className='victory-text'>
          {VICTORY_TEXT.split('').map((char, i) => (
            <TitleCard
              value={char}
              key={i}
              bannerType={'victory'}
              index={i}
            />
          ))}
        </h1>
      )}

      {/* TIMER */}
      {gameState === 'active' && (
        <Timer
          timerRunning={timerRunning}
          resetTimer={resetTimer}
          setResetTimer={setResetTimer}
          gameState={gameState}
          elapsedSeconds={elapsedSeconds}
          setElapsedSeconds={setElapsedSeconds}
        />
      )}

      {/* HIGH SCORES */}
      {gameState !== 'active' && (
        <HighScores
          difficulty={difficulty}
          gameState={gameState}
          elapsedSeconds={elapsedSeconds}
          newHighScore={newHighScore}
          setNewHighScore={setNewHighScore}
        />
      )}

      {/* GAME BOARD */}
      {gameState === 'active' && (
        <section className='board-wrapper'>
          {size.map((row, rowI) => (
            <div
              className='row'
              key={rowI}
            >
              {deck!
                .slice(rowI * size.length, size.length * (rowI + 1))
                .map((card, i) => (
                  <Card
                    key={i}
                    value={card.value}
                    selected={card.selected}
                    cleared={card.cleared}
                    deckType={selectedDeck}
                    cardType={'game'}
                    delayRunning={delayRunning}
                    handleCardClick={() =>
                      handleCardClick(card, rowI * size.length + i)
                    }
                  />
                ))}
            </div>
          ))}
        </section>
      )}

      {/* RESET BUTTON */}
      {gameState !== 'new' && !newHighScore && (
        <button
          onClick={handleResetClick}
          className={`btn-reset`}
        >
          Reset
        </button>
      )}
    </main>
  )
}

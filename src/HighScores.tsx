/*
{
  easy: [
    {
      seconds: number (of seconds)
      name: string
      date: string
    }
  ]
  medium: [
    {
      seconds: number (of seconds)
      name: string
      date: string
    }
  ]
  hard: [
    {
      seconds: number (of seconds)
      name: string
      date: string
    }
  ]
}
*/
import { useState, useEffect } from 'react'
import './HighScores.css'

import Timer from './Timer'

class Score {
  seconds: number
  name: string
  constructor(seconds: number, name: string) {
    this.seconds = seconds
    this.name = name
  }
}

const DEFAULT_SCORES = {
  easy: new Array(10).fill(new Score(3600, '---')),
  medium: new Array(10).fill(new Score(3600, '---')),
  hard: new Array(10).fill(new Score(3600, '---')),
}

interface HighScoresProps {
  difficulty: string | null
  gameState: string
  elapsedSeconds: number
  newHighScore: boolean
  setNewHighScore: React.Dispatch<React.SetStateAction<boolean>>
}

const HighScores = ({
  difficulty,
  gameState,
  elapsedSeconds,
  newHighScore,
  setNewHighScore,
}: HighScoresProps) => {
  const [scores, setScores] = useState(
    localStorage.getItem('scores')
      ? JSON.parse(localStorage.getItem('scores')!)
      : DEFAULT_SCORES
  )

  const [nameEntry, setNameEntry] = useState('')

  // Put default scores in localStorage if not present.
  useEffect(() => {
    if (!localStorage.getItem('scores')) {
      localStorage.setItem('scores', JSON.stringify(DEFAULT_SCORES))
    }
  }, [])

  // This effect will let the user input their name if they got a high score.
  useEffect(() => {
    if (gameState !== 'over') return

    const scores = localStorage.getItem('scores')
    if (scores !== null) {
      const currentDiffScores = JSON.parse(scores)[difficulty!].sort(
        (a: any, b: any) => a.seconds - b.seconds
      )
      const lowestScore = currentDiffScores[9]
      if (elapsedSeconds < lowestScore.seconds) {
        console.log('new high score!')
        setNewHighScore(true)
      }
    }
  }, [gameState])

  useEffect(() => {
    if (!newHighScore) return
    const highScoreInput = document.querySelector(
      '#high-score-input'
    ) as HTMLInputElement
    highScoreInput.focus()
  }, [newHighScore])

  const handleNameEntryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameEntry(e.target.value)
  }

  const handleHighScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const scoresString = localStorage.getItem('scores')
    const currentDiffScores = JSON.parse(scoresString!)[difficulty!].sort(
      (a: any, b: any) => a.seconds - b.seconds
    )
    currentDiffScores[9] = new Score(elapsedSeconds, nameEntry)
    currentDiffScores.sort((a: any, b: any) => a.seconds - b.seconds)
    const allScores = {
      ...scores,
      [difficulty!]: currentDiffScores,
    }
    setScores(allScores)
    setNewHighScore(false)
    localStorage.setItem('scores', JSON.stringify(allScores))
  }

  const handleResetScoresClick = () => {
    if (window.confirm('Really reset high scores?')) {
      localStorage.setItem('scores', JSON.stringify(DEFAULT_SCORES))
      setScores(DEFAULT_SCORES)
    }
  }

  return (
    <section className='high-scores-wrapper'>
      {gameState === 'new' && (
        <div className='high-scores-heading-wrapper'>
          <div className='high-scores-heading-deco'></div>
          <h2 className='high-scores-heading'>High Scores</h2>
          <div className='high-scores-heading-deco'></div>
        </div>
      )}

      <div className='high-score-tables-wrapper'>
        {(difficulty === 'easy' || difficulty === null) && (
          <ul className='easy scores-list-wrapper'>
            {/* <h3 className='high-scores-heading'>Easy</h3> */}
            {scores.easy.map((score: Score, i: number) => (
              <li
                className='score-wrapper'
                key={i}
              >
                <span className='score-seconds'>
                  {`${Math.floor(score.seconds / 60)
                    .toString()
                    .padStart(2, '0')}:${(score.seconds % 60)
                    .toString()
                    .padStart(2, '0')}`}
                </span>
                <span className='score-name'>{score.name}</span>
              </li>
            ))}
          </ul>
        )}

        {(difficulty === 'medium' || difficulty === null) && (
          <ul className='medium scores-list-wrapper'>
            {/* <h3 className='high-scores-heading'>Medium</h3> */}
            {scores.medium.map((score: Score, i: number) => (
              <li
                className='score-wrapper'
                key={i}
              >
                <span className='score-seconds'>
                  {`${Math.floor(score.seconds / 60)
                    .toString()
                    .padStart(2, '0')}:${(score.seconds % 60)
                    .toString()
                    .padStart(2, '0')}`}
                </span>
                <span className='score-name'>{score.name}</span>
              </li>
            ))}
          </ul>
        )}

        {(difficulty === 'hard' || difficulty === null) && (
          <ul className='hard scores-list-wrapper'>
            {/* <h3 className='high-scores-heading'>Hard</h3> */}
            {scores.hard.map((score: Score, i: number) => (
              <li
                className='score-wrapper'
                key={i}
              >
                <span className='score-seconds'>
                  {`${Math.floor(score.seconds / 60)
                    .toString()
                    .padStart(2, '0')}:${(score.seconds % 60)
                    .toString()
                    .padStart(2, '0')}`}
                </span>
                <span className='score-name'>{score.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {gameState === 'new' && (
        <button
          className='btn-score-reset'
          onClick={handleResetScoresClick}
        >
          Reset Scores
        </button>
      )}

      {/* HIGH SCORE ENTRY */}
      {newHighScore && (
        <form
          className='new-high-score-form'
          onSubmit={handleHighScoreSubmit}
        >
          <label className='new-high-score-label'>
            <h2 className='high-scores-heading new-high-score-heading'>
              New High Score!
            </h2>
            <Timer elapsedSeconds={elapsedSeconds} />
            <input
              type='text'
              className='new-high-score-input'
              name='high-score-name'
              id='high-score-name'
              placeholder='Your Name'
              maxLength={7}
              value={nameEntry}
              onChange={handleNameEntryChange}
            ></input>
            <button>Submit</button>
          </label>
        </form>
      )}
    </section>
  )
}

export default HighScores

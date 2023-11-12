import { useEffect, useState } from 'react'

interface TitleCardProps {
  value: string
  gameState?: string
  bannerType?: string
  index?: number
}

const roll = (min: number, max: number) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min
}

const TitleCard: React.FC<TitleCardProps> = ({
  value,
  gameState,
  bannerType,
  index,
}) => {
  const [flipped, setFlipped] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [spinning, setSpinning] = useState(false)

  let flipInterval = roll(2000, 5000)

  let interval: any = null
  let delay: any = null

  useEffect(() => {
    switch (bannerType) {
      case 'victory':
        clearInterval(interval)
        clearTimeout(delay)
        delay = setTimeout(() => {
          setFlipped(false)
          setSpinning(true)
        }, 100 * index!)

        break
      default:
        if (gameState === 'active' || gameState === 'over') {
          setFlipped(true)
          return
        }
        if (hovered) {
          clearInterval(interval)
          clearTimeout(delay)
          setFlipped(true)
        } else {
          delay = setTimeout(() => {
            setFlipped(false)
            interval = setInterval(() => {
              setFlipped((prevFlipState) => !prevFlipState)
            }, flipInterval)
          }, flipInterval)
        }
        break
    }

    return () => {
      clearInterval(interval)
      clearTimeout(delay)
    }
  }, [hovered, gameState])

  const handleCardHover = (hovered: boolean) => {
    if (bannerType === 'victory') return
    switch (hovered) {
      case true:
        setHovered(true)
        break
      case false:
        setHovered(false)
        break
      default:
        console.log(`Shouldn't be here!`)
    }
  }

  return (
    <div
      className={`card-wrapper banner-card${flipped ? ' selected' : ''}${
        spinning ? ' spin' : ''
      }`}
      onMouseEnter={() => handleCardHover(true)}
      onMouseLeave={() => handleCardHover(false)}
    >
      <div className='content'>
        <div className='card-back'></div>
        <div className='card-front'>{value}</div>
      </div>
    </div>
  )
}

export default TitleCard

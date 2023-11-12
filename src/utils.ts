const EMOJI_PICS = [
  '🙂',
  '😁',
  '😅',
  '🤣',
  '🙃',
  '😇',
  '🥰',
  '🤩',
  '🤪',
  '🤫',
  '🙄',
  '😴',
  '🤢',
  '🥵',
  '🥶',
  '🤯',
  '🤠',
  '🥳',
  '😎',
  '🤓',
  '🧐',
  '🙁',
  '😲',
  '😳',
  '😨',
  '😭',
  '😱',
  '😖',
  '😩',
  '😡',
  '😤',
  '🤬',
  '😈',
  '💀',
  '💩',
  '🤡',
  '👹',
  '👺',
  '👻',
  '👽',
  '👾',
  '🤖',
  '😸',
  '😹',
  '😻',
  '🙀',
  '🙈',
  '🙉',
  '🙊',
  '💖',
  '💋',
  '💥',
  '💫',
  '💦',
  '👁️‍🗨️',
  '🧠',
  '🦷',
  '🦿',
  '👃',
  '🦴',
  '🧑',
  '🧔',
  '👧',
  '👨‍🦰',
  '👨‍🦱',
  '👨‍🦳',
  '👩',
  '👩‍🦰',
  '👩‍🦱',
  '👩‍🦳',
  '👱‍♀️',
  '👴',
  '👵',
  '🧛',
  '🧙',
  '🧜‍♀️',
  '🧞',
  '🧟',
  '🧟‍♀️',
  '🏇',
  '💎',
  '🔔',
  '🎵',
  '🎸',
]
const EMOJI_PICS_2 = [
  '🥰',
  '🤢',
  '🥵',
  '🥶',
  '🤯',
  '🤠',
  '😈',
  '💀',
  '💩',
  '🤡',
  '👹',
  '👺',
  '👻',
  '👽',
  '👾',
  '🤖',
  '😸',
  '😹',
  '😻',
  '🙀',
  '🙈',
  '🙉',
  '🙊',
  '💖',
  '💋',
  '💥',
  '💫',
  '💦',
  '👁️‍🗨️',
  '🧠',
  '🦷',
  '🦿',
  '👃',
  '🦴',
  '🧔',
  '👨‍🦰',
  '👨‍🦱',
  '👩‍🦰',
  '👴',
  '👵',
  '🧛',
  '🧙',
  '🧜‍♀️',
  '🧞',
  '🧟',
  '🧟‍♀️',
  '🏇',
  '💎',
  '🔔',
  '🎵',
  '🎸',
  '🎲',
  '🎮',
  '🏈',
  '🎃',
  '🌈',
  '⭐',
]

class CardClass {
  value: number | string
  selected: boolean
  cleared: boolean
  constructor(
    value: number | string,
    selected: boolean = false,
    cleared: boolean = false
  ) {
    this.value = value
    this.selected = selected
    this.cleared = cleared
  }
}

export type CardType = {
  value: number | string
  selected: boolean
  cleared: boolean
}

export type SelectableDeck = 'numbers' | 'emoji'

export type DeckType = CardType[]

function shuffle(array: any[]) {
  var m = array.length,
    t,
    i

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--)

    // And swap it with the current element.
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }

  return array
}

export const buildDeck = (numOfPairs: number, deckType: SelectableDeck) => {
  let emojiPics: string[] = []
  if (deckType === 'emoji') {
    emojiPics = shuffle(EMOJI_PICS_2).slice(0, numOfPairs)
  }

  const deck: CardType[] = []

  for (let i = 0; i < numOfPairs; i++) {
    switch (deckType) {
      case 'emoji':
        deck.push(new CardClass(emojiPics![i]))
        deck.push(new CardClass(emojiPics![i]))
        break
      default:
        deck.push(new CardClass(i))
        deck.push(new CardClass(i))
    }
  }
  return shuffle(deck)
}

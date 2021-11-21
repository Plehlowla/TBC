const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You work at TBC for XYZ Company. Choose your character.',
    options: [
      {
        text: 'Pah',
        // setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Rick',
        nextText: 2
      },
      {
        text: 'Cody',
        nextText: 2
      },
      {
        text: 'Morty',
        nextText: 2
      },
      {
        text: 'Kenny',
        nextText: 2
      },
      {
        text: 'Tom',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You came back from a one week vaction, you grab the ipad and see that mangement have double booked everything from 10AM till 5PM and there is only 3 people total working today...',
    options: [
      {
        text: 'Leave',
        // requiredState: (currentState) => currentState.blueGoo,
        // setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Talk to management',
        // requiredState: (currentState) => currentState.blueGoo,
        // setState: { blueGoo: false, shield: true },
        nextText: 4
      },
      {
        text: 'Deal with it',
        nextText: 5
      }
    ]
  },
  {
    id: 3,
    text: 'You left and got pointed but abandoned your fellow co-worker for a easy way out...',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    //   {
    //     text: 'Find a room to sleep at in the town',
    //     nextText: 5
    //   },
    //   {
    //     text: 'Find some hay in a stable to sleep in',
    //     nextText: 6
    //   }
    ]
  },
  {
    id: 4,
    text: "You went to management, they said they'll come over but never did...",
    options: [
      {
        text: 'Try Again',
        nextText: 4.5
      }
    ]
  },
  {
    id: 4.5,
    text: "You've been ignored",
    options: [
      {
        text: 'Pick a different opition',
        nextText: 2
      },
      {
        text: 'Leave',
        nextText: 3
      }
    ]
  },
  {
    id: 5,
    text: 'You chose to deal with it, both of the other co-worker are morning shift and at 4:30PM, they left you alone.',
    options: [
      {
        text: 'Get mangament to help',
        nextText: 7
      },
      {
        text: 'Leave with them.',
        nextText: 6
      }
    ]
  },
  {
    id: 6,
    text: 'You left early with the others, you got half a point for that.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'You went to management and they said just work on the car alone and when you need to do a quality check ask one of the manager...',
    options: [
      {
        text: 'Continue working',
        nextText: 9
      },
      {
        text: 'Leave.',
        // requiredState: (currentState) => currentState.shield,
        nextText: 8
      }
    ]
  },
  {
    id: 8,
    text: 'You left, got half a point and the 5PM appointment got reschedule...',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You continued working, till 6 and got managers to help with QC and backing out. You got 2 hrs left...',
    options: [
      {
        text: 'Use PTO and leave.',
        nextText: 10
      },
      {
        text: 'Stay till end of shift then leave.',
        nextText: 11
      }
    ]
  },
  {
    id: 10,
    text: 'You left work succesfully without getting a single point. But used 2hr worth of PTO. CONGRATS!',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You made it through the day, not throwing a fit. You are the true MVP! Congrats!',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()
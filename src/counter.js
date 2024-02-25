const $counter = document.querySelector('#counter')

const createCounter = ({ initValue = 0, minValue = 0, maxValue = Infinity } = {}) => {
  let count = 0
  return {
    increment: () => {
      if (count < maxValue) {
        count++
      }
    },
    decrement: () => {
      if (count > minValue) {
        count--
      }
    },
    getCount: () => count
  }
}

const counter = createCounter()

export const initCounter = () => {
  $counter.addEventListener('click', event => {
    const { target } = event
    if (target && target.tagName !== 'BUTTON') {
      return null
    }

    const { id } = target?.dataset
    id && counter[id]()
    const $counterText = $counter?.querySelector('span')
    $counterText.textContent = String(counter.getCount()).padStart(2, '0')
  })
}

import raf from 'raf'

const easeInOutQuint = (t, b, _c, d) => {
  const c = _c - b

  if ((t /= d / 2) < 1) {
    return c / 2 * t * t * t * t * t + b
  } else {
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
  }
}

const init = ({
  className = 'js-tinyscroll',
  duration: defaultDuration = 2000,
  ease = easeInOutQuint
} = {}) => {
  const els = [ ...document.querySelectorAll(`.${className}`) ]

  els.map(el => {
    const href = el.getAttribute('href')
    const duration = parseInt(el.dataset.duration || defaultDuration, 10)

    if (href && href.indexOf('#') === 0) {
      const id = href.substring(1)
      const target = document.getElementById(id)

      el.addEventListener('click', e => {
        e.preventDefault()

        const begin = document.body.scrollTop
        const end = begin + target.getBoundingClientRect().top
        const startTime = Date.now()

        const scroll = () => {
          const now = Date.now()
          const time = now - startTime

          if (time < duration) {
            window.scrollTo(0, ease(time, begin, end, duration))
            raf(scroll)
          } else {
            window.scrollTo(0, end)
          }
        }

        raf(scroll)
      })
    }
  })
}

export default init

import raf from 'raf'

const easeInOutQuint = (t, b, _c, d) => {
  const c = _c - b

  if ((t /= d / 2) < 1) {
    return c / 2 * t * t * t * t * t + b
  } else {
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
  }
}

const hash = x => {
  if (x.indexOf('#') !== -1) {
    const [ url, id ] = x.split('#')

    return {
      url: url !== '' ? url : undefined,
      id
    }
  }
}

const scrollTo = (target, {
  duration = 2000,
  ease = easeInOutQuint,
  offset = 0,
  callback = null
} = {}) => {
  const begin = document.documentElement.scrollTop || document.body.scrollTop
  const end = begin + target.getBoundingClientRect().top - offset
  const startTime = Date.now()

  const scroll = () => {
    const now = Date.now()
    const time = now - startTime

    if (time < duration) {
      window.scrollTo(0, ease(time, begin, end, duration))
      raf(scroll)
    } else {
      window.scrollTo(0, end)

      if (callback) {
        callback()
      }
    }
  }

  raf(scroll)
}

const init = ({
  className = 'js-tinyscroll',
  duration: defaultDuration = 2000,
  ease = easeInOutQuint,
  offset = 0,
  callback = null
} = {}) => {
  const els = [ ...document.querySelectorAll(`.${className}`) ]

  els.map(el => {
    const href = el.getAttribute('href')

    if (href) {
      const { url, id } = hash(href)

      if (id && (
        !url ||
        url === window.location.pathname ||
        url === `${window.location.origin}${window.location.pathname}`
      )) {
        const target = document.getElementById(id)
        const duration = parseInt(el.dataset.duration || defaultDuration, 10)

        if (target) {
          el.addEventListener('click', e => {
            e.preventDefault()
            scrollTo(target, { duration, ease, offset, callback })
          })
        }
      }
    }
  })
}

export { init, scrollTo }

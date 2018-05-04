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
  blockCancel = false,
  duration = 2000,
  ease = easeInOutQuint,
  offset = 0,
  onStart,
  onComplete,
  onCancel
} = {}) => {
  if (typeof onStart === 'function') {
    onStart()
  }

  const begin = document.documentElement.scrollTop || document.body.scrollTop
  const end = begin + target.getBoundingClientRect().top - offset
  const startTime = Date.now()

  let cancelled = false

  const cancel = e => {
    const position = document.documentElement.scrollTop || document.body.scrollTop
    const tinyscrollPosition = Math.floor(document.body.getAttribute('data-tinyscroll-position'))

    if (position !== tinyscrollPosition) {
      cancelled = true
    }
  }

  if (!blockCancel) {
    window.addEventListener('scroll', cancel, false)
  }

  const scroll = () => {
    if (cancelled) {
      window.removeEventListener('scroll', cancel, false)

      document.body.removeAttribute('data-tinyscroll-position')

      if (typeof onCancel === 'function') {
        onCancel()
      }

      return
    }

    const now = Date.now()
    const time = now - startTime

    if (time < duration) {
      const position = ease(time, begin, end, duration)

      document.body.setAttribute('data-tinyscroll-position', position)

      window.scrollTo(0, position)

      raf(scroll)
    } else {
      window.scrollTo(0, end)

      document.body.removeAttribute('data-tinyscroll-position')

      if (typeof onComplete === 'function') {
        onComplete()
      }
    }
  }

  raf(scroll)
}

const init = ({
  blockCancel = false,
  className = 'js-tinyscroll',
  duration: defaultDuration = 2000,
  ease = easeInOutQuint,
  offset = 0,
  onStart,
  onComplete,
  onCancel
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
            scrollTo(target, { blockCancel, duration, ease, offset, onStart, onComplete, onCancel })
          })
        }
      }
    }
  })
}

export { init, scrollTo }

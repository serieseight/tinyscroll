# Tiny Scroll

A tiny scrolling library for your in-page links.

- Plain old vanilla JS.
- Just 1.6kb gzipped.
- Uses `requestAnimationFrame` for great performance.

## Examples

### Codepen

- [Hello world](http://codepen.io/colinmeinke/pen/eBZZVo)
- [Hello world with options](http://codepen.io/colinmeinke/pen/Vmaadm)

Alternatively, take a look in `/examples`.

## Installation

```
npm install tinyscroll
```

## The `init` function

The Tiny Scroll `init` function looks for all in page links with a certain class name (by default `js-tinyscroll`), and replaces the default click behaviour with
a smooth scrolling action.

### Usage


```html
<a href="#hello-world" class="js-tinyscroll">
  Scroll to Hello World section
</a>

<section id="hello-world">
  <h1>Hello world</h1>
</section>
```

```js
import * as tinyscroll from 'tinyscroll'
tinyscroll.init()
```

### Options

The `init` function can optionally take an object as the first argument, that
may include the following properties.

#### className

The class name that Tiny Scroll uses to locate links.
Defaults to `js-tinyscroll`.

```js
tinyscroll.init({ className: 'my-special-class' })
```

#### duration

The scroll duration in milliseconds.
Defaults to 2000.

```js
tinyscroll.init({ duration: 500 })
```

#### ease

The tweening function that is used to ease scroll position.
Defaults to `easeInOutQuint`. Only `easeInOutQuint` is built
in. Using this property will require you to import and use
a function from
[tween-functions](https://github.com/chenglou/tween-functions).

```js
import { easeOutElastic } from 'tween-functions'
tinyscroll.init({ ease: easeOutElastic })
```

#### callback

A callback function which will automatically be triggered after Tiny Scroll is done.

```js
tinyscroll.init({
  callback: function() {
    alert('Done!')
  }
})
```

## The `scrollTo` function

The `scrollTo` function is used to smoothly scroll to any element within a page. A target DOM node must be passed into the `scrollTo` function as the first argument.

### Usage


```html
<button type="button">
  Scroll to Hello World section
</button>

<section>
  <h1>Hello world</h1>
</section>
```

```js
import * as tinyscroll from 'tinyscroll'

const trigger = document.querySelector('button')
const target = document.querySelector('section')

trigger.addEventListener('click', () => {
  tinyscroll.scrollTo(target)
})
```

### Options

The `scrollTo` function can optionally take an object as the second argument, that may include the following properties.

#### duration

The scroll duration in milliseconds.
Defaults to 2000.

```js
tinyscroll.scrollTo(target, { duration: 500 })
```

#### ease

The tweening function that is used to ease scroll position.
Defaults to `easeInOutQuint`. Only `easeInOutQuint` is built
in. Using this property will require you to import and use
a function from
[tween-functions](https://github.com/chenglou/tween-functions).

```js
import { easeOutElastic } from 'tween-functions'
tinyscroll.scrollTo(target, { ease: easeOutElastic })
```

#### offset

The number of pixels to offset the scroll to endpoint by. Defaults to 0.

```js
tinyscroll.scrollTo(target, { offset: -200 })
```

#### callback

A callback function which will automatically be triggered after Tiny Scroll is done.

```js
tinyscroll.scrollTo(target, {
  callback() {
    alert('Done!')
  }
})
```

## Data attributes

It can be useful to override Tiny Scroll's options on a
case-by-case basis.

### duration

In the following case the duration will be 500ms.
The `tinyscroll` duration option is overridden by the
`data-duration` attribute on the anchor element.

```html
<a
  href="#hello-world"
  class="js-tinyscroll"
  data-duration="500"
>
  Scroll to Hello World section
</a>

<section id="hello-world">
  <h1>Hello world</h1>
</section>
```

```js
import * as tinyscroll from 'tinyscroll'
tinyscroll.init({ duration: 3000 })
```

## Browser support

Tiny Scroll is packaged with Babel, and
[makes use of `Array.from`](https://babeljs.io/docs/usage/caveats).
If you want Tiny Scroll to work on browsers that don't support
this method (e.g. IE11), then you will need to
[polyfill `Array.from`](https://github.com/zloirock/core-js)
before calling `tinyscroll`.

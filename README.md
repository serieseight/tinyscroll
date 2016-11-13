# Tiny Scroll

A tiny scrolling library for your in-page links

- Plain old vanilla JS
- Just 1.2kb gzipped
- Uses `requestAnimationFrame` for great performance

## Examples

### Codepen

- [Hello world](http://codepen.io/colinmeinke/pen/eBZZVo)
- [Hello world with options](http://codepen.io/colinmeinke/pen/Vmaadm)

Alternatively, take a look in `/examples`.

## Installation

```
npm install tinyscroll
```

## Usage

```html
<a href="#hello-world" class="js-tinyscroll">
  Scroll to Hello World section
</a>

<section id="hello-world">
  <h1>Hello world</h1>
</section>
```

```js
import tinyscroll from 'tinyscroll'
tinyscroll()
```

## Options

The `tinyscroll` function can take an object, that
may include the following properties.

### className

The class name that Tiny Scroll uses to locate links.
Defaults to `js-tinyscroll`.

```js
tinyscroll({ className: 'my-special-class' })
```

### duration

The scroll duration in milliseconds.
Defaults to 2000.

```js
tinyscroll({ duration: 500 })
```

### ease

The tweening function that is used to ease scroll position.
Defaults to `easeInOutQuint`. Only `easeInOutQuint` is built
in. Using this property will require you to import and use
a function from
[tween-functions](https://github.com/chenglou/tween-functions).

```js
import { easeOutElastic } from 'tween-functions'
tinyscroll({ ease: easeOutElastic })
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
import tinyscroll from 'tinyscroll'
tinyscroll({ duration: 3000 })
```

## Browser support

Tiny Scroll is packaged with Babel, and
[makes use of `Array.from`](https://babeljs.io/docs/usage/caveats).
If you want Tiny Scroll to work on browsers that don't support
this method (e.g. IE11), then you will need to
[polyfill `Array.from`](https://github.com/zloirock/core-js)
before calling `tinyscroll`.

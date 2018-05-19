# typed-ui

[![Build Status][build-badge]][build]
[![npm Package][npm-version-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]
[![License][license-badge]][license]
[![Contributors][contributors-badge]][contributors]
[![npm Downloads][npm-downloads-badge]][npm]
[![Github Stars][github-stars-badge]][github]

> Generic UI for the GraphQL Schema Language.

[build-badge]: https://img.shields.io/travis/pi-cubed/typed-ui/master.png?style=flat-square
[build]: https://travis-ci.org/pi-cubed/typed-ui
[npm-version-badge]: https://img.shields.io/npm/v/typed-ui.png?style=flat-square
[npm]: https://www.npmjs.org/package/typed-ui
[coveralls-badge]: https://img.shields.io/coveralls/pi-cubed/typed-ui/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/pi-cubed/typed-ui
[github-stars-badge]: https://img.shields.io/github/stars/pi-cubed/typed-ui.svg?style=social&label=Stars
[github]: https://github.com/pi-cubed/typed-ui
[contributors-badge]: https://img.shields.io/github/contributors/pi-cubed/typed-ui.svg?style=flat-square
[contributors]: https://github.com/pi-cubed/typed-ui/graphs/contributors
[license-badge]: https://img.shields.io/github/license/pi-cubed/typed-ui.svg?style=flat-square
[license]: https://github.com/pi-cubed/typed-ui/blob/master/LICENSE
[npm-downloads-badge]: https://img.shields.io/npm/dt/typed-ui.svg?style=flat-square

## Install

```
$ yarn add typed-ui
```

## Usage

```js
import React, { Component } from "react";
import { render } from "react-dom";
import { StringOutput } from "../../src/PrimitiveOutput";
import { EnumInput } from "../../src/PrimitiveInput";

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>typed-ui Demo</h1>
        <StringOutput data="This is a StringOutput. Below is a EnumInput." />
        <EnumInput options={["a", "b", "c"]} onChange={console.log} />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
```

## API

[Docs](https://pi-cubed.gitbook.io/api.html)

## Maintainers

* [Dylan Richardson](https://github.com/drich14)
* [Craig Valenti](https://github.com/CrazyCreje)

## License

MIT © [Pi Cubed](https://pi-cubed.github.io)

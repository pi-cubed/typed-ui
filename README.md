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

## Docs

https://pi-cubed.gitbook.io/typed-ui

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

## Members

<dl>
<dt><a href="#StringInput">StringInput</a> ⇒ <code>Component</code></dt>
<dd><p>Returns a text field with change events handled by the given callback.</p>
</dd>
<dt><a href="#IntegerInput">IntegerInput</a> ⇒ <code>Component</code></dt>
<dd><p>Returns an integer input component with change events handled by the given callback.</p>
</dd>
<dt><a href="#FloatInput">FloatInput</a> ⇒ <code>Component</code></dt>
<dd><p>Returns a float input component with change events handled by the given callback.</p>
</dd>
<dt><a href="#BooleanInput">BooleanInput</a> ⇒ <code>Component</code></dt>
<dd><p>Returns a boolean input component with change events handled by the given callback.</p>
</dd>
<dt><a href="#EnumInput">EnumInput</a> ⇒ <code>Component</code></dt>
<dd><p>Returns a select component with change events handled by the given callback.</p>
</dd>
<dt><a href="#StringOutput">StringOutput</a> ⇒ <code>Component</code></dt>
<dd><p>Returns a div surrounding the supplied data.</p>
</dd>
<dt><a href="#EnumOutput">EnumOutput</a> ⇒ <code>Component</code></dt>
<dd><p>Returns a readonly multiple select component displaying the supplied data.</p>
</dd>
<dt><a href="#BooleanOutput">BooleanOutput</a> ⇒ <code>Component</code></dt>
<dd><p>Returns a readonly checkbox displaying the value of the supplied boolean.</p>
</dd>
<dt><a href="#IntegerOutput">IntegerOutput</a> ⇒ <code>Component</code></dt>
<dd><p>Returns a readonly number input component displaying the integer.</p>
</dd>
<dt><a href="#FloatOutput">FloatOutput</a> ⇒ <code>Component</code></dt>
<dd><p>Returns a readonly number input component displaying the float.</p>
</dd>
</dl>

<a name="StringInput"></a>

## StringInput ⇒ <code>Component</code>

Returns a text field with change events handled by the given callback.

**Kind**: global variable  
**Returns**: <code>Component</code> - A text field component.

| Param          | Type                                            | Description                    |
| -------------- | ----------------------------------------------- | ------------------------------ |
| props          | <code>Object</code>                             | The component props.           |
| props.onChange | [<code>onChange</code>](#StringInput..onChange) | The handler for change events. |

**Example** _(Logging to console)_

```js
<StringInput onChange={console.log} />
```

<a name="StringInput..onChange"></a>

### StringInput~onChange : <code>function</code>

This callback handles StringInput change events.

**Kind**: inner typedef of [<code>StringInput</code>](#StringInput)

| Param | Type                |
| ----- | ------------------- |
| value | <code>string</code> |

<a name="IntegerInput"></a>

## IntegerInput ⇒ <code>Component</code>

Returns an integer input component with change events handled by the given callback.

**Kind**: global variable  
**Returns**: <code>Component</code> - An integer input component.

| Param          | Type                                             | Description                    |
| -------------- | ------------------------------------------------ | ------------------------------ |
| props          | <code>Object</code>                              | The component props.           |
| props.onChange | [<code>onChange</code>](#IntegerInput..onChange) | The handler for change events. |

**Example** _(Logging to console)_

```js
<IntegerInput onChange={console.log} />
```

<a name="IntegerInput..onChange"></a>

### IntegerInput~onChange : <code>function</code>

This callback handles IntegerInput change events.

**Kind**: inner typedef of [<code>IntegerInput</code>](#IntegerInput)

| Param | Type                 |
| ----- | -------------------- |
| value | <code>integer</code> |

<a name="FloatInput"></a>

## FloatInput ⇒ <code>Component</code>

Returns a float input component with change events handled by the given callback.

**Kind**: global variable  
**Returns**: <code>Component</code> - A float input component.

| Param          | Type                                           | Description                    |
| -------------- | ---------------------------------------------- | ------------------------------ |
| props          | <code>Object</code>                            | The component props.           |
| props.onChange | [<code>onChange</code>](#FloatInput..onChange) | The handler for change events. |

**Example** _(Logging to console)_

```js
<FloatInput onChange={console.log} />
```

<a name="FloatInput..onChange"></a>

### FloatInput~onChange : <code>function</code>

This callback handles FloatInput change events.

**Kind**: inner typedef of [<code>FloatInput</code>](#FloatInput)

| Param | Type               |
| ----- | ------------------ |
| value | <code>float</code> |

<a name="BooleanInput"></a>

## BooleanInput ⇒ <code>Component</code>

Returns a boolean input component with change events handled by the given callback.

**Kind**: global variable  
**Returns**: <code>Component</code> - A boolean input component.

| Param          | Type                                             | Description                    |
| -------------- | ------------------------------------------------ | ------------------------------ |
| props          | <code>Object</code>                              | The component props.           |
| props.onChange | [<code>onChange</code>](#BooleanInput..onChange) | The handler for change events. |

**Example** _(Logging to console)_

```js
<BooleanInput onChange={console.log} />
```

<a name="BooleanInput..onChange"></a>

### BooleanInput~onChange : <code>function</code>

This callback handles BooleanInput change events.

**Kind**: inner typedef of [<code>BooleanInput</code>](#BooleanInput)

| Param | Type                 |
| ----- | -------------------- |
| value | <code>boolean</code> |

<a name="EnumInput"></a>

## EnumInput ⇒ <code>Component</code>

Returns a select component with change events handled by the given callback.

**Kind**: global variable  
**Returns**: <code>Component</code> - A select component.

| Param          | Type                                          | Description                    |
| -------------- | --------------------------------------------- | ------------------------------ |
| props          | <code>Object</code>                           | The component props.           |
| props.options  | <code>Array.&lt;string&gt;</code>             | = The enum options.            |
| props.onChange | [<code>onChange</code>](#EnumInput..onChange) | The handler for change events. |

**Example** _(Logging to console)_

```js
<EnumInput options={["a", "b", "c"]} onChange={console.log} />
```

<a name="EnumInput..onChange"></a>

### EnumInput~onChange : <code>function</code>

This callback handles EnumInput change events.

**Kind**: inner typedef of [<code>EnumInput</code>](#EnumInput)

| Param | Type                                        |
| ----- | ------------------------------------------- |
| value | <code>Object.&lt;string, boolean&gt;</code> |

<a name="StringOutput"></a>

## StringOutput ⇒ <code>Component</code>

Returns a div surrounding the supplied data.

**Kind**: global variable  
**Returns**: <code>Component</code> - A div surrounding the data.

| Param      | Type                | Description          |
| ---------- | ------------------- | -------------------- |
| props      | <code>Object</code> | The component props. |
| props.data | <code>string</code> | The string data.     |

**Example** _(Display the string &quot;abc&quot;)_

```js
<StringOutput data="abc" />
```

<a name="EnumOutput"></a>

## EnumOutput ⇒ <code>Component</code>

Returns a readonly multiple select component displaying the supplied data.

**Kind**: global variable  
**Returns**: <code>Component</code> - A select component displaying the data.

| Param | Type                                        | Description          |
| ----- | ------------------------------------------- | -------------------- |
| props | <code>Object</code>                         | The component props. |
| data  | <code>Object.&lt;string, boolean&gt;</code> | The enum data.       |

**Example** _(Display an enum selection)_

```js
const data = {
  a: false,
  b: true,
  c: true
};
<EnumOutput data={data} />;
```

<a name="BooleanOutput"></a>

## BooleanOutput ⇒ <code>Component</code>

Returns a readonly checkbox displaying the value of the supplied boolean.

**Kind**: global variable  
**Returns**: <code>Component</code> - A chechbox displaying the data.

| Param      | Type                 | Description          |
| ---------- | -------------------- | -------------------- |
| props      | <code>Object</code>  | The component props. |
| props.data | <code>boolean</code> | The boolean data.    |

**Example** _(Display true)_

```js
<BooleanOutput data={true} />
```

<a name="IntegerOutput"></a>

## IntegerOutput ⇒ <code>Component</code>

Returns a readonly number input component displaying the integer.

**Kind**: global variable  
**Returns**: <code>Component</code> - A number input displaying the data.

| Param      | Type                 | Description          |
| ---------- | -------------------- | -------------------- |
| props      | <code>Object</code>  | The component props. |
| props.data | <code>integer</code> | The integer data.    |

**Example** _(Display an integer)_

```js
<IntegerOutput data={true} />
```

<a name="FloatOutput"></a>

## FloatOutput ⇒ <code>Component</code>

Returns a readonly number input component displaying the float.

**Kind**: global variable  
**Returns**: <code>Component</code> - A number input displaying the data.

| Param      | Type                | Description          |
| ---------- | ------------------- | -------------------- |
| props      | <code>Object</code> | The component props. |
| props.data | <code>float</code>  | The float data.      |

**Example** _(Display an float)_

```js
<FloatOutput data={true} />
```

## Maintainers

* [Dylan Richardson](https://github.com/drich14)
* [Craig Valenti](https://github.com/CrazyCreje)

## License

MIT © [Pi Cubed](https://pi-cubed.github.io)

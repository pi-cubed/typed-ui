## Demo

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

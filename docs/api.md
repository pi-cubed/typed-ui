## Members

<dl>
<dt><a href="#ListInput">ListInput</a> ⇒ <code>Component</code></dt>
<dd><p>Returns a list input component with change events handled by the given callback.</p>
</dd>
<dt><a href="#ObjectInput">ObjectInput</a> ⇒ <code>Component</code></dt>
<dd><p>Returns an object input component with change events handled by the given callback.</p>
</dd>
<dt><a href="#ListOutput">ListOutput</a> ⇒ <code>Component</code></dt>
<dd><p>Returns a list surrounding the supplied list data.</p>
</dd>
<dt><a href="#ObjectOutput">ObjectOutput</a> ⇒ <code>Component</code></dt>
<dd><p>Returns a object surrounding the supplied object data.</p>
</dd>
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
<dd><p>Returns a readonly component displaying the supplied data.</p>
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
<dt><a href="#Put">Put</a> ⇒ <code>Component</code></dt>
<dd><p>Component for displaying GraphQL data</p>
</dd>
</dl>

<a name="ListInput"></a>

## ListInput ⇒ <code>Component</code>

Returns a list input component with change events handled by the given callback.

**Kind**: global variable  
**Returns**: <code>Component</code> - A list input component.

| Param          | Type                                          | Description                    |
| -------------- | --------------------------------------------- | ------------------------------ |
| props          | <code>Object</code>                           | The component props.           |
| props.ofType   | <code>GraphQLType</code>                      | The type of items in the list. |
| props.onChange | [<code>onChange</code>](#ListInput..onChange) | The handler for change events. |

**Example** _(Log list input to the console)_

```js
<ListInput ofType={GraphQLString} onChange={console.log} />
```

<a name="ListInput..onChange"></a>

### ListInput~onChange : <code>function</code>

This callback handles ListInput change events.

**Kind**: inner typedef of [<code>ListInput</code>](#ListInput)

| Param | Type                          |
| ----- | ----------------------------- |
| value | <code>Array.&lt;\*&gt;</code> |

<a name="ObjectInput"></a>

## ObjectInput ⇒ <code>Component</code>

Returns an object input component with change events handled by the given callback.

**Kind**: global variable  
**Returns**: <code>Component</code> - An object input component.

| Param          | Type                                            | Description                    |
| -------------- | ----------------------------------------------- | ------------------------------ |
| props          | <code>Object</code>                             | The component props.           |
| props.name     | <code>string</code>                             | The name of the input object.  |
| props.fields   | <code>Object</code>                             | The input object fields.       |
| props.onChange | [<code>onChange</code>](#ObjectInput..onChange) | The handler for change events. |

**Example** _(Log object input to the console)_

```js
<ObjectInput
  name="This is the name of the input object."
  fields={{
    x: { type: GraphQLString }
  }}
  onChange={console.log}
/>
```

<a name="ObjectInput..onChange"></a>

### ObjectInput~onChange : <code>function</code>

This callback handles ObjectInput change events.

**Kind**: inner typedef of [<code>ObjectInput</code>](#ObjectInput)

| Param | Type                |
| ----- | ------------------- |
| value | <code>Object</code> |

<a name="ListOutput"></a>

## ListOutput ⇒ <code>Component</code>

Returns a list surrounding the supplied list data.

**Kind**: global variable  
**Returns**: <code>Component</code> - A list surrounding the list items.

| Param          | Type                                           | Description                    |
| -------------- | ---------------------------------------------- | ------------------------------ |
| props          | <code>Object</code>                            | The component props.           |
| props.ofType   | <code>GraphQLType</code>                       | The type of the list items.    |
| props.data     | <code>Array.&lt;\*&gt;</code>                  | The list data.                 |
| props.onChange | [<code>onChange</code>](#ListOutput..onChange) | The handler for change events. |

**Example** _(Display a list of strings)_

```js
<ListOutput ofType={GraphQLString} data={['abc', 'd', 'xyz']} />
```

**Example** _(Display a list of list of integers)_

```js
<ListOutput
  ofType={new GraphQLList(GraphQLInt)}
  data={[[0, 1, 2], [10, 11, 12], [50, 100]]}
/>
```

<a name="ListOutput..onChange"></a>

### ListOutput~onChange : <code>function</code>

This callback handles ListOutput change events.

**Kind**: inner typedef of [<code>ListOutput</code>](#ListOutput)

| Param | Type                          |
| ----- | ----------------------------- |
| value | <code>Array.&lt;\*&gt;</code> |

<a name="ObjectOutput"></a>

## ObjectOutput ⇒ <code>Component</code>

Returns a object surrounding the supplied object data.

**Kind**: global variable  
**Returns**: <code>Component</code> - A object surrounding the object items.

| Param          | Type                                             | Description                       |
| -------------- | ------------------------------------------------ | --------------------------------- |
| props          | <code>Object</code>                              | The component props.              |
| props.name     | <code>string</code>                              | The name of the object.           |
| props.fields   | <code>Object</code>                              | The type of fields of the object. |
| props.data     | <code>Object</code>                              | The object data.                  |
| props.onChange | [<code>onChange</code>](#ObjectOutput..onChange) | The handler for change events.    |

**Example** _(Display an object of one string)_

```js
<ObjectOutput
  name="This is the name of the object."
  fields={{
    hew: { type: GraphQLString }
  }}
  data={{ hew: 'This is a string field called hew.' }}
/>
```

<a name="ObjectOutput..onChange"></a>

### ObjectOutput~onChange : <code>function</code>

This callback handles ObjectOutput change events.

**Kind**: inner typedef of [<code>ObjectOutput</code>](#ObjectOutput)

| Param | Type                |
| ----- | ------------------- |
| value | <code>Object</code> |

<a name="StringInput"></a>

## StringInput ⇒ <code>Component</code>

Returns a text field with change events handled by the given callback.

**Kind**: global variable  
**Returns**: <code>Component</code> - A text field component.

| Param          | Type                                            | Description                    |
| -------------- | ----------------------------------------------- | ------------------------------ |
| props          | <code>Object</code>                             | The component props.           |
| props.onChange | [<code>onChange</code>](#StringInput..onChange) | The handler for change events. |

**Example** _(Log string input to the console)_

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

**Example** _(Log integer input to the console)_

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

**Example** _(Log float input to the console)_

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

**Example** _(Log boolean input to the console)_

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
| props.data     | <code>string</code>                           | = The enum data.               |
| props.onChange | [<code>onChange</code>](#EnumInput..onChange) | The handler for change events. |

**Example** _(Log enum input to the console)_

```js
<EnumInput options={['a', 'b', 'c']} data="b" onChange={console.log} />
```

<a name="EnumInput..onChange"></a>

### EnumInput~onChange : <code>function</code>

This callback handles EnumInput change events.

**Kind**: inner typedef of [<code>EnumInput</code>](#EnumInput)

| Param | Type                |
| ----- | ------------------- |
| value | <code>string</code> |

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

Returns a readonly component displaying the supplied data.

**Kind**: global variable  
**Returns**: <code>Component</code> - A component displaying the enum.

| Param | Type                | Description          |
| ----- | ------------------- | -------------------- |
| props | <code>Object</code> | The component props. |
| data  | <code>string</code> | The enum data.       |

**Example** _(Display an enum)_

```js
<EnumOutput data="ABC" />
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

<a name="Put"></a>

## Put ⇒ <code>Component</code>

Component for displaying GraphQL data

**Kind**: global variable  
**Returns**: <code>Component</code> - A component displaying the data.

| Param            | Type                                       | Description                          |
| ---------------- | ------------------------------------------ | ------------------------------------ |
| props            | <code>Object</code>                        | The component props.                 |
| props.type       | <code>GraphQLType</code>                   | The type of the data.                |
| [props.data]     | <code>Object</code>                        | The initial data.                    |
| [props.onChange] | [<code>onChange</code>](#Output..onChange) | The handler for changes in the data. |

**Example** _(Display a string)_

```js
<Put type={GraphQLString} data="abc" />
```

**Example** _(Display an object)_

```js
<Put
  type={
    new GraphQLObjectType({
      name: 'abc',
      fields: { w: { type: GraphQLString } }
    })
  }
  data={{ w: 'xyz' }}
/>
```

**Example** _(Log object input to the console)_

```js
<Put
  type={
    new GraphQLInputObjectType({
      name: 'abc',
      fields: { w: { type: GraphQLString } }
    })
  }
  data={{ w: '' }}
  onChange={console.log}
/>
```
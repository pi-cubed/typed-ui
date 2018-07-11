# typed-ui

[![Build Status][build-badge]][build]
[![npm Package][npm-version-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]
[![BitHound][bithound-badge]][bithound]
[![Known Vulnerabilities][synk-badge]][synk]
[![License][license-badge]][license]
[![Contributors][contributors-badge]][contributors]
[![npm Downloads][npm-downloads-badge]][npm]
[![Semantic Release][semantic-release-badge]][semantic-release]
[![Commitizen Friendly][commitizen-badge]][commitizen]
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
[synk-badge]: https://snyk.io/test/github/pi-cubed/typed-ui/badge.svg?style=flat-square
[synk]: https://snyk.io/test/github/pi-cubed/typed-ui
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-release]: https://github.com/semantic-release/semantic-release
[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square
[commitizen]: http://commitizen.github.io/cz-cli/
[bithound-badge]: https://www.bithound.io/github/pi-cubed/typed-ui/badges/score.svg?style=flat-square
[bithound]: https://www.bithound.io/github/pi-cubed/typed-ui

## Install

```
$ yarn add typed-ui
```

## Usage

```js
import React from 'react';
import { render } from 'react-dom';
import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString
} from 'graphql';
import { Put, HigherOrderOutput } from '../../src';
import { Tab } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Demo = () => (
  <Put
    type={
      new GraphQLObjectType({
        name: 'typed-ui Demo',
        fields: {
          a: {
            type: new GraphQLInputObjectType({
              name: 'This is the name of the first object.',
              fields: {
                b: { type: GraphQLString }
              }
            })
          },
          c: {
            type: new GraphQLInputObjectType({
              name: 'This is the name of the second object',
              fields: {
                d: { type: GraphQLString }
              }
            })
          }
        }
      })
    }
    data={{ a: { b: '' }, c: { d: '' } }}
    typeComponentMap={{
      output: {
        GraphQLObjectType: ({ data, fields, onChange, ...props }) => (
          <div>
            <div>{props.name}</div>
            <Tab
              panes={_.keys(data).map(k => ({
                menuItem: k,
                render: () => (
                  <Tab.Pane>
                    <HigherOrderOutput
                      {...props}
                      ofType={fields[k].type}
                      data={data[k]}
                      onChange={val => {
                        onChange(
                          _.assign({}, data, {
                            [k]: _.pick(val, _.keys(data[k]))
                          })
                        );
                      }}
                    />
                  </Tab.Pane>
                )
              }))}
            />
          </div>
        )
      }
    }}
    onChange={console.log}
  />
);

render(<Demo />, document.querySelector('#demo'));
```

## API

[Docs](api.md)

## Maintainers

* [Dylan Richardson](https://github.com/drich14)
* [Craig Valenti](https://github.com/CrazyCreje)
* [Kyle Lawson](https://github.com/KyleLawson16)

## License

MIT © [Pi Cubed](https://pi-cubed.github.io)

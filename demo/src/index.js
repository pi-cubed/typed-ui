import React from 'react';
import { render } from 'react-dom';
import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString
} from 'graphql';
import { Put, HigherOrderOutput } from '../../src';
import AppBar from '@material-ui/core/AppBar';
import MUITabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import 'typeface-roboto';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class TabsComponent extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, tabs } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <MUITabs value={value} onChange={this.handleChange}>
            {tabs.map(({ label }) => <Tab key={label} label={label} />)}
          </MUITabs>
        </AppBar>
        <Typography component="div" style={{ padding: 8 * 3 }}>
          {tabs[value].content()}
        </Typography>
      </div>
    );
  }
}

const Tabs = withStyles(styles)(TabsComponent);

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
            <Tabs
              tabs={_.keys(data).map(k => ({
                label: k,
                content: () => (
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

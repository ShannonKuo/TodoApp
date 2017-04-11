import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp';
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red300} from 'material-ui/styles/colors';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: red300,
    primary1Color: red300,
  },
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <TodoApp />
  </MuiThemeProvider>
);


ReactDOM.render(
  // <TodoApp />,
  <App />,
  document.getElementById('root'),
);

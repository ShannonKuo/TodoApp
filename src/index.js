import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp';
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey800} from 'material-ui/styles/colors';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey800,
    primary1Color: grey800,
  },
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <TodoApp />
  </MuiThemeProvider>
);


ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

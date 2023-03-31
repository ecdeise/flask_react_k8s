import React from 'react';
import {Container, makeStyles, ThemeProvider} from '@material-ui/core';
import Body from './Body';
import Footer from './Footer';
import theme from '@material-ui/core/styles/defaultTheme';
import {StyledEngineProvider} from '@mui/material/styles';
import TabbedAppBar from './TabbedAppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <StyledEngineProvider injectFirst>
          <TabbedAppBar />
        </StyledEngineProvider>

        <Container maxWidth="lg" className={classes.main}>
          <Body />
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

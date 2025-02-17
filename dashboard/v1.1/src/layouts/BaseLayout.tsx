import { CssBaseline } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import {
  Brightness2Sharp,
  Brightness7Sharp,
  Menu as MenuIcon
} from '@material-ui/icons';
import clsx from 'clsx';
import React, { ReactElement, useCallback, useState } from 'react';
import Switch from 'react-switch';
import Navigator from '../router/Navigation';
import Sidebar from './Sidebar';
const drawerWidth = 240;
export const ThemeContext = React.createContext({});
const _useStyles = makeStyles(theme => ({
  // AppBar styles
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  title: {
    flexGrow: 1
  },
  // Toolbar styles
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  // IconMenu styles
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  }
}));

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  color: {
    primary: theme.palette.primary
  },
  // Content styles
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  sunIcon: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    padding: 2
  },
  moonIcon: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    padding: 2,
    transform: 'rotate(160deg)'
  }
}));

export default function BaseLayout(props: any): ReactElement {
  // Access styles
  const classes = useStyles();
  const _classes = _useStyles();
  const [loader, setLoader] = useState<boolean>(false);

  const updateLoader = useCallback((status: boolean) => {
    setLoader(status);
  }, []);

  // Opens and closes the drawer
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleToggleDarkMode = () => {
    const { darkMode, toggleDarkMode } = props;
    localStorage.setItem('dark-mode', darkMode ? 'false' : 'true');
    toggleDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={!props.darkMode ? 'light' : 'dark'}>
      <div className={classes.root}>
        <CssBaseline />
        {/* Navbar */}
        <div className="_navbar">
          <AppBar
            position="absolute"
            className={clsx(_classes.appBar, open && _classes.appBarShift)}
          >
            <Toolbar className={_classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  _classes.menuButton,
                  open && _classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap={true}
                className={_classes.title}
              >
                Bench Routes
              </Typography>
              <Switch
                checked={props.darkMode}
                onChange={handleToggleDarkMode}
                offColor="#145D97"
                onColor="#303030"
                height={18}
                handleDiameter={20}
                width={36}
                uncheckedIcon={<Brightness7Sharp className={classes.sunIcon} />}
                checkedIcon={<Brightness2Sharp className={classes.moonIcon} />}
              />
            </Toolbar>
            {loader ? <LinearProgress /> : null}
          </AppBar>
        </div>
        <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Navigator updateLoader={updateLoader} />
          </Container>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

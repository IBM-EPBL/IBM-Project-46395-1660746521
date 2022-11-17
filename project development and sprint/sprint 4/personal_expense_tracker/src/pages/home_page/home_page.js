import React from 'react';
import './style.css';
import { Typography } from "@mui/material";
import { Route, Routes, useNavigate } from 'react-router';
import Dashboard from '../dashboard_page/dashboard_page';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Profile from '../profile_page/profile_page';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import IconButton from '@mui/material/IconButton';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createSearchParams } from 'react-router-dom';

export default function Home() {
  const navigation = useNavigate()
  const inputurl = new URL(window.location.href)
  const email = inputurl.searchParams.get('email')
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff9999",
      },
      secondary: {
        main: '#11cb5f',
      },
    },
  });
  const dashboardPage = () => {
    toggleDrawer()
    navigation({ pathname: '/expensetracker/dashboard', search: createSearchParams({ email: email }).toString() })
  }
  const profilePage = () => {
    toggleDrawer()
    navigation({ pathname: '/expensetracker/profile', search: createSearchParams({ email: email }).toString() })
  }

  const logout = () =>{
    toggleDrawer()
    navigation('/')
  }

  const [state, setState] = React.useState({
    isopen: false,
  });

  const toggleDrawer = () => {
    setState({ isopen: !state.isopen });
  };


  const list = () => (
    <Box
      sx={{ width: 'auto',  }}
      role="presentation"
    >
      <br/>
      <Typography variant='button'sx={{margin:4}}>Menu</Typography>
      <br/><br/>
      <Divider/>
      <Box sx={{height:500,display:'flex', flexDirection:'column',justifyContent:'space-between'}}>
      <Box sx={{flex:1}}>
      <List>
        <ListItem>
          <ListItemButton onClick={dashboardPage}>
            <ListItemIcon>
              <LeaderboardRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={profilePage}>
            <ListItemIcon>
              <AccountCircleSharpIcon/>
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      </Box>
      <Box sx={{flex:1, marginTop:40}}>
        <Divider/>
        <List>
        <ListItem>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutRoundedIcon/>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
        </List>
      </Box>
      </Box>
    </Box>
  );

  return (<ThemeProvider theme={theme}>
    <div className='background'>
      <IconButton onClick={toggleDrawer}>
        <MenuRoundedIcon />
      </IconButton>
      <Typography variant='h4' sx={{ marginTop: 1, marginBottom: 1, fontFamily:'serif' }}>
        Personal Expense Tracker
      </Typography>
    </div>
    <div>
      <div>
        <Drawer
          anchor='left'
          open={state.isopen}
          onClose={toggleDrawer}
        >
          {list()}
        </Drawer>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  </ThemeProvider>
  )
}

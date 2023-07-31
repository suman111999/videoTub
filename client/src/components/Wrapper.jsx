import { Grid } from '@mui/material';
import React from 'react';
import SideBar from './sideBar';
import Main from './main';

const Wrapper = ({ darkMode, setDarkMode }) => {
    return (
        <Grid container >
            <Grid item xs={2} md={2} sm={2}><SideBar darkMode={darkMode} setDarkMode={setDarkMode} /></Grid>
            <Grid item xs={10} md={10} sm={10}>
                <Main />
            </Grid>
        </Grid>
    );
};

export default Wrapper;
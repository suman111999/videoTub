import React from 'react';
// import styled from 'styled-components';
import YouTubLogo from '../../img/logo.png';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import HistoryIcon from '@mui/icons-material/History';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import ArticleIcon from '@mui/icons-material/Article';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import FlagIcon from '@mui/icons-material/Flag';
import HelpIcon from '@mui/icons-material/Help';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Grid, Typography } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';

//whole side bar container
// const Container = styled.div`
//     flex:1;
//     background-color: #202020;
//     height: 100vh;
//     color: white;
//     font-size: 14px;
// `;

//wrapper around each side bar menu item
// const Wrapper = styled.div`
//     padding: 10%;
// `;

// const Logo = styled.div`
//     display:flex;
//     align-items: center;
//     gap: 5px;
//     margin-bottom: 10%;
// `;
const Item = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    cursor: 'pointer',
    padding: '2% 0%',
}));

const Img = styled('img')`
    height:25px;
`;

const Hr = styled('hr')(({ theme }) => ({
    border: `0.5px solid ${theme.soft}`,
}));

const Login = styled('div')`
    
`
const SideBar = ({ darkMode, setDarkMode }) => {
    const theme = useTheme()
    return (
        // '#202020'

        // position: 'sticky', top: 0->to make side bar sticky as when content of page will increase in y direction then sidebar was also moving 
        <Grid container sx={{
            display: 'flex', backgroundColor: (theme) => theme.bgLighter, height: '100vh', color: (theme) => theme.text, padding: '1rem 2rem',
            position: 'sticky', top: 0
        }}>
            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '10%' }} xs={12} sm={12} md={12}>
                <Img src={YouTubLogo} />
                <Typography>VideoTub</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Item>
                    <HomeIcon />
                    <Typography>Home</Typography>
                </Item>
                <Item>
                    <ExploreIcon />
                    <Typography>Explore</Typography>
                </Item>
                <Item>
                    <SubscriptionsIcon />
                    <Typography>Subscriptions</Typography>
                </Item>
                <Hr />
                <Item>
                    <LibraryAddIcon />
                    <Typography>Library</Typography>
                </Item>
                <Item>
                    <HistoryIcon />
                    <Typography>History</Typography>
                </Item>
                <Hr />
                <Login>
                    <Typography sx={{ overflowWrap: 'anywhere' }}>Sign in to like videos,comment and subscribe.</Typography>
                    <Button variant='outlined' sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AccountCircleIcon />Sign in</Button>
                </Login>
                <Hr />
                <Item>
                    <LibraryMusicIcon />
                    <Typography>Music</Typography>
                </Item>
                <Item>
                    <SportsBasketballIcon />
                    <Typography>Sports</Typography>
                </Item>
                <Item>
                    <SportsEsportsIcon />
                    <Typography>Gaming</Typography>
                </Item>
                <Item>
                    <MovieCreationIcon />
                    <Typography>Movies</Typography>
                </Item>
                <Item>
                    <ArticleIcon />
                    <Typography>News</Typography>
                </Item>
                <Item>
                    <LiveTvIcon />
                    <Typography>Live</Typography>
                </Item>
                <Hr />
                <Item>
                    <SettingsIcon />
                    <Typography>Settings</Typography>
                </Item>
                <Item>
                    <FlagIcon />
                    <Typography>Report</Typography>
                </Item>
                <Item>
                    <HelpIcon />
                    <Typography>Help</Typography>
                </Item>
                <Item onClick={() => setDarkMode(!darkMode)}>
                    <LightModeIcon />
                    <Typography>Display Mode</Typography>
                </Item>
            </Grid>
        </Grid>
    );
};

export default SideBar;
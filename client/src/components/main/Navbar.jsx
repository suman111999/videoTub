import { Button, Grid, TextField, styled } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
    border: '1px solid #ccc',
    borderRadius: '0.313rem',
    padding: '0.313rem'
}));

const InputField = styled('input')(({ theme }) => ({
    outline: 'none',
    borderColor: 'transparent',
    backgroundColor: 'transparent'
}));

const Navbar = () => {
    return (
        <Grid container sx={{ display: 'flex', position: 'sticky', top: 0, backgroundColor: (theme) => theme.bgLighter, p: 1 }}>
            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Search>
                    <InputField placeholder='search' />
                    <SearchIcon />
                </Search>
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='outlined' sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AccountCircleIcon />Sign in</Button>
            </Grid>
        </Grid>
    );
};

export default Navbar;
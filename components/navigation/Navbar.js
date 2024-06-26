import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import logo from '../../public/kmavenue.png';

const pages = [['Home','/'], ['Products', '/products'], ['Contact', '/contact'], ['Admin', '/admin']];
const settings = [['Dashboard', '/admin'], ['Order Reports', '/admin/orders'], ['Expense Reports', '/admin/expenses'], ['Logout', '/logout']];

const Navbar = () => {
  const [anchorForNav, setAnchorForNav] = useState(null);
  const [anchorForUser, setAnchorForUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorForNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorForUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorForNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorForUser(null);
  };

  return (
    <>
    <Head>
      <title>KM Avenue</title>
    </Head>
    <AppBar style={{backgroundColor: '#FFC0CB !important'}} className="mb-2 shadow-none" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorForNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorForNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => {
                return(
                <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                  <Link href={page[1]} className="no-underline">
                  <Typography textAlign="center">{page[0]}</Typography>
                  </Link>
                </MenuItem>
              )})}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page} href={page[1]} className="no-underline">
                              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page[0]}
              </Button>
              </Link>

            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Image src={logo} alt="KM Avenue" width={50} height={50} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorForUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorForUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting[1]} onClick={handleCloseUserMenu}>
                  <Link href={setting[1]} className="no-underline">
                  <Typography textAlign="center">{setting[0]}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}

export default Navbar;
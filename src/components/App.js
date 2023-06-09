import { Routes, Route, Navigate, useLocation} from 'react-router-dom';
import React, { useEffect} from 'react';
import Layout from '../Layout/Layout';
import './App.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../Assets/Theme/theme';
import Home from '../pages/Home';
import Movies from '../pages/Movies/Movies';
import TvShows from '../pages/TvShows/TvShow';
import News from '../pages/News';
import SignUp from '../pages/Auth/SignUp';
import Login from '../pages/Auth/Login';
import MovieSingle from '../pages/Movies/MovieSingle';
import TvShowSingle from '../pages/TvShows/TvShowSingle';
import Account from '../pages/Account/Account';
import Settings from '../pages/Account/Settings';
import Notifications from '../pages/Notification/Notifications';


const App = () => {

    const theme = useSelector((state) => state.theme);

    const location = useLocation();

    const [user] = useAuthState(auth);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);


    return (
        <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme} >
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/tv' element={<TvShows />} />
                    <Route path='/news' element={<News />} />
                    <Route path='/auth/sign-up' element={<SignUp />} /> 
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='movies/:movieId/*' element={<MovieSingle />} />
                    <Route path='tv/:tvShowId/*' element={<TvShowSingle />} />
                    {user && <Route path='/account/:username/*' element={<Account />} />}
                    {user && <Route path='account/:username/settings' element={<Settings />} />}
                    <Route path='/notifications' element={<Notifications />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Layout>
        </ThemeProvider>  
    )
}

export default App;
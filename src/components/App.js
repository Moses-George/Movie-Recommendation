import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import React, { useEffect, Suspense } from 'react';
import Layout from '../Layout/Layout';
import './App.scss';
import Spinner from './UI/Spinners/Spinner';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../Assets/Theme/theme';


const App = () => {

    const theme = useSelector((state) => state.theme);

    const location = useLocation();

    const [user] = useAuthState(auth);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const Home = React.lazy(() => import('../pages/Home'));
    const Movies = React.lazy(() => import("../pages/Movies/Movies"));
    const TvShow = React.lazy(() => import('../pages/TvShows/TvShow'));
    const News = React.lazy(() => import('../pages/News'));
    const SignUp = React.lazy(() => import('../pages/Auth/SignUp'));
    const Login = React.lazy(() => import('../pages/Auth/Login'));
    const MovieSingle = React.lazy(() => import('../pages/Movies/MovieSingle'));
    const TvShowSingle = React.lazy(() => import('../pages/TvShows/TvShowSingle'));
    const Account = React.lazy(() => import('../pages/Account/Account'));
    const Settings = React.lazy(() => import('../pages/Account/Settings'));

    return (
        <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme} >
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Suspense fallback={<Spinner />}><Home /></Suspense>} />
                    <Route path='/movies' element={<Suspense fallback={<Spinner />}><Movies /></Suspense>} />
                    <Route path='/tv' element={<Suspense fallback={<Spinner />}><TvShow /></Suspense>} />
                    <Route path='/news' element={<Suspense fallback={<Spinner />}><News /></Suspense>} />
                    <Route path='/auth/sign-up' element={<Suspense fallback={<Spinner />}><SignUp></SignUp></Suspense>} />
                    <Route path='/auth/login' element={<Suspense fallback={<Spinner />}><Login /></Suspense>} />
                    <Route path='movies/:movieId/*' element={<Suspense fallback={<Spinner />}><MovieSingle /></Suspense>} />
                    <Route path='tv/:tvShowId/*' element={<Suspense fallback={<Spinner />}><TvShowSingle /></Suspense>} />
                    {user && <Route path='/account/:username/*' element={<Suspense fallback={<Spinner />}><Account /></Suspense>} />}
                    {user && <Route path='account/:username/settings' element={<Suspense fallback={<Spinner />}><Settings /></Suspense>} />}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Layout>
        </ThemeProvider>
    )
}

export default App;
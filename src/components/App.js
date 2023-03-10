import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { useEffect, Suspense } from 'react';
import Layout from '../Layout/Layout';
import './App.scss';
// import Home from '../pages/Home';
import Spinner from './UI/Spinners/Spinner';


const App = () => {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const Home = React.lazy(()=> import('../pages/Home'));
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
        <Layout>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Suspense fallback={<Spinner />}><Home /></Suspense>} />
                <Route path='/movies' element={<Suspense fallback={<Spinner />}><Movies /></Suspense>} />
                <Route path='/tvShow' element={<Suspense fallback={<Spinner />}><TvShow /></Suspense>} />
                <Route path='/news' element={<Suspense fallback={<Spinner />}><News /></Suspense>} />
                <Route path='/auth/sign-up' element={<Suspense fallback={<Spinner />}><SignUp></SignUp></Suspense>} />
                <Route path='/auth/login' element={<Suspense fallback={<Spinner />}><Login /></Suspense>} />
                <Route path='movies/:movieId/*' element={<Suspense fallback={<Spinner />}><MovieSingle /></Suspense>} />
                <Route path='tvShow/:tvShowId/*' element={<Suspense fallback={<Spinner />}><TvShowSingle /></Suspense>} />
                <Route path='/account/:username/*' element={<Suspense fallback={<Spinner />}><Account /></Suspense>} />
                <Route path='account/:username/settings' element={<Suspense fallback={<Spinner />}><Settings /></Suspense>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Layout>
    )
}

export default App;
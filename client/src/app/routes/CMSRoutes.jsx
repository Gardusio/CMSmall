import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../common/layouts/Layout';
import Home from "../home/Home"
import Dashboard from '../dashboard/Dashboard';
import LoginPage from '../auth/LoginPage';
import Page from '../pages/Page'
import EditPage from '../pages/EditPage';
import CreatePage from '../pages/CreatePage';

import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { SiteContext } from '../context/SiteProvider';
import PagesProvider from '../context/PagesProvider';


function CMSRoutes() {
    const { user, doLogout } = useContext(UserContext)
    const { name } = useContext(SiteContext)

    const ProtectedDashboard = user ? <Dashboard user={user} /> : <Navigate to="/" />

    const ProtectedEditPage = user ? <EditPage /> : <Navigate to="/" />

    const ProtectedCreatePage = user ? <CreatePage user={user} /> : <Navigate to="/" />


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={<Layout siteName={name} user={user} logout={doLogout} />}>

                    <Route index element={<Home />} />

                    <Route path="/pages/:pageId" element={<Page />} />

                    <Route path="/dashboard" element={ProtectedDashboard} />

                    <Route path="/dashboard/create/" element={ProtectedCreatePage} />

                    <Route path="/dashboard/edit/:pageId" element={ProtectedEditPage} />

                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default CMSRoutes

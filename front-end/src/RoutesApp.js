import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AddUserPages from './pages/users/AddUser.Pages';
import EditUserPages from './pages/users/EditUser.Pages';
import IndexPages from './pages/users/Index.Pages';
import Navbar from './components/Navbar.Component';

const RoutesApp = () => {
    return (
        <BrowserRouter >
            <Routes>
                <Route element={<Navbar />} >
                    <Route path="/" element={<IndexPages />} />
                    <Route path="/add-user" element={<AddUserPages />} />
                    <Route path="/edit-user/:userId" element={<EditUserPages />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default RoutesApp
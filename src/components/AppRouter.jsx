import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes, privateRoutes} from "../router/routes";
import {AuthContext} from "../context";

const AppRouter = () => {
    const {authData, isLoading} = useContext(AuthContext);
    if (isLoading) {
        return <h1>Загрузка...</h1>
    }

    return (
        authData !== ''
            ? <Routes>
                {privateRoutes.map((route, index) =>
                    <Route element={route.component}
                           key={index}
                           path={route.path}
                           exact={route.exact} />
                )}
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
            : <Routes>
                {publicRoutes.map((route, index) =>
                    <Route element={route.component}
                           key={index}
                           path={route.path}
                           exact={route.exact} />
                )}

                <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
    );
};

export default AppRouter;
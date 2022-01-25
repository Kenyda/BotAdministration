import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context";
import Api from "../API/api";
import {InfoTable} from "../components/table/InfoTable";
import {Alert, Button, Container} from "@mui/material";
import Filter from "../components/Filter";
import {useFilter} from "../hooks/useFilter";

const Home = () => {
    const {setAuthData} = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [rowId, setRowId] = useState(0)
    const [error, setError] = useState(false)
    const [filter, setFilter] = useState({query: {
            user: '',
            status: '',
            cache: '',
    }})
    const sortedData = useFilter(data, filter.query);

    const logout = () => {
        localStorage.setItem('auth', '');
        setAuthData('');
    }

    const getData = () => {
        setIsLoading(true);
        Api.getAll()
            .then((response) => {
            setData(response.data);
            setIsLoading(false);
        }).catch((error) => {
            if (error.request.status === 403) {
                logout()
            }
        })
    }

    const updateData = (newData) => {
        setIsLoading(true);
        const params = newData.type === 'status' ?
            { new_status: newData.value} : { new_cache: newData.value }
        Api.update(newData.id, newData.type, params)
            .then((response) => {
                const row = data.filter(item => item.id === newData.id)[0];
                data.splice(data.indexOf(row), 1, response.data)
                setData(data);
                setIsLoading(false);
            })
            .catch(() => {
                setError(true);
                setRowId(newData.id)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Container maxWidth="lg">
            <Button sx={{float: 'right'}} onClick={logout}>Выход</Button>
            <h1>Admin</h1>
            <Filter filter={filter} setFilter={setFilter}/>
            {error && <Alert sx={{mb: 3}} severity="error" onClose={() => {
                setError(false)
            }}>
                Не удалось обновить строку с id = {rowId}
            </Alert>}
            { isLoading
                ? <div>loading...</div>
                : <InfoTable data={sortedData} onUpdate={updateData}/>
            }
        </Container>
    );
};

export default Home;
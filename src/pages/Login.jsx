import React, {useContext, useState} from 'react';
import {AuthContext} from "../context";
import Api from "../API/api";
import {Button, Card, CardContent, Container, Grid, TextField} from "@mui/material";

const Login = () => {
    const {setAuthData} = useContext(AuthContext);
    const [token, setToken] = useState('');
    const [errorVisible, setErrorVisible] = useState(false);

     const login = async(event) => {
        event.preventDefault();
        localStorage.setItem('auth', token)
        await Api.getAll().then((response) => {
            setAuthData(token);
            setErrorVisible(false)
        }).catch((error) => {
            if (error.request.status === 403) {
                setAuthData('')
                setErrorVisible(true)
            }
        })
    }

    return (
        <Container>
            <Grid sx={{mt: 4}} container justifyContent="center">
                <Grid item>
                    <Card>
                        <CardContent>
                            <h1>Login</h1>
                            <form>
                                <TextField
                                    error={errorVisible}
                                    value={token}
                                    variant="standard"
                                    helperText={errorVisible ? 'Неверный токен.' : ''}
                                   onChange={e => {
                                       setToken(e.target.value);
                                       setErrorVisible(false);
                                   }}
                                   type="text" placeholder="token"/>
                                <Button onClick={login}>Log in</Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
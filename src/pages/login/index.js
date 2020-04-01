import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { FiTrendingUp } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import './styles.css';

export default function Login() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        // e.preventDefault();
        // const r = await api.post('session', { id })
        // .then(response => {
        //    localStorage.setItem('ongId', id);
        //    localStorage.setItem('ongName', response.data.name); 
        //    history.push('/profile');
        // })
        // .catch(err => alert('Falha no login, tente novamente.'));

        if (id === "pao")
        {
            history.push('/home');
        }
        else {
            alert("Falha no login, tente novamente.");
        }
    }
    return(
        <Grid
            container
            alignItems="center"
            className="login-container"
        >
            <Grid 
                container 
                direction="column"
                alignItems="center" 
                justify="center"
                className="login-text"
                xs={6}
            >
                <FiTrendingUp size={50}/>
                <h1 className="login-title">Scale</h1>
            </Grid>
            <Grid
                container
                justify="center"
                xs={6}
            >
               
                <form onSubmit={handleLogin} className="login-form">
                    <h2 className="login-welcome">Bem-vindo!</h2>
                    <TextField
                        label="Login"
                        variant="outlined"
                        onChange={e => setId(e.target.value)}
                        >
                    </TextField>
                    <button className="button button-full-width" type="submit">Entrar</button>
                </form>
            </Grid>
        </Grid>
    );
}
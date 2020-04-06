import React, {useState} from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import api from '../../services/api';
import swal from 'sweetalert';
import './styles.css';

export default function Login() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        if(id)
        {
            await api.get(`/user/check/${id}`)
            .then(response => {
                console.log(response);
                localStorage.setItem('user', JSON.stringify(response.data));
                history.push('/home');
            })
            .catch(err => swal('', 'Falha no login, tente novamente.', 'error'));
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
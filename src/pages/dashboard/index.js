import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import Context from '../../components/context';
import api from '../../services/api';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import swal from 'sweetalert';

export default class Project extends Component {
    
    state = {
        user: [],
        client: []
    }

    componentDidMount() {
        this.getClient();
        this.getUser();
    }

    getClient = async () =>
    {
        await api.get('/propostaCliente').then(response => {
            const client = response.data;
            this.setState({ client });
        }).catch(error => {
            swal("Ocorreu um erro!", "Tente novamente.", "error").then(
            );
        });
    }
    getUser = async () =>
    {
        await api.get('/propostaUser').then(response => {
            const user = response.data;
            this.setState({ user });
        }).catch(error => {
            swal("Ocorreu um erro!", "Tente novamente.", "error").then(
            );
        });
    }

    render() {
        const user = {
            labels: this.state.user.map(user => user.nome),
            datasets: [{
                data: this.state.user.map(user => user.count),
                backgroundColor: this.state.user.map(user => user.color),
                hoverBackgroundColor: this.state.user.map(user => user.color)
            }]
        };
        const client = {
            labels: this.state.client.map(client => client.nome),
            datasets: [{
                data: this.state.client.map(client => client.count),
                backgroundColor: this.state.client.map(client => client.color),
                hoverBackgroundColor: this.state.client.map(client => client.color)
            }]
        };
        return (
            <Context container="true">
                <Typography
                      className="main-card-title"
                      variant="h4"
                    >
                      Dashboard
                    </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div>
                            <h2>Proposta gerada por Cliente</h2>
                            <Pie data={client} />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <h2>Proposta gerada por Usuário</h2>
                            <Pie data={user} />
                        </div>
                    </Grid>
                </Grid>
            </Context>
        );
      }
}
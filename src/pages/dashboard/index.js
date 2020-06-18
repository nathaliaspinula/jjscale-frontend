import React, {Component} from 'react';
import {Pie, Bar} from 'react-chartjs-2';
import Context from '../../components/context';
import api from '../../services/api';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import swal from 'sweetalert';

export default class Project extends Component {
    
    state = {
        user: [],
        client: [],
        month: []
    }

    componentDidMount() {
        this.getClient();
        this.getUser();
        this.getMonth();
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
    getMonth = async () =>
    {
        await api.get('/propostaMes').then(response => {
            const month = response.data;
            this.setState({ month });
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
        const month = {
            labels: this.state.month.map(month => month.mes_criacao_proposta),
            datasets: [{
                label: 'Propostas',
                data: this.state.month.map(month => month.qtd_proposta),
                backgroundColor: '#5cd6d6',
                hoverBackgroundColor: '#5cd6d6'
            }]
        };
        return (
            <Context container="true">
                <Typography
                    className="main-card-title"
                    variant="h5"
                >
                      Dashboard
                </Typography>
                <Grid container spacing={2}>
                    <Grid item sm={4}>
                        <div>
                        <Typography
                            className="main-card-title"
                            variant="h6"
                        >   
                            Propostas geradas por Cliente
                        </Typography>
                            <Pie data={client} />
                        </div>
                    </Grid>
                    <Grid item sm={4}>
                        <div>
                            <Typography
                                className="main-card-title"
                                variant="h6"
                            >
                                Propostas geradas por Usuário
                            </Typography>
                            <Pie data={user} />
                        </div>
                    </Grid>
                    <Grid item sm={4}>
                        <div>
                        <Typography
                            className="main-card-title"
                            variant="h6"
                        >   
                            Propostas geradas por Mês
                        </Typography>
                            <Bar data={month} />
                        </div>
                    </Grid>
                </Grid>
            </Context>
        );
      }
}
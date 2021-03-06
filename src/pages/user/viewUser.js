import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import api from '../../services/api';
import swal from 'sweetalert';
import {cpf as cpfLib} from 'cpf-cnpj-validator';
export default class UserEditForm extends Component{
    state = {
        id: '',
        cpf: '',
        name: '',
        email: '',
        cpfValidator: false,
        emailValidator: false,
        user: {}
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = async () =>
    {
        const idUser = this.props.id;
        await api.get(`/user/${idUser}`).then(response => {
            const { id, cpf, name, email } = response.data.find(user => user.id === idUser);
            const cpfFormatted = cpfLib.format(cpf);
            this.setState({
                id,
                cpf: cpfFormatted,
                name,
                email
             });
        }).catch(error => {
            swal("Ocorreu um erro!", "Tente novamente.", "error");
        });
    }

    render() {
        return (
            <Container maxWidth="sm" className="paper-view">
                <Typography variant="h6" gutterBottom>
                    Visualizar Usuário
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            disabled
                            id="name"
                            name="name"
                            label="Nome Completo"
                            fullWidth
                            value={this.state.name}
                            onChange={this.handleNameChange}
                            />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            disabled
                            id="cpf"
                            name="cpf"
                            label="CPF"
                            fullWidth
                            value={this.state.cpf}
                            onChange={this.handleCpfChange}
                            type="text"
                            inputProps={{
                                maxLength: 15
                            }}
                            error = {
                                this.state.cpfValidator
                            }
                            />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            disabled
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            error={
                                this.state.emailValidator
                            }
                            />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Context from '../../components/context';
import {emailCheck} from '../../components/utils/utils';
import {cpf as cpfLib} from 'cpf-cnpj-validator';
import api from '../../services/api';
import swal from 'sweetalert';

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
        const idUser = this.props.match.params.id;
        await api.get(`/user/${idUser}`).then(response => {
            const { id, cpf, name, email } = response.data.find(user => user.id.toString() === idUser);
            const cpfFormatted = cpfLib.format(cpf);
            this.setState({
                id,
                cpf: cpfFormatted,
                name,
                email,
             });
        }).catch(error => {
            swal("Ocorreu um erro!", "Tente novamente.", "error");
        });
    }

    handleNameChange = async (event) =>
    {
        await this.setState({name: event.target.value});
    }

    handleCpfChange = async (event) =>
    {
        const value = event.target.value;
        let formatted = value;
        let invalid = false;
    
        if (value.length <= 11) {
          formatted = cpfLib.format(value);
        }
        if(!cpfLib.isValid(value))
        {
          invalid = true;
        }
        await this.setState({cpfValidator: invalid, cpf: formatted});
    }

    handleEmailChange = async (event) => {
        const value = event.target.value;
        if(emailCheck(value))
        {
        await this.setState({emailValidator: false, email: value});
        }
        else {
        await this.setState({emailValidator: true, email: value});
        }
    }

    saveUser = async (e) => {
        const name = this.state.name;
        const email = this.state.email;
        const id = this.state.id;
        const cpfValue = cpfLib.strip(this.state.cpf);
        const usuario = JSON.parse(localStorage.getItem('user'));

        if (name && email && cpfValue && !this.state.cpfValidator && !this.state.emailValidator) {
            api.put('/user', {
                id: id,
                name: name,
                email: email,
                cpf: cpfValue,
                idusuario: usuario.id
            }).then(response => 
                swal("Sucesso!", "Dados atualizados.", "success").then(
                    this.props.history.push("/user")
                  )
                ).catch(error => swal("Ocorreu um erro!", "Tente novamente.", "error"));
        }
        else {
            swal("Campos inválidos.", "Tente novamente.", "error")
        }
    }

    render() {
        return (
            <Context container="true">
                <Typography variant="h6" gutterBottom>
                    Editar Usuário
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Nome Completo"
                            fullWidth
                            value={this.state.name}
                            onChange={(e) => {this.setState({name: e.target.value})}}
                            />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
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
                    <Grid item justify="flex-end" container xs={12}>
                        <Button size="small" variant="contained" onClick={this.saveUser}>Salvar</Button>
                    </Grid>
                </Grid>
            </Context>
        );
    }
}

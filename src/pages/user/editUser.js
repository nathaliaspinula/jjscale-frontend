import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Context from '../../components/context';
import {emailCheck} from '../../components/utils/utils';
import {cpf} from 'cpf-cnpj-validator';
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
        const {id} = this.props.match.params;
        const response = await api.get(`/user/${id}`);
        const cpfFormatted = cpf.format(response.data[0].cpf);
        this.setState({
            id: response.data[0].id,
            cpf: cpfFormatted,
            name: response.data[0].name,
            email: response.data[0].email
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
        formatted = cpf.format(value);
        if(!cpf.isValid(value))
        {
            invalid = true;
        }
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
        const cpfValue = cpf.strip(this.state.cpf);
        console.log(name + " " + email + " " + cpfValue + " " + this.state.cpfValidator + " " + this.state.emailValidator);
        if (name && email && cpfValue && !this.state.cpfValidator && !this.state.emailValidator) {
            api.put('/user', {
                id: id,
                name: name,
                email: email,
                cpf: cpfValue
            }).then(response => 
                swal("Sucesso!", "Dados atualizados.", "success").then(
                    this.props.history.push("/user")
                  )
                ).catch(error => swal("Ocorreu um erro!", "Tente novamente.", "error"));
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
                            onChange={this.handleNameChange}
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

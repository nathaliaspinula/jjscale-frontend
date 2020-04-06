import React, { Component } from 'react';
import Context from '../../components/context';
import Typography from '@material-ui/core/Typography';
import {cpf as cpfLib} from 'cpf-cnpj-validator';

export default class Profile extends Component {

    state = {
        user: {},
    }
    
    componentDidMount() {
        this.loadProfile();
    }
    
    loadProfile = () =>
    {
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({user: { ...user, cpf: cpfLib.format(user.cpf) }});
    }

    render() {
        return (
            <Context container="true">
                    <Typography variant="h5"><b>{this.state.user.name}</b></Typography>
                    <Typography variant="h6">
                        CPF:
                    </Typography>
                    <Typography variant="h6">
                        {this.state.user.cpf} 
                    </Typography>
                    <Typography variant="h6">
                        E-mail:
                    </Typography>
                    <Typography variant="h6">
                        {this.state.user.email} 
                    </Typography>
                    <Typography>* Caso deseje alterar suas informações, peça à administração da sua empresa.</Typography>
            </Context>
        );
    };
}

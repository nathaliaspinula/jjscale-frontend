import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Context from '../../components/context';
import {cpf} from 'cpf-cnpj-validator';
import api from '../../services/api';
import swal from 'sweetalert';
import Editor from '../../components/editor';
import { stateToHTML } from 'draft-js-export-html';

export default class ModelForm extends Component{
    constructor(props) {
        super(props);
        this.state=props;
    }

    saveUser = async (e) => {
      console.log(this.state)
    //let html = stateToHTML(this.state);
    const name = this.state.name;
    const email = this.state.email;
    const cpfValue = cpf.strip(this.state.cpf);

    if (name && email && cpfValue && !this.state.cpfValidator && !this.state.emailValidator) {
          api.post('/user', {
            name: name,
            email: email,
            cpf: cpfValue
          }).then(response => 
            swal("Sucesso!", "Usuário criado.", "success").then(
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
                  Novo Modelo
              </Typography>
              <Grid container spacing={3}>
                  <Editor/>
                  <Grid item justify="flex-end" container xs={12}>
                    <Button size="small" variant="contained" onClick={this.saveUser}>Salvar</Button>
                  </Grid>
              </Grid>
        </Context>
    );
  }
}

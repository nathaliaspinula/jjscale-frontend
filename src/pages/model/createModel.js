import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Context from '../../components/context';
import api from '../../services/api';
import swal from 'sweetalert';
import Editor from '../../components/editor';

export default class ModelForm extends Component{
    constructor(props) {
        super(props);
        this.state={
          ola: null,
        };
    }

    saveUser = async () => {
      const { ola } = this.state;

      if (ola) {
            api.post('/modelo', { payload: ola }).then(response => 
              swal("Sucesso!", "Modelo criado.", "success").then(
                this.props.history.push("/model")
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
                  <Editor callback={(evt) => this.setState({
                    ola: evt,
                  })} />
                  <Grid item justify="flex-end" container xs={12}>
                    <Button size="small" variant="contained" onClick={this.saveUser}>Salvar</Button>
                  </Grid>
              </Grid>
        </Context>
    );
  }
}

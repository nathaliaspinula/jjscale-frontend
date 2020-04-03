import React, { Component }from 'react';
import Context from '../../components/context';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import api from '../../services/api';
import swal from 'sweetalert';

export default class UserForm extends Component{
  state = {
    requisito: '',
    descricao: '',
  }

  saveProduct = async (e) => {
    api.post('/product', {
      descricao: this.state.descricao,
      requisito: this.state.requisito,
    }).then(response => 
      swal("Sucesso!", "Produto criado.", "success").then(
        this.props.history.push("/product")
      )
    ).catch(error => swal("Ocorreu um erro!", "Tente novamente.", "error"));
  }

  handleRequisitoChange = (e) => {
    this.setState({requisito: e.target.value});
  }

  handleDescricaoChange = (e) => {
    this.setState({descricao: e.target.value});
  }

  render() {
    return (
        <Context container="true">
              <Typography variant="h6" gutterBottom>
                  Novo Usuário
              </Typography>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <label>Descrição</label>
                    <TextareaAutosize
                      rowsMax={4}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        required
                        id="requisito"
                        name="requisito"
                        label="Requisitos"
                        fullWidth
                        onChange={e => this.handleRequisitoChange}
                      />
                  </Grid>
                  <Grid item justify="flex-end" container xs={12}>
                    <Button size="small" variant="contained" onClick={this.saveProduct}>Salvar</Button>
                  </Grid>
              </Grid>
        </Context>
    );
  }
}

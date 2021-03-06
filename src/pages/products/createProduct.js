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
    titulo: ''
  }

  saveProduct = async (e) => {
    const {titulo, descricao, requisito} = this.state;
    api.post('/produto', {
      descricao,
      requisito,
      titulo
    }).then(response => 
      swal("Sucesso!", "Produto criado.", "success").then(
        this.props.history.push("/product")
      )
    ).catch(error => swal("Ocorreu um erro!", "Tente novamente.", "error"));
  }

  render() {
    return (
        <Context container="true">
              <Typography variant="h6" gutterBottom>
                  Novo Produto
              </Typography>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                     <TextField
                        name="titulo"
                        label="Título"
                        fullWidth
                        value={this.state.titulo}
                        onChange={(e) => this.setState({titulo: e.target.value})}
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <div style={{marginBottom: '10px'}}>
                      <label>Descrição</label>
                    </div>
                    <TextareaAutosize
                      rowsMax={4}
                      onChange={(e) => this.setState({descricao: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        id="requisito"
                        name="requisito"
                        label="Requisitos"
                        fullWidth
                        onChange={(e) => this.setState({requisito: e.target.value})}
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

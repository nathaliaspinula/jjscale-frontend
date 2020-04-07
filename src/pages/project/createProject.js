import React, { Component }from 'react';
import Context from '../../components/context';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import api from '../../services/api';
import MenuItem from '@material-ui/core/MenuItem';
import swal from 'sweetalert';

export default class UserForm extends Component{
  state = {
    nome: '',
    apelido: '',
    cliente: [],
    clientes: []
  }

  componentDidMount() {
    this.loadClients();
  }

  loadClients = async (e) => {
    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
      ];

      this.setState({ clientes: names });
  }

  saveProject = async (e) => {
    api.post('/project', {
      descricao: this.state.descricao,
      requisito: this.state.requisito,
    }).then(response => 
      swal("Sucesso!", "Produto criado.", "success").then(
        this.props.history.push("/product")
      )
    ).catch(error => swal("Ocorreu um erro!", "Tente novamente.", "error"));
  }

  handleNomeChange = (e) => {
    this.setState({ nome: e.target.value });
  }

  handleApelidoChange = (e) => {
    this.setState({ apelido: e.target.value });
  }

  handleClienteChange = (e) => {
    this.setState({ cliente: e.target.value });
  }

  render() {
    return (
        <Context container="true">
              <Typography variant="h6" gutterBottom>
                  Novo Projeto
              </Typography>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                     <TextField
                        required
                        id="nome"
                        name="nome"
                        label="Nome"
                        fullWidth
                        onChange={this.handleNomeChange}
                      />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        required
                        id="apelido"
                        name="apelido"
                        label="Apelido"
                        fullWidth
                        onChange={this.handleApelidoChange}
                      />
                  </Grid>
                  <Grid item xs={12}>
                  <InputLabel id="cliente-label">Cliente</InputLabel>
                  <Select
                    required
                    labelId="cliente"
                    id="cliente"
                    value={this.state.cliente}
                    onChange={this.handleClienteChange}
                    input={<Input />}
                    fullWidth
                    >
                    {this.state.clientes.map((name) => (
                        <MenuItem key={name} value={name}>
                        {name}
                        </MenuItem>
                    ))}
                    </Select>
                  </Grid>
                  <Grid item justify="flex-end" container xs={12}>
                    <Button size="small" variant="contained" onClick={this.saveProject}>Salvar</Button>
                  </Grid>
              </Grid>
        </Context>
    );
  }
}

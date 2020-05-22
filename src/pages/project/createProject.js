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
    await api.get('/cliente').then(response => {
      const clientes = response.data;
      this.setState({ clientes: clientes, isLoading: false });
    }).catch(error => {
        swal("Ocorreu um erro!", "Tente novamente.", "error")
    });
  }

  saveProject = async (e) => {
    const { nome, apelido, cliente } = this.state;
    if(nome && cliente) {
      api.post('/projeto', {
        nome,
        apelido,
        idcliente: cliente
      }).then(response => 
        swal("Sucesso!", "Projeto criado.", "success").then(
          this.props.history.push("/project")
        )
      ).catch(error => swal("Ocorreu um erro!", "Tente novamente.", "error"));
    } else {
      swal("Campos inválidos.", "Verifique se todos os campos obrigatórios estão preenchidos.", "error")
    }

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
                  fullWidth
                  id="nome"
                  name="nome"
                  label="Nome"
                  value={this.state.nome}
                  onChange={(e) => this.setState({nome: e.target.value})}
                  />
            </Grid>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="apelido"
                  name="apelido"
                  label="Apelido"
                  value={this.state.apelido}
                  onChange={(e) => this.setState({apelido: e.target.value})}
                />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="cliente-label">Cliente</InputLabel>
              <Select
                required
                labelId="cliente"
                id="cliente"
                value={this.state.cliente}
                onChange={(e) => this.setState({cliente: e.target.value})}
                input={<Input />}
                fullWidth
                >
                {this.state.clientes.map(item => 
                    <MenuItem key={Math.random()} value={item.idcliente}>
                    {item.razaosocial}
                    </MenuItem>
                )}
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

import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import api from '../../services/api';
import swal from 'sweetalert';

export default class EditProject extends Component{
  state = {
    id: '',
    nome: '',
    apelido: '',
    idcliente: '',
    cliente: {},
    clientes: []
  }

  componentDidMount() {
    this.loadProject();
  }

  loadProject = async () =>
  {
    const id = this.props.id;
    await api.get(`/projeto/${id}`).then(response => {
        const { idprojeto, nome, apelido, idcliente } = response.data.find(projeto => projeto.idprojeto === id);
        this.setState({
            id: idprojeto,
            nome,
            apelido,
            idcliente
        });
        this.loadClients();
    }).catch(error => {
        swal("Ocorreu um erro!", "Tente novamente.", "error")
    });
  }

  loadClients = async (e) => {
    await api.get('/cliente').then(response => {
      const clientes = response.data;
      const clienteSelecionado = response.data.find(item => item.idcliente === this.state.idcliente);
      this.setState({ clientes: clientes, cliente: clienteSelecionado.idcliente, isLoading: false });
    }).catch(error => {
        swal("Ocorreu um erro!", "Tente novamente.", "error").then(
            this.setState({ isLoading: false })
        );
    });
  }

  render() {
    return (
        <Container maxWidth="sm" className="paper-view">
          <Typography variant="h6" gutterBottom>
              Visualizar Projeto
          </Typography>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  disabled
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
                  disabled
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
                  disabled
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
          </Grid>
        </Container>
    );
  }
}

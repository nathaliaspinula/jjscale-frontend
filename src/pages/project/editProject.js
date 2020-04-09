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
      const {id} = this.props.match.params;
       await api.get(`/projeto/${id}`).then(response => {
        const project = response.data[0];
        this.setState({
          id: project.idprojeto,
          nome: project.nome,
          apelido: project.apelido,
          idcliente: project.idcliente
       });
       this.loadClients();
      }).catch(error => {
          swal("Ocorreu um erro!", "Tente novamente.", "error").then(
              this.setState({ isLoading: false })
          );
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

  saveProject = async (e) => {
    api.put('/projeto', {
      idprojeto: this.state.id,
      nome: this.state.nome,
      apelido: this.state.apelido,
      idcliente: this.state.cliente
    }).then(response =>
      swal("Sucesso!", "Projeto alterado.", "success").then(
        this.props.history.push("/project")
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
                  Editar Projeto
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
                        onChange={this.handleNomeChange}
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

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
        const { idprojeto, nome, apelido, idcliente } = response.data.find(projeto => projeto.idprojeto.toString() === id);
        this.setState({
          id: idprojeto,
          nome,
          apelido,
          idcliente
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
    const { id, nome, apelido, cliente } = this.state;
    console.log(cliente)
    if(id && nome && apelido && cliente) {
      api.put('/projeto', {
        idprojeto: id,
        nome,
        apelido,
        idcliente: cliente
      }).then(response =>
        swal("Sucesso!", "Projeto alterado.", "success").then(
          this.props.history.push("/project")
        )
      ).catch(error => swal("Ocorreu um erro!", "Tente novamente.", "error"));
    } else {
      swal("Ocorreu um erro!", "Verifique se todos os campos obrigatórios estão preenchidos.", "error")
    }
   
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

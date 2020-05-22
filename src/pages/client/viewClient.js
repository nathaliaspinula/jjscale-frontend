import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {cnpj} from 'cpf-cnpj-validator';
import api from '../../services/api';
import swal from 'sweetalert';
import Container from '@material-ui/core/Container';
import './styles.css'
export default class UserForm extends Component{
  state = {
    idcliente: '',
    cnpj: '',
    razaosocial: '',
    rua: '',
    numero: '',
    complemento: '',
    cep: '',
    bairro: '',
    uf: '',
    cidade: '',
    pais: '',
    cnpjValidator: false,
  }

  componentDidMount() {
    this.loadClient();
  }

  loadClient = async() => {
    const id = this.props.id;
    api.get(`/cliente/${id}`).then(response => {
        const {
          cpf_cnpj,
          idcliente,
          razaosocial, 
          rua,
          numero,
          complemento,
          cep,
          bairro,
          uf,
          cidade,
          pais,
        } = response.data.find(cliente => cliente.idcliente === id);
        this.setState({
            idcliente,
            cnpj: cnpj.format(cpf_cnpj),
            razaosocial,
            rua: rua ? rua : '',
            numero: numero ? numero : '',
            complemento,
            cep,
            bairro,
            uf,
            cidade,
            pais: pais ? pais : '',
        })
    }).catch(error => swal("Ocorreu um erro!", "Tente novamente.", "error"));

  }


  render() {
    return (
            <Container maxWidth="sm" className="paper-view">
              <Typography variant="h6" gutterBottom>
                Visualizar Cliente
              </Typography>
              <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                      <TextField
                          required
                          disabled
                          fullWidth
                          id="razaosocial"
                          name="razaosocial"
                          label="Razão Social"
                          value={this.state.razaosocial}
                          onChange={(e) => this.setState({razaosocial: e.target.value})}
                        />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                      <TextField
                          required
                          disabled
                          fullWidth
                          id="cnpj"
                          name="cnpj"
                          label="CNPJ"
                          value={this.state.cnpj}
                          onChange={this.handleCnpjChange}
                          type="text"
                          inputProps={{
                            maxLength: 15
                          }}
                          error = {
                            this.state.cnpjValidator
                          }
                        />
                  </Grid>
                  <Grid item sm={2} xs={12}>
                      <TextField
                          required
                          fullWidth
                          disabled
                          id="cep"
                          name="cep"
                          label="CEP"
                          type="number"
                          value={this.state.cep}
                          onChange={this.handleCepChange}
                        />
                  </Grid>
                  <Grid item sm={2} xs={12}>
                      <TextField
                          required
                          fullWidth
                          disabled
                          id="numero"
                          name="numero"
                          label="Numero"
                          type="number"
                          value={this.state.numero}
                          onChange={(e) => this.setState({numero: e.target.value})}
                        />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          fullWidth
                          disabled
                          id="complemento"
                          name="complemento"
                          label="Complemento"
                          value={this.state.complemento}
                          onChange={(e) => this.setState({complemento: e.target.value})}
                        />
                  </Grid>
                  <Grid item sm={5} xs={12} >
                      <TextField
                          required
                          fullWidth
                          disabled
                          id="rua"
                          name="rua"
                          label="Rua"
                          value={this.state.rua}
                          onChange={(e) => this.setState({rua: e.target.value})}
                        />
                  </Grid>
                  <Grid item sm={3} xs={12} >
                      <TextField
                          required
                          fullWidth
                          disabled
                          id="bairro"
                          name="bairro"
                          label="Bairro"
                          value={this.state.bairro}
                          onChange={(e) => this.setState({bairro: e.target.value})}
                        />
                  </Grid>
                  <Grid item sm={3} xs={12}>
                      <TextField
                          required
                          fullWidth
                          disabled
                          id="cidade"
                          name="cidade"
                          label="Cidade"
                          value={this.state.cidade}
                          onChange={(e) => this.setState({cidade: e.target.value})}
                        />
                  </Grid>
                  <Grid item sm={3} xs={12}>
                      <TextField
                          required
                          fullWidth
                          disabled
                          id="uf"
                          name="uf"
                          label="UF"
                          value={this.state.uf}
                          onChange={(e) => this.setState({uf: e.target.value})}
                        />
                  </Grid>
                  <Grid item sm={3} xs={12}>
                      <TextField
                          required
                          fullWidth
                          disabled
                          id="pais"
                          name="pais"
                          label="Pais"
                          value={this.state.pais}
                          onChange={(e) => this.setState({pais: e.target.value})}
                        />
                  </Grid>
              </Grid>
        </Container>
    );
  }
}
import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Context from '../../components/context';
import {cnpj} from 'cpf-cnpj-validator';
import api from '../../services/api';
import swal from 'sweetalert';
import axios from 'axios';

export default class UserForm extends Component{
  state = {
    idCliente: '',
    cnpj: '',
    razaoSocial: '',
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

  loadClient = async() =>
  {
    const {id} = this.props.match.params;
    api.get(`/cliente/${id}`).then(response => {
        const result = response.data[0];
        this.setState({
            idCliente: result.idcliente,
            cnpj: cnpj.format(result.cpf_cnpj),
            razaoSocial: result.razaosocial,
            rua: result.rua,
            numero: result.numero,
            complemento: result.complemento,
            cep: result.cep,
            bairro: result.bairro,
            uf: result.uf,
            cidade: result.cidade,
            pais: result.pais,
        })
    }).catch(error => swal("Ocorreu um erro!", "Tente novamente.", "error"));

  }

  handleCnpjChange = async (event) =>
  {
    const value = event.target.value;
    let formatted = value;
    let invalid = false;

    if (value.length <= 18) {
      formatted = cnpj.format(value);
    }
    if(!cnpj.isValid(value))
    {
      invalid = true;
    }
    await this.setState({cnpjValidator: invalid, cnpj: formatted});
  }

  handleRazaoSocialChange = async (event) =>
  {
    await this.setState({ razaoSocial: event.target.value });
  }

  handleRuaChange = async (event) =>
  {
    await this.setState({ rua: event.target.value });
  }

  handleNumeroChange = async (event) =>
  {
    await this.setState({ numero: event.target.value });
  }

  handleComplementoChange = async (event) =>
  {
    await this.setState({ complemento: event.target.value });
  }

  handleCepChange = async (event) =>
  {
    const cepDigitado = event.target.value;
    this.setState({ cep:  cepDigitado});

    if (cepDigitado.length >= 8)
    {
      await axios.get(`https://viacep.com.br/ws/${cepDigitado}/json/`).then(response => {
        if(!response.data.error) {
          const result = response.data;
          this.setState({
            rua: result.rua,
            complemento: result.complemento,
            bairro: result.bairro,
            cidade: result.localidade,
            uf: result.uf        
          })
        } else {
          this.setState({
            rua: '',
            complemento: '',
            bairro: '',
            cidade: '',
            uf: ''       
          })
        }
      }).catch(error => {
        this.setState({
          rua: '',
          complemento: '',
          bairro: '',
          cidade: '',
          uf: ''       
        })
      })
    }
  }

  handleBairroChange = async (event) =>
  {
    await this.setState({ bairro: event.target.value });
  }
  
  handleUfChange = async (event) =>
  {
    await this.setState({ uf: event.target.value });
  }

  handleCidadeChange = async (event) =>
  {
    await this.setState({ cidade: event.target.value });
  }

  handlePaisChange = async (event) =>
  {
    await this.setState({ pais: event.target.value });
  }

  saveCliente = async (e) => {
    const cnpjValue = cnpj.strip(this.state.cnpj);

    if (cnpjValue && !this.state.cnpjValidator) {
          api.put('/cliente', {
            idcliente: this.state.idCliente,
            cpf_cnpj: cnpjValue,
            razaosocial: this.state.razaoSocial,
            rua: this.state.rua,
            numero: this.state.numero,
            cep: this.state.cep,
            complemento: this.state.complemento,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            uf: this.state.uf
          }).then(response => 
            swal("Sucesso!", "Cliente criado.", "success").then(
              this.props.history.push("/client")
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
                  Editar Cliente
              </Typography>
              <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                      <TextField
                          required
                          fullWidth
                          id="razaoSocial"
                          name="razaoSocial"
                          label="Razão Social"
                          value={this.state.razaoSocial}
                          onChange={this.handleRazaoSocialChange}
                        />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                      <TextField
                          required
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
                          id="numero"
                          name="numero"
                          label="Numero"
                          type="number"
                          value={this.state.numero}
                          onChange={this.handleNumeroChange}
                        />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          fullWidth
                          id="complemento"
                          name="complemento"
                          label="Complemento"
                          value={this.state.complemento}
                          onChange={this.handleComplementoChange}
                        />
                  </Grid>
                  <Grid item sm={5} xs={12} >
                      <TextField
                          required
                          fullWidth
                          id="rua"
                          name="rua"
                          label="Rua"
                          value={this.state.rua}
                          onChange={this.handleRuaChange}
                        />
                  </Grid>
                  <Grid item sm={3} xs={12} >
                      <TextField
                          required
                          fullWidth
                          id="bairro"
                          name="bairro"
                          label="Bairro"
                          value={this.state.bairro}
                          onChange={this.handleBairroChange}
                        />
                  </Grid>
                  <Grid item sm={3} xs={12}>
                      <TextField
                          required
                          fullWidth
                          id="cidade"
                          name="cidade"
                          label="Cidade"
                          value={this.state.cidade}
                          onChange={this.handleCidadeChange}
                        />
                  </Grid>
                  <Grid item sm={3} xs={12}>
                      <TextField
                          required
                          fullWidth
                          id="uf"
                          name="uf"
                          label="UF"
                          value={this.state.uf}
                          onChange={this.handleUfChange}
                        />
                  </Grid>
                  <Grid item sm={3} xs={12}>
                      <TextField
                          required
                          fullWidth
                          id="pais"
                          name="pais"
                          label="Pais"
                          value={this.state.pais}
                          onChange={this.handlePaisChange}
                        />
                  </Grid>
                  <Grid item justify="flex-end" container xs={12}>
                    <Button size="small" variant="contained" onClick={this.saveCliente}>Salvar</Button>
                  </Grid>
              </Grid>
        </Context>
    );
  }
}
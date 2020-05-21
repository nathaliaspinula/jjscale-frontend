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

  loadClient = async() =>
  {
    const {id} = this.props.match.params;
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
        } = response.data.find(cliente => cliente.idcliente.toString() === id);
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

  handleCepChange = async (event) =>
  {
    const cepDigitado = event.target.value;
    this.setState({ cep:  cepDigitado});

    if (cepDigitado.length >= 8)
    {
      await axios.get(`https://viacep.com.br/ws/${cepDigitado}/json/`).then(response => {
        if(!response.data.error) {
          const {logradouro, complemento, bairro, localidade, uf} = response.data;
          console.log()
          this.setState({
            rua: logradouro ? logradouro : '',
            complemento: complemento ? complemento : '',
            bairro: bairro ? bairro : '',
            cidade: localidade ? localidade : '',
            uf: uf ? uf : ''
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

  saveCliente = async (e) => {
    const cnpjValue = cnpj.strip(this.state.cnpj);
    const { 
      idcliente,
      razaosocial,
      rua,
      numero,
      cep,
      complemento,
      bairro,
      cidade,
      uf,
      pais
    } = this.state;

    if (cnpjValue &&
      !this.state.cnpjValidator &&
      idcliente &&
      razaosocial &&
      rua &&
      numero &&
      cep &&
      complemento &&
      bairro &&
      cidade &&
      uf &&
      pais) {
          api.put('/cliente', {
            idcliente,
            cpf_cnpj: cnpjValue,
            razaosocial,
            rua,
            numero,
            cep,
            complemento,
            bairro,
            cidade,
            uf,
            pais
          }).then(response => 
            swal("Sucesso!", "Cliente atualizado.", "success").then(
              this.props.history.push("/client")
            )
        ).catch(error => swal("Ocorreu um erro!", "Tente novamente.", "error"));
    }
    else {
      swal("Campos inválidos.", "Verifique se todos os campos obrigatórios estão preenchidos.", "error");
    }
  }

  render() {
    return (
<Context container="true">
              <Typography variant="h6" gutterBottom>
                  Novo Cliente
              </Typography>
              <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                      <TextField
                          required
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
                          onChange={(e) => this.setState({numero: e.target.value})}
                        />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          fullWidth
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
                          id="pais"
                          name="pais"
                          label="Pais"
                          value={this.state.pais}
                          onChange={(e) => this.setState({pais: e.target.value})}
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
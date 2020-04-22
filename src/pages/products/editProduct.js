import React, { Component }from 'react';
import Context from '../../components/context';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import api from '../../services/api';
import swal from 'sweetalert';

export default class Product extends Component{
  state = {
    requisito: '',
    descricao: '',
  }

  componentDidMount() {
    this.loadProduct();
  }

  loadProduct = async () => {
    const {id} = this.props.match.params;
    await api.get(`/produto/${id}`).then(response => {
     const produto = response.data[0];
     this.setState({
       id: produto.idproduto,
       descricao: produto.descricao,
       requisito: produto.requisito
      });
    }).catch(error => {
        swal("Ocorreu um erro!", "Tente novamente.", "error").then(
            this.setState({ isLoading: false })
        );
    });
  }

  saveProduct = async (e) => {
    api.post('/produto', {
      descricao: this.state.descricao,
      requisito: this.state.requisito,
    }).then(response => 
      swal("Sucesso!", "Produto editado.", "success").then(
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
                  Novo Produto
              </Typography>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <div style={{marginBottom: '10px'}}>
                      <label>Descrição</label>
                    </div>
                    <TextareaAutosize
                      rowsMax={4}
                      value={this.state.descricao}
                      onChange={this.handleDescricaoChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        required
                        id="requisito"
                        name="requisito"
                        label="Requisitos"
                        fullWidth
                        value={this.state.requisito}
                        onChange={this.handleRequisitoChange}
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

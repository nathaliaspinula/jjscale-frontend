import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Container from '@material-ui/core/Container';
import api from '../../services/api';
import swal from 'sweetalert';

export default class Product extends Component{
  state = {
    requisito: '',
    descricao: '',
    titulo: ''
  }

  componentDidMount() {
    this.loadProduct();
  }

  loadProduct = async () => {
    const id = this.props.id;
    await api.get(`/produto/${id}`).then(response => {
     const {idproduto, descricao, requisito, titulo} = response.data.find(produto => produto.idproduto === id);
     this.setState({
       id: idproduto,
       descricao,
       requisito,
       titulo
      });
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
                  Visualizar Produto
              </Typography>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                     <TextField
                        name="titulo"
                        label="Título"
                        fullWidth
                        disabled
                        value={this.state.titulo}
                        onChange={(e) => this.setState({titulo: e.target.value})}
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <div style={{marginBottom: '10px'}}>
                      <label>Descrição</label>
                    </div>
                    <TextareaAutosize
                        disabled
                      rowsMax={4}
                      value={this.state.descricao}
                      onChange={(e) => this.setState({descricao: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        name="requisito"
                        label="Requisitos"
                        disabled
                        fullWidth
                        value={this.state.requisito}
                        onChange={(e) => this.setState({requisito: e.target.value})}
                      />
                  </Grid>
              </Grid>
        </Container>
    );
  }
}

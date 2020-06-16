import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Container from '@material-ui/core/Container';
import api from '../../services/api';
import swal from 'sweetalert';

export default class ViewProposal extends Component{
  state = {
    observacao: '',
    log_data: '',
    nome: '',
    usuario: '',
  }

  componentDidMount() {
    this.loadProposal();
  }

  loadProposal = async () => {
    const id = this.props.id;
    await api.get(`/proposta/${id}`).then(response => {
     const { usuario, observacao, log_data, nome } = response.data.find(produto => produto.idproposta === id);
     this.setState({
        usuario,
        observacao: observacao || '',
        log_data,
        nome
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
                  Visualizar Proposta
              </Typography>
              <Grid container spacing={3}>
                  <Grid item sm={12}>
                     <TextField
                        name="projeto"
                        label="Projeto"
                        fullWidth
                        disabled
                        value={this.state.nome}
                        onChange={(e) => this.setState({nome: e.target.value})}
                      />
                  </Grid>
                  <Grid item sm={12}>
                     <TextField
                        name="dataCriacao"
                        label="Data Criação"
                        disabled
                        type="date"
                        fullWidth
                        value={this.state.log_data}
                        onChange={(e) => this.setState({requisito: e.target.value})}
                      />
                  </Grid>
                  <Grid item sm={12}>
                     <TextField
                        name="criador"
                        label="Criador"
                        disabled
                        fullWidth
                        value={this.state.usuario}
                        onChange={(e) => this.setState({requisito: e.target.value})}
                      />
                  </Grid>
                  <Grid item sm={12}>
                    <div style={{marginBottom: '10px'}}>
                      <label>Observação</label>
                    </div>
                    <TextareaAutosize
                      disabled
                      rowsMax={4}
                      value={this.state.observacao}
                      onChange={(e) => this.setState({observacao: e.target.value})}
                    />
                  </Grid>
              </Grid>
        </Container>
    );
  }
}

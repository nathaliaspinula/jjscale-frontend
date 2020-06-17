import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Context from '../../components/context';
import api from '../../services/api';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class RegisterProposal extends Component{
    state = {
        observacao: '',
        log_data: '',
        nome: '',
        usuario: '',
        idproposta: null,
    }
  
    componentDidMount() {
        this.loadProposal();
    }

    loadProposal = async () => {
        const { id } = this.props.match.params;
        await api.get(`/proposta/${id}`).then(response => {
         const { usuario, observacao, log_data, nome } = response.data.find(produto => produto.idproposta.toString() === id);
         this.setState({
            usuario,
            observacao: observacao || '',
            log_data,
            nome,
            idproposta: id
          });
        }).catch(() => {
            swal("Ocorreu um erro!", "Tente novamente.", "error").then(
                this.setState({ isLoading: false })
            );
        });
    }

    saveProposal = () => {
        const { observacao, idproposta } = this.state;
        const { id } = JSON.parse(localStorage.getItem('user'));
        if (observacao) {
            api.put('/proposta/', {
                idusuario: id,
                observacao,
                idproposta
            }).then(() => 
                swal("Sucesso!", "Proposta atualizada.", "success").then(
                    this.props.history.push("/proposal")
                )
            ).catch(() => swal("Ocorreu um erro!", "Tente novamente.", "error"));
        } else {
            swal("Campos inválidos.", "Verifique se todos os campos obrigatórios estão preenchidos.", "error")
        }
    }

    render() {
        return (
            <Context container="true" maxWidth="sm" className="paper-view">
                <Typography variant="h6" gutterBottom>
                    Registrar Proposta
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={3} sm={3}>
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
                        <div style={{marginBottom: '10px'}}>
                        <label>Observação</label>
                        </div>
                        <TextareaAutosize
                        rowsMax={4}
                        value={this.state.observacao}
                        onChange={(e) => this.setState({observacao: e.target.value})}
                        />
                    </Grid>
                </Grid>
                <Grid item justify="flex-end" container xs={12}>
                    <Button size="small" variant="contained" onClick={this.saveProposal}>Salvar</Button>
                </Grid>
            </Context>
        );
    }
}

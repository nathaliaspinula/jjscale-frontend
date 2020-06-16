import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Context from '../../components/context';
import api from '../../services/api';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';

export default class RegisterProposal extends Component{
    state = {
        observacao: '',
        projeto: '',
    }
  
    componentDidMount() {
        this.loadProjetos();
    }

    loadProjetos = async (e) => {
        await api.get('/projeto').then(response => {
        const projetos = response.data;
        this.setState({ projetos, isLoading: false });
        }).catch(error => {
            swal("Ocorreu um erro!", "Tente novamente.", "error")
        });
    }

    saveProposal = () => {
        const { projeto, observacao } = this.state;
        const { id } = JSON.parse(localStorage.getItem('user'));
        console.log(id);
        if (projeto && observacao) {
            api.post('/proposta', {
                idprojeto: projeto,
                idusuario: id,
                observacao
            }).then(response => 
                swal("Sucesso!", "Proposta registrada.", "success").then(
                    this.props.history.push("/proposal")
                )
            ).catch(error => swal("Ocorreu um erro!", "Tente novamente.", "error"));
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
                        <InputLabel id="projeto-label">Projeto</InputLabel>
                        <Select
                            required
                            labelId="projeto"
                            id="projeto"
                            value={this.state.projeto}
                            onChange={(e) => this.setState({projeto: e.target.value})}
                            input={<Input />}
                            fullWidth
                            >
                            { this.state.projetos && this.state.projetos.map(item => 
                                <MenuItem
                                key={item.idprojeto}
                                value={item.idprojeto}
                                >
                                {item.nome}
                                </MenuItem>
                            )}
                        </Select>
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

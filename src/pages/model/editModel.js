import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Context from '../../components/context';
import api from '../../services/api';
import swal from 'sweetalert';
import Editor from '../../components/editor';
import { stateFromHTML } from 'draft-js-import-html';

export default class ModelForm extends Component{
  constructor(props) {
      super(props);
      this.state = {
        produtos: [],
        produto: '',
        editor: '',
        topico: '',
        descricao: '',
      };
  }
  
  componentDidMount() {
    this.loadModel();
  }

  loadModel = async(e) => {
    const { id } = this.props.match.params;
    await api.get(`/modelo/${id}`).then(response => {
        const { topico, descricao, json } = response.data.find(item => item.idmodelo.toString() === id);
        const contentState = stateFromHTML(json);
        console.log(contentState)
        this.setState({ topico, descricao, isLoading: false });
    }).catch(error => {
        swal("Ocorreu um erro!", "Tente novamente.", "error")
    });
  }

  loadProducts = async (e) => {
    await api.get('/produto').then(response => {
      const produtos = response.data;
      this.setState({ produtos, isLoading: false });
    }).catch(error => {
        swal("Ocorreu um erro!", "Tente novamente.", "error")
    });
  }

  saveUser = async () => {
      const { topico, descricao, editor } = this.state;
      if (editor && topico) {
            api.post('/modelo', { 
              topico,
              descricao,
              json: editor
            }).then(response => 
              swal("Sucesso!", "Modelo criado.", "success").then(
                this.props.history.push("/model")
              )
          ).catch(error => swal("Ocorreu um erro!", "Tente novamente.", "error"));
      } else {
        swal("Campos inválidos.", "Verifique se todos os campos obrigatórios estão preenchidos.", "error")
      }
  }

  handleProductChange = async(e) => {
    const produto = e.target.value;
    
    this.setState({ produto });
    
    const { produtos } = this.state;
    
    const produtoInfo = produtos.find(p => p.idproduto === produto)
    
    this.setState({ editor: produtoInfo.descricao });
  }

  render() {
    const { produtos } = this.state;
    return (
        <Context container="true">
          <Typography variant="h6" gutterBottom>
            Novo Modelo
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                name="topico"
                label="Tópico"
                required
                fullWidth
                value={this.state.topico}
                onChange={(e) => this.setState({topico: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="descricao"
                label="Descrição"
                fullWidth
                value={this.state.descricao}
                onChange={(e) => this.setState({descricao: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel id="produto-label">Produto</InputLabel>
              <Select
                required
                labelId="produto"
                id="produto"
                value={this.state.produto}
                onChange={this.handleProductChange}
                input={<Input />}
                fullWidth
                >
                { produtos && produtos.map(item => 
                    <MenuItem key={Math.random()} value={item.idproduto}>
                    {item.titulo}
                    </MenuItem>
                )}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Editor
                callback={(evt) => this.setState({
                  editor: evt,
                })}
              />
            </Grid>
          <Grid item justify="flex-end" container xs={12}>
            <Button size="small" variant="contained" onClick={this.saveUser}>Salvar</Button>
          </Grid>
        </Grid>
      </Context>
    );
  }
}

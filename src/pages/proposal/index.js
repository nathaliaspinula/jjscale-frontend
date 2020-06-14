import React, {Component, forwardRef} from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import Context from '../../components/context';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Modal from '@material-ui/core/Modal'
import api from '../../services/api';
import {Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import swal from 'sweetalert';
import ViewProduct from './viewProposal';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';

export default class Products extends Component {

    state = {
        products: [],
        idProduto: '',
        isLoading: true,
        open: false
    }
    
    componentDidMount() {
        this.loadProducts();
    }

    handleOpen = () => {
        this.setState({open: true});
    };
   
    loadProducts = async () =>
    {
        await api.get('/proposta').then(response => {
            const products = response.data;
            console.log(products);
            this.setState({ products, isLoading: false });
        }).catch(error => {
            swal("Ocorreu um erro!", "Tente novamente.", "error").then(
                this.setState({ isLoading: false })
            );
        });
    }
    
    viewProduct = (idproduto) => {
        this.setState({ idProduto: idproduto });
        this.handleOpen();
    }

    deleteProduct = (idproduto) => {
        swal({
            title: "Você deseja excluir este registro?",
            text: "Após a exclusão não será possível recuperá-lo.",
            icon: "warning",
            buttons: {
                cancel: "Cancelar",
                confirm: "Excluir"
            },
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                const { id } = JSON.parse(localStorage.getItem('user'));
                api.delete('/produto', {
                    data:{
                        id: idproduto,
                        idusuario: id
                    }
                }).then(response => {
                    swal("Produto excluído com sucesso.", {
                        icon: "success",
                    });
                    this.loadProducts()
                }).catch(error => {
                    swal("Ocorreu um erro!", "Tente novamente.", "error").then(
                        this.setState({ isLoading: false })
                    );
                });
            }
          });
    }

    render() {
        const tableIcons = {
            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
            ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
        };
        
        return (
            <Context >
                    <Modal
                        open={this.state.open}
                        onClose={(e) => this.setState({open: false, idProduto: ''})}
                        onEscapeKeyDown={(e) => this.setState({open: false, idProduto: ''})}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        className="modal-view"
                    >
                        <ViewProduct id={this.state.idProduto}/>
                    </Modal>
                    <MaterialTable
                        icons={tableIcons}
                        title="Propostas"
                        columns={[
                            { title: 'Título', field: 'observacao' },
                            { title: 'Ação', field: 'id', editable: 'never',
                             render: rowData =>
                                <div>
                                    <VisibilityIcon onClick={() => this.viewProduct(rowData.idproduto)} color="action" fontSize="small"/>
                                    <Link to={`/proposal/${rowData.idproposta}`}>
                                        <EditIcon color="action" fontSize="small"/>
                                    </Link>
                                    <DeleteIcon
                                        onClick={() => this.deleteProduct(rowData.idproduto)}
                                        color="action"
                                        fontSize="small"/>
                                </div>
                            }
                        ]}
                        data={
                            this.state.products
                        }
                        components={{
                            Toolbar: props => (
                                <div>
                                    <MTableToolbar {...props}/>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}>
                                        <Link to="/proposal/register" className="button">Registrar Proposta</Link>
                                    </div>
                                </div>
                            )
                        }}
                        options={{
                            headerStyle: {
                                fontWeight: 'bold'
                            }
                        }}
                        isLoading={this.state.isLoading}
                    />
            </Context>
        );
    };
}
import React, {Component, forwardRef} from 'react';
import MaterialTable, { MTable, MTableToolbar } from 'material-table';
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
import {cpf as cpfLib} from 'cpf-cnpj-validator';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import swal from 'sweetalert';

export default class Users extends Component {

    state = {
        products: [],
        isLoading: true
    }
    
    componentDidMount() {
        this.loadProducts();
    }
    
    loadProducts = async () =>
    {
        await api.get('/product').then(response => {
            const products = response.data.map(item => ({...item, cpf: cpfLib.format(item.cpf) }))
            this.setState({ products: products, isLoading: false });
        }).catch(error => {
            swal("Ocorreu um erro!", "Tente novamente.", "error").then(
                this.setState({ isLoading: false })
            );
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
                    <MaterialTable
                        icons={tableIcons}
                        title="Produtos"
                        columns={[
                            { title: 'Descrição', field: 'descricao' },
                            { title: 'Requisito', field: 'requisito' },
                            { title: 'Ação', field: 'id', editable: 'never',
                             render: rowData => <Link to={`/user/${rowData.id}`}><EditIcon/></Link>
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
                                        <Link to="/product/new" className="button">Novo Produto</Link>
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
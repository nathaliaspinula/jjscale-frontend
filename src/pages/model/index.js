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
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

export default class Model extends Component {

    state = {
        models: [],
        isLoading: true
    }
    
    componentDidMount() {
        this.loadModels();
    }
    
    loadModels = async () =>
    {
        await api.get('/modelo').then(response => {
            const models = response.data;
            this.setState({ models, isLoading: false });
        }).catch(() => {
            swal("Ocorreu um erro!", "Tente novamente.", "error").then(
                this.setState({ isLoading: false })
            );
        });
    }

    deleteProject = (idmodelo) => {
        swal({
            title: "Você deseja excluir este modelo?",
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
                api.delete('/modelo', {
                    data:{
                        id: idmodelo,
                        idusuario: id
                    }
                }).then(() => {
                    swal("Modelo excluído com sucesso.", {
                        icon: "success",
                    });
                    this.loadModels();
                }).catch(() => {
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
            <Context>
                    <MaterialTable
                        icons={tableIcons}
                        title="Modelos"
                        columns={[
                            { title: 'Tópico', field: 'topico' },
                            { title: 'Descrição', field: 'descricao' },
                            { title: 'Ação', field: 'idmodelo', editable: 'never',
                             render: rowData =>
                                <React.Fragment>
                                    <Link onClick={() => this.deleteProject(rowData.idmodelo)}>
                                        <DeleteIcon color="action" fontSize="small"/>
                                    </Link>
                                </React.Fragment>
                            }
                        ]}
                        data={
                            this.state.models
                        }
                        components={{
                            Toolbar: props => (
                                <div>
                                    <MTableToolbar {...props}/>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}>
                                        <Link to="/model/new" className="button">Novo Modelo</Link>
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

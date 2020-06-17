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
import EditIcon from '@material-ui/icons/Edit';
import swal from 'sweetalert';
import ViewProduct from './viewProject';
import Modal from '@material-ui/core/Modal';
import VisibilityIcon from '@material-ui/icons/Visibility';

export default class Project extends Component {

    state = {
        projects: [],
        idProjeto: '',
        isLoading: true,
        open: false
    }
    
    componentDidMount() {
        this.loadProjects();
    }
    
    loadProjects = async () =>
    {
        await api.get('/projeto').then(response => {
            const projects = response.data;
            this.setState({ projects: projects, isLoading: false });
        }).catch(error => {
            swal("Ocorreu um erro!", "Tente novamente.", "error").then(
                this.setState({ isLoading: false })
            );
        });
    }
    
    handleOpen = () => {
        this.setState({open: true});
    };

    viewClient = (idcliente) => {
        this.setState({ idProjeto: idcliente });
        this.handleOpen();
    }

    deleteProject = (idprojeto) => {
        swal({
            title: "Você deseja excluir este projeto?",
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
                api.delete('/projeto', {
                    data: {
                        id: idprojeto, 
                        idusuario: id
                    }
                }).then(response => {
                    swal("Projeto excluído com sucesso.", {
                        icon: "success",
                    });
                    this.loadProjects()
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
                        onClose={(e) => this.setState({open: false, idProjeto: ''})}
                        onEscapeKeyDown={(e) => this.setState({open: false, idProjeto: ''})}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        className="modal-view"
                    >
                        <ViewProduct id={this.state.idProjeto}/>
                    </Modal>
                    <MaterialTable
                        icons={tableIcons}
                        title="Projetos"
                        columns={[
                            { title: 'Nome', field: 'nome' },
                            { title: 'Apelido', field: 'apelido' },
                            { title: 'Cliente', field: 'razaosocial' },
                            { title: 'Ação', field: 'id', editable: 'never',
                             render: rowData => 
                            <React.Fragment>
                                <VisibilityIcon onClick={() => this.viewClient(rowData.idprojeto)} color="action" fontSize="small"/>
                                <Link to={`/project/${rowData.idprojeto}`}>
                                    <EditIcon color="action" fontSize="small"/>
                                </Link>
                                <DeleteIcon
                                    onClick={() => this.deleteProject(rowData.idprojeto)}
                                    color="action"
                                    fontSize="small"/>
                                
                            </React.Fragment>
                            }
                        ]}
                        data={
                            this.state.projects
                        }
                        components={{
                            Toolbar: props => (
                                <div>
                                    <MTableToolbar {...props}/>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}>
                                        <Link to="/project/new" className="button">Novo Projeto</Link>
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
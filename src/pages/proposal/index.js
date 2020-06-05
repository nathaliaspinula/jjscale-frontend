import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Editor, EditorState } from 'draft-js';
import Context from '../../components/context';
import api from '../../services/api';
import swal from 'sweetalert';
import './styles.css';
import { stateFromHTML } from 'draft-js-import-html';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography'
import coverGenerator from '../../components/utils/coverGenerator';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'white',
    padding: grid,
    width: 250
});

export default class Proposal extends Component {

    state = {
        items: [],
        selected: [],
        projetos: [],
        projeto: ''
    };

    componentDidMount() {
        this.loadModels();
        this.loadProjetos()
    }

    loadProjetos = async (e) => {
        await api.get('/projeto').then(response => {
          const projetos = response.data;
          this.setState({ projetos, isLoading: false });
        }).catch(error => {
            swal("Ocorreu um erro!", "Tente novamente.", "error")
        });
    }

    loadModels = async () =>
    {
        await api.get('/modelo').then(response => {
            const models = response.data;
            const modelsWithId = models.map(item => {
                const contentState = stateFromHTML(item.json);
                return {...item, id: `item-${item.idmodelo}`, editorState: EditorState.createWithContent(contentState)}
            })
            this.setState({ items : modelsWithId, isLoading: false });
        }).catch(error => {
            swal("Ocorreu um erro!", "Tente novamente.", "error").then(
                this.setState({ isLoading: false })
            );
        });
    }

    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };
    
    printDocument() {
        const divToPrint = document.getElementById('divToPrint');
        const capa = document.getElementById('capa');
        const cover = new DOMParser().parseFromString(coverGenerator(), "text/html");
        capa.appendChild(cover.querySelector('div'));
        const html2pdf = window.html2pdf;
        html2pdf().from(divToPrint).save();
    }
    
    render() {        
        return (
            <Context container="true">
                <Typography variant="h6" gutterBottom>
                    Nova Proposta
                </Typography>
                <Grid container justify="space-around" alignItems="center" xs={12} spacing={3}>
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
                    <Button size="small" variant="contained" onClick={this.printDocument}>Download</Button>
                </Grid>
                <hr className="line" />
                <Grid container spacing={2} className="container-proposal">
                    <Grid item justify="space-around" container xs={12} className="dnd-space">
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Clique e arraste para selecionar os modelos desejados.
                                            </Typography>
                                        {this.state.items.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        className="items"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        <b>{item.topico}</b>
                                                        <p>{item.descricao}</p>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <Droppable 
                                droppableId="droppable2">
                                {(provided, snapshot) => (
                                    <div
                                        className="box"
                                    >
                                        <div
                                            id="divToPrint"
                                            className="as-paper"
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}>
                                            {this.state.selected.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                    className="draggable-item-print">
                                                    {(provided, snapshot) => (
                                                    <div>
                                                        <div id="capa"></div>
                                                        <div
                                                            className="draggable-item-print"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}>
                                                            {
                                                                item.json ?
                                                                <Editor
                                                                    readOnly
                                                                    editorState={item.editorState}
                                                                    spellCheck={true}
                                                                />
                                                                : null
                                                            }
                                                        
                                                        </div>
                                                    </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </Grid>
                </Grid>
            </Context>
        );
    };
}

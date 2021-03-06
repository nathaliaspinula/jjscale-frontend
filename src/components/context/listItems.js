import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Folder from '@material-ui/icons/Folder';
import Person from '@material-ui/icons/Person';
import Group from '@material-ui/icons/Group';
import Description from '@material-ui/icons/Description';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PieChartIcon from '@material-ui/icons/PieChart';
import LaunchIcon from '@material-ui/icons/Launch';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import { Link } from 'react-router-dom';
import './styles/listItem.css';

//cód. -> 2778827

export const mainListItems = (
  <div>
    <Link to='/client' className='link'>
      <ListItem button>
        <ListItemIcon>
          <Group />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItem>
    </Link>
    <Link to='/user' className='link'>
      <ListItem button>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
      </ListItem>
    </Link>
    <Link to='/product' className='link'>
      <ListItem button>
        <ListItemIcon>
          <LocalShippingIcon />
        </ListItemIcon>
        <ListItemText primary="Produtos" />
      </ListItem>
    </Link>
    <Link to='/project' className='link'>
      <ListItem button>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText primary="Projetos" />
      </ListItem>
    </Link>
    <Link to='/model' className='link'>
      <ListItem button>
        <ListItemIcon>
          <TextFieldsIcon />
        </ListItemIcon>
        <ListItemText primary="Modelos" />
      </ListItem>
    </Link>
    <Link to='/proposal' className='link'>
      <ListItem button>
        <ListItemIcon>
          <Description />
        </ListItemIcon>
        <ListItemText primary="Propostas" />
      </ListItem>
    </Link>
    <Link to='/proposal/create' className='link'>
      <ListItem button>
        <ListItemIcon>
          <LaunchIcon />
        </ListItemIcon>
        <ListItemText primary="Emitir Proposta" />
      </ListItem>
    </Link>
    <Link to='/dashboard' className='link'>
      <ListItem button>
        <ListItemIcon>
          <PieChartIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
  </div>
);

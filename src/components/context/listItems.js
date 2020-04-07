import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import Person from '@material-ui/icons/Person';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Link } from 'react-router-dom';
import './styles/listItem.css';

//cód. -> 2778827

export const mainListItems = (
  <div>
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
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Projetos" />
      </ListItem>
    </Link>
  </div>
);

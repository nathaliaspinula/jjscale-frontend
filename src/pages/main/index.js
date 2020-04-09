import React, { Component } from 'react';
import Context from '../../components/context'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/Person';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Link } from 'react-router-dom';
import './styles.css';

export default class Main extends Component{
  render(){
      return (
        <Context>
          <Grid container spacing={4} justify="space-around" className="main-responsive">
            <Grid item sm={3}>
              <Link to="/client">
                <Card variant="outlined">
                  <CardContent className="main-card-content">
                    <Person
                      className="main-card-icons" 
                      style={{ fontSize: 40 }}
                    />
                    <Typography
                      color="textPrimary"
                      className="main-card-title"
                    >
                      Clientes
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item sm={3}>
              <Link to="/user">
                <Card variant="outlined">
                  <CardContent className="main-card-content">
                    <Person
                      className="main-card-icons" 
                      style={{ fontSize: 40 }}
                    />
                    <Typography
                      color="textPrimary"
                      className="main-card-title"
                    >
                      Usuários
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
            <Grid item sm={3}>
              <Link to="/product">
                  <Card variant="outlined">
                    <CardContent className="main-card-content">
                      <LocalShippingIcon
                        className="main-card-icons" 
                        style={{ fontSize: 40 }}
                      />
                      <Typography
                        color="textPrimary"
                        className="main-card-title"
                      >
                        Produtos
                      </Typography>
                    </CardContent>
                  </Card>
              </Link>
            </Grid>
            <Grid item sm={3}>
              <Link to="/project">
                <Card variant="outlined">
                  <CardContent className="main-card-content">
                    <Person
                      className="main-card-icons" 
                      style={{ fontSize: 40 }}
                    />
                    <Typography
                      color="textPrimary"
                      className="main-card-title"
                    >
                      Projetos
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          <Grid item sm={3}>
              <Link to="/user">
                <Card variant="outlined">
                  <CardContent className="main-card-content">
                    <Person
                      className="main-card-icons" 
                      style={{ fontSize: 40 }}
                    />
                    <Typography
                      color="textPrimary"
                      className="main-card-title"
                    >
                      Propostas
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Context>

        )
      }
}

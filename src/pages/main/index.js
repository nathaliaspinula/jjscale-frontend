import React, { Component } from 'react';
import Context from '../../components/context'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Person from '@material-ui/icons/Person'

export default class Main extends Component{
  render(){
      return (
        <Context>
          <Grid container spacing={4} justify="center">
            <Grid item sm={3}>
              <Card>
               <Person style={{ fontSize: 40 }}/>
              </Card>
            </Grid>
            <Grid item sm={3}>
              <Card>
                hellou
              </Card>
            </Grid>
            <Grid item sm={3}>
              <Card>
                hellou
              </Card>
            </Grid>
          </Grid>
        </Context>

        )
      }
}

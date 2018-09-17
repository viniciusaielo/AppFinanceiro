import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
  Text,
  Icon
} from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import ConsultaReceita from './ConsultaReceita';
import Principal from './Principal';
import ConsultaDespesa from './ConsultaDespesa';
import Cartao from './Cartao';
import Conta from './Conta';
import Categorias from './Categorias'
import { Container, Header, Content } from 'native-base';


export default class App extends Component {
    render(){
        return(
            <MyApp />
        );
    }
}
const CustomDrawer = (props) => (
  <Container>
    <Header androidStatusBarColor = '#4682B4' style={{height: 50, backgroundColor: '#87CEEB'}}>
      
    </Header>
    < Content >
      < DrawerItems { ... props} />
    </Content >
  </Container>
)
const MyApp = DrawerNavigator({
    Home: {
      screen: Principal
    },
    Receitas: {
      screen: ConsultaReceita

    },
    Despesas: {
      screen: ConsultaDespesa

    },
    Cartões: {
      screen: Cartao

    },
    Contas: {
      screen: Conta

    },
    Categorias: {
      screen: Categorias
    }
  },
    {
      initialRouteName: 'Home',
      contentComponent: CustomDrawer,
      drawerOpenRoute :  ' DrawerOpen ' ,
      drawerCloseRoute :  ' DrawerClose ' ,
      drawerToggleRoute :  ' DrawerToggle '
  })
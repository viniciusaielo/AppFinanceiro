import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
  Text
} from 'react-native';
import {
 Actions
} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';
import {  Header, Left, Body} from 'native-base';
import { DrawerNavigator, DrawerActions} from 'react-navigation';




const logo = require('../imgs/logo2.png');
const receita = require('../imgs/receita.png');
const despesa = require('../imgs/despesa.png');
const cartao = require('../imgs/cartao.png');
const carteira = require('../imgs/carteira.png');
const grafico = require('../imgs/grafico.jpg')

export default class Principal extends Component {
  constructor(props){
    super(props);
    
  }
  render() {
    return (
    <View style={{ flex: 1}} >

        <Header   style={{height:100, backgroundColor: '#1E90FF'}}>
             <Left style={{marginTop: -30}}> 
              <Icon name="menu" 
                size={40} 
                color="white"
                onPress={ () => this.props.navigation.dispatch(DrawerActions.openDrawer())
                } />
          </Left>
            <Body >
              <Image style ={{width: 180, height: 90 , marginTop: 10, marginLeft: -30}} source={logo} />
            </Body>
        </Header>

      
        <View style = {styles.menu}>
          <View style = {styles.submenu}>
            <TouchableHighlight
               onPress={() => Actions.Receita() }
            >

              <Image style = {styles.img} source={receita} />
            </TouchableHighlight>
            <TouchableHighlight
               onPress={() => Actions.Despesa() }
            >
              <Image style = {styles.img} source={despesa} />
            </TouchableHighlight>
            
          </View>
          <View style = {styles.legenda}>
            <Text  style = {{ marginRight:60 , marginTop: -10 }}> Receitas </Text>
            <Text  style = {{ marginLeft:60 , marginTop: -10 }}> Despesas </Text>
          </View>

          <View style = {styles.submenu}>
            <TouchableHighlight
            
            >
              <Image style = {{width: 90, height: 90, marginTop: 10}} source={grafico} />
            </TouchableHighlight>
            
          </View>
          <View style = {styles.legenda}>
            <Text style = {{ marginTop: -10 }} > Graficos </Text>
          </View>

          <View style = {styles.submenu}>
            <TouchableHighlight
               onPress={() => Actions.Cartao() }
            >
              <Image style = {styles.img} source={cartao} />

            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => Actions.Conta() }
            >
              <Image style = {styles.img} source={carteira} />
            </TouchableHighlight>
        </View>
        <View style = {styles.legenda}>
          <Text style = {{ marginRight:65, marginTop: -20 }} > Cartões </Text>
          <Text  style = {{ marginLeft:55, marginTop: -20 }} > Contas </Text>
        </View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  logo:{
    alignItems: 'center'
  },
  menu: {
    alignItems: 'center',
    flex: 5,
    marginTop: 10
  },
  submenu: {
    flexDirection: 'row',
    margin: 15
  },
  legenda: {
    flexDirection: 'row'
  },
  img:{
    marginHorizontal:40,
    width: 110, height: 110
  }
})
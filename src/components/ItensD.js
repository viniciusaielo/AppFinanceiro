

import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

const despesa = require('../imgs/despesa.png');

export default class Itens extends Component {
  render() {
    return (
      <View style={styles.principal}>
        <View style={styles.foto}>
          <Image style = {{height: 50, width: 50}}source ={despesa}/>
        </View>
        <View style={styles.detalhes2}>
          <Text style={styles.titulo}>{this.props.data.cat}</Text>
          
          <Text style={styles.fontes}>{this.props.data.data}</Text>
        </View>
        <View style={styles.detalhes}>
          <Text style={styles.valor}>R$ {this.props.data.valor}</Text>
          <Icon name='edit' containerStyle={{width: 100, height: 30,backgroundColor: '#fff'}}  color="#000" 
                                      >
          </Icon>
        </View>
      </View>

    );
  }
}

const styles= StyleSheet.create({
  principal:{
    borderWidth: 0.5,
    borderColor:  '#999',
    margin: 10,
    padding: 10,
    flexDirection: 'row'
  },
  foto:{
    marginRight: 10
  },
  titulo: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10
  },
  detalhes: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  detalhes2: {
    flex: 2
  }, 
  valor:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  fontes:{
    fontSize: 14
  }

});
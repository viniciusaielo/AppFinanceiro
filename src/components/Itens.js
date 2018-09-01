

import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View
} from 'react-native';

export default class Itens extends Component {
  render() {
    return (
      <View style={styles.principal}>
        
        <View style={styles.detalhes}>
          <Text style={styles.titulo}>{this.props.item.cat}</Text>
          <Text style={styles.valor}>R$ {this.props.item.conta}</Text>
          
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
    flexDirection: 'row',
    backgroundColor: '#EEE'
  },
  foto:{
    height: 102,
    width: 102,
    marginRight: 10
  },
  titulo: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 10
  },
  detalhes: {
    flex: 1,
    marginLeft:20
  }, 
  valor:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  fontes:{
    fontSize: 14
  }

});
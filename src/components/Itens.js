

import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase'

const receita = require('../imgs/receita.png');

export default class Itens extends Component {
  delete(){
    id = this.props.data.uid
    firebase.database().ref(`/receita/data/${id}`).remove();
    
  }
  render() {
    return (
      <View style={styles.principal}>
        <View style={styles.foto}>
          <Image style = {{height: 50, width: 50}}source ={receita}/>
        </View>
        <View style={styles.detalhes2}>
          <Text style={styles.titulo}>{this.props.data.cat}</Text>
          
          <Text style={styles.fontes}>{this.props.data.data}</Text>
        </View>
        <View style={styles.detalhes}>
          <Text style={styles.valor}>R$ {this.props.data.valor}</Text>
         
        </View>
        <View style={styles.icone}>
        <Icon name='edit' containerStyle={{width: 100, height: 30,backgroundColor: '#fff'}}  color="#4169E1" 
                                      >
          </Icon>
        
          <Icon name='delete'
            containerStyle={{width: 100, height: 30,backgroundColor: '#fff'}}  
            color="#FF0000" onPress={() => {
              this.delete()
              }} >
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
    fontSize: 18,
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
    fontSize: 16,
    fontWeight: 'bold'
  },
  icone2:{
    marginLeft: -10,
    justifyContent: 'center'
  },
  fontes:{
    fontSize: 14
  },
  icone:{
    flex: 1,
    justifyContent: 'center',
    marginRight:20
  }

});
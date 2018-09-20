

import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View, Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase'

const despesa = require('../imgs/despesa.png');

export default class ItensD extends Component {
  delete(){
    Alert.alert(
      'Deletar Despesa',
      'Deseja deletar o registro de despesa?',
      [
        {text: 'Sim', onPress: () => this.delete2()},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Não', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }
  delete2(){
    const date = new Date(this.props.data.data)
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const mes =  months[date.getMonth()];
    const ano = date.getFullYear();
    
    id = this.props.data.uid
    firebase.database().ref(`/despesa/data/${ano}/${mes}/${id}`).remove();
    
  }
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
  fontes:{
    fontSize: 14
  },
  icone:{
    flex: 1,
    justifyContent: 'center',
    marginRight:20
  }

});
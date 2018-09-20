

import React, { Component } from 'react';
import {
  Text,
  TextInput ,
  StyleSheet,
  View, Alert
} from 'react-native';
import firebase from 'firebase'
import { Icon } from 'react-native-elements';
import PopupDialog, {DialogButton} from 'react-native-popup-dialog';
import ContaAdd from './ContaAdd'


export default class ListaCategoria extends Component {
  constructor(props){
    super(props)
    
  }
  componentWillMount(){
    this.editar = false;
    this.texto()
  }
  delete(){
    Alert.alert(
      'Deletar Categoria',
      'Deseja deletar a categoria?',
      [
        {text: 'Sim', onPress: () => this.delete2()},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Não', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }
  delete2(){
    id = this.props.data.uid
    firebase.database().ref(`/categoria/${id}`).remove();
    
  }
  texto(){
    if( this.editar){
      return(
        <TextInput style={styles.titulo}>{this.props.data.categoria}</TextInput>
      )
    } 
    else {return(<Text style={styles.titulo}>{this.props.data.categoria}</Text>)}
  }
  componentWillReceiveProps(nextProps) {
    
    this.editar = true;
    
 }
  Editar(){
    this.componentWillReceiveProps()
    
}
  render() {
    return (
      <View style={styles.principal}>
        <View style={styles.detalhes}>
          
        <Text style={styles.titulo}>{this.props.data.categoria}</Text>
         
        </View>
        <View style={styles.icone}>
          <Icon name='edit' 
            containerStyle={{width: 100, height: 30,backgroundColor: '#fff'}}  
            color="#4169E1" onPress={() => {
              this.Editar()
              }} >
          </Icon>
        </View>
        <View style={styles.icone2}>
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
  titulo: {
    fontSize: 20,
    color: '#000',
    justifyContent: 'center'
  },
  detalhes: {
    flex: 2,
    justifyContent: 'center'
  }, 
 
  fontes:{
    fontSize: 14
  },
  icone:{
    marginRight: -10,
    justifyContent: 'center'
  },
  icone2:{
    marginLeft: -10,
    justifyContent: 'center'
  }

});
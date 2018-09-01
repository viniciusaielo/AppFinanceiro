import React, {Component} from 'react';
import { View, TextInput, Image, Text, ScrollView, Picker } from 'react-native';
import { connect } from 'react-redux';
import {Button, ListItem, Icon} from 'react-native-elements';
import { modificaValor, modificaData, modificaDesc, modificaCat, modificaConta, checked } from '../actions/eventoActions';
import DatePicker from 'react-native-datepicker';
import {Container, Header, Content, Left, Body} from 'native-base';
import { DrawerActions} from 'react-navigation';
import Hamburger from 'react-native-hamburger';
import {
    Actions
   } from 'react-native-router-flux';

import firebase from 'firebase';
import Itens from './Itens';

class ConsultaDespesa  extends Component {
 constructor(props){
  	super(props);

  	this.state  = { listaItens: []};

  }
  componentWillMount(){
      firebase.database().ref('/receita/data').once('value').then( function(snapshot) {
       
        var returnArr = [];

        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            this.setState( listaItens.push(item));
        });
        console.log(this.state.listaItens)
    });
  
  }

snapshotToArray(snapshot){
       var array =[];
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            this.state.listaItens.push(item);
            array.push(item);
            console.log(item)
     
        });
         console.log(array)
        
    }
    
    render(){
        return(
            <Container>
                <Header style={{height: 50, backgroundColor: '#ff0000'}}>
                    <Left >
                        <Hamburger 
                            type="cross"
                            color="white"
                            onPress={ () => this.props.navigation.dispatch(DrawerActions.openDrawer())
                            } />
                    </Left>
                    <Body>
                        <Text style={{fontSize: 22, color: '#fff', marginLeft: 25}}> Despesas </Text>
                    </Body>
                </Header>
                <View style={{flex:1, padding: 10 }}>

                    <View style={{ flex: 2,  justifyContent: 'center' }}>
                        <View style={{ marginTop: 10,alignItems: 'center', flexDirection: 'row' }}>
                            <Text> De </Text>
                            <DatePicker
                                style={{width: 150}}
                                date={this.props.data}
                                mode="date"
                                placeholder = 'selecione a data'
                                format='DD-MM-YYYY'
                                minDate='01-01-1970'
                                maxDate='30-12-2100'
                                confirmBtnText = 'Confirmar'
                                cancelBtnText = 'Cancelar'
                                customStyles={{ dateIcon : {position: 'absolute', left: 0, top: 4, marginLeft: 0 }, dateInput: {marginLeft: 36}}}
                                onDateChange = {(date) => this.props.modificaData(date)}
                            />
                       
                            <Text> Até </Text>
                            <DatePicker
                                style={{width: 150}}
                                date={this.props.data}
                                mode="date"
                                placeholder = 'selecione a data'
                                format='DD-MM-YYYY'
                                minDate='01-01-1970'
                                maxDate='30-12-2100'
                                confirmBtnText = 'Confirmar'
                                cancelBtnText = 'Cancelar'
                                onDateChange = {(date) => this.props.modificaData(date)}
                            />
                        </View>
                         <View style={{ margin: 10,justifyContent: 'center' }}>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Icon name='search' containerStyle={{width: 100, height: 50,backgroundColor: '#fff', borderWidth: 2,
                                     borderRadius:50, borderColor: "black"}}  color="#000" 
                                      >
                                   
                                </Icon>
                            </View>
                        </View> 
                        <ScrollView style={{flex:1, marginBottom: 10 }}>
                            {this.state.listaItens.map( item => ( <Itens key= {item.cat} item ={item} />))}
                        </ScrollView>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Icon name='add' color='#fff' size={50} underlayColor='#000' raised 
                                containerStyle={{width: 60,height:60, backgroundColor: '#ff0000', borderWidth: 2,
                                borderRadius:80, borderColor: "transparent"} }  onPress={() => Actions.Despesa() }
                                />
                            </View>
                        </View>
                    </View>
                   
            </Container>
        );
    }
}

const mapStateToProps = state => (
    {
        valor: state.EventoReducer.valor,
        data: state.EventoReducer.data,
        desc: state.EventoReducer.desc,
        cat: state.EventoReducer.cat,
        conta: state.EventoReducer.conta,
        verificado: state.EventoReducer.verificado
    }
)

export default connect(mapStateToProps, { modificaValor, modificaData, modificaDesc, modificaCat, modificaConta, checked})(ConsultaDespesa);

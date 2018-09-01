import React, {Component} from 'react';
import { View, TextInput, Image, Text, ScrollView, Picker, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import {Button, ListItem, Icon } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { consultaReceita } from '../actions/eventoActions';
import DatePicker from 'react-native-datepicker';
import {Container, Header, Body, Left} from 'native-base';
import {DrawerActions} from 'react-navigation';
import Hamburger from 'react-native-hamburger';
import Itens from './Itens';
import {
    Actions
   } from 'react-native-router-flux';
import firebase from 'firebase';



class ConsultaReceita  extends Component {
   
    constructor(props){
  	super(props);

  }
    componentWillMount(){
   
    this.props.consultaReceita()
    console.log(this.props.lista)
  }

  renderScroll(){
      if(this.props.carregado){
          return (
                     <ScrollView style={{flex:1, marginBottom: 10 }}>
                                {this.props.lista.map( item => ( <Itens key= {item.cat} item ={item} />))}
                        </ScrollView>
                        );
      }
        return (
                <ActivityIndicator size="large" />
            );
  }

    render(){
        return(
            <Container>
                <Header style={{height: 50, backgroundColor: '#20b2aa'}}>
                    <Left >
                        <Hamburger 
                            type="cross"
                            color="white"
                            onPress={ () => this.props.navigation.dispatch(DrawerActions.openDrawer())
                            } />
                    </Left>
                    <Body>
                        <Text style={{fontSize: 22, color: '#fff', marginLeft: 25}}> Receitas </Text>
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
                        <View style={{flex:1, marginBottom: 10 }}>
                            {this.renderScroll()} 
                        </View>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Icon name='add' color='#fff' size={50} underlayColor='#000' raised 
                                containerStyle={{width: 60,height:60, backgroundColor: '#20b2aa', borderWidth: 2,
                                borderRadius:80, borderColor: "transparent"} } onPress={() => Actions.Receita() }
                                >
                                
                                </Icon>
                            </View>
                        </View>
                    </View>
                   
            </Container>
        );
    }
}
const mapStateToProps = state => (
    {
      lista: state.EventoReducer.listaItens,
      carregado: state.EventoReducer.carregar
    }
)


export default connect(mapStateToProps,{consultaReceita})(ConsultaReceita);

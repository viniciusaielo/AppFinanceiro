import React, {Component} from 'react';
import { View, TextInput,  Text, ScrollView, Picker } from 'react-native';
import {Button, ListItem, Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { modificaTitulo, modificaSaldo, enviaConta } from '../actions/contasActions';
import { Container, Header, Content, Left} from 'native-base';
import PopupDialog, {DialogButton} from 'react-native-popup-dialog';
import CartaoAdd from './CartaoAdd';
import {
    Actions
   } from 'react-native-router-flux';


class Conta  extends Component {
  
    
    render(){
        return(
            <Container>
                <Header androidStatusBarColor='#8B008B' style={{height: 50, backgroundColor: '#9400D3'}}>
                    <Left>
                        
                    </Left>
                </Header>
               
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 4,  justifyContent: 'center' }}>
                        <ScrollView style={{flex:3, marginBottom: 10, height:100 }}>
                        <ListItem  title='Hello World!' > </ListItem>
                                    <ListItem  title='Hello World!' > </ListItem> 
                                    <ListItem  title='Hello World!' > </ListItem> 
                                    <ListItem  title='Hello World!' > </ListItem>
                                    <ListItem  title='Hello World!' > </ListItem> 
                                    <ListItem  title='Hello World!' > </ListItem>
                                    <ListItem  title='Hello World!' > </ListItem>
                                    <ListItem  title='Hello World!' > </ListItem> 
                                    <ListItem  title='Hello World!' > </ListItem>
                                    <ListItem  title='Hello World!' > </ListItem>
                                    <ListItem  title='Hello World!' > </ListItem> 
                                    <ListItem  title='Hello World!' > </ListItem>
                                    <ListItem  title='Hello World!' > </ListItem> 
                                    <ListItem  title='Hello World!' > </ListItem>
                                    <ListItem  title='Hello World!' > </ListItem>
                                    <ListItem  title='Hello World!' > </ListItem> 
                                    <ListItem  title='Hello World!' > </ListItem>
                            </ScrollView>
                        </View>                        
                        <View >                         
                            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                                
                                <Icon name='add' color='#fff' size={50} underlayColor='#000' raised 
                                containerStyle={{width: 60,height:60, backgroundColor: '#9400D3', borderWidth: 2,
                                borderRadius:80, borderColor: "transparent"} } 
                                 onPress={() => Actions.CartaoAdd()}>
                                
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
        titulo: state.ContaReducer.titulo,
        saldo: state.ContaReducer.saldo  
    }
)

export default connect(mapStateToProps, { modificaTitulo, modificaSaldo, enviaConta})(Conta);

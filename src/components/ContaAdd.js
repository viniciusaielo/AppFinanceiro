import React, {Component} from 'react';
import { View, TextInput,  Image, Text, ActivityIndicator, Picker } from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import { connect } from 'react-redux';
import { modificaTitulo, modificaSaldo, enviaConta } from '../actions/contasActions';
import { Container, Header, Content, Left, Label} from 'native-base';


class ContaAdd  extends Component {
  
  enviar(){
    const titulo = this.props.titulo;
    const saldo = this.props.saldo;
    

    this.props.enviaConta({titulo,saldo});
    this.props.modificaTitulo('');
    this.props.modificaSaldo('');
    
}
    
    render(){
        return(
            <Container>
                <Header style={{height: 50, backgroundColor: '#9400D3'}}>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={{fontSize: 20, color: '#fff'}}> Adicionar Conta </Text>
                    </View>
                </Header>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 4,  justifyContent: 'center' }}>
                        <View style={{ margin: 10, justifyContent: 'center' }}>
                            <TextInput 
                                value={this.props.titulo} placeholder="Titulo" 
                                placeholderTextColor='#808080' style={{ fontSize: 20, height: 45 }} 
                                onChangeText={text => this.props.modificaTitulo(text)}
                             />
                        </View>
                         <View style={{ margin: 10, justifyContent: 'center' }}>
                            <TextInput 
                                value={this.props.saldo} 
                                placeholder="Saldo Inicial" style={{ fontSize: 20, height: 45 }} 
                                keyboardType = 'numeric'
                                placeholderTextColor='#808080'
                                multiline = {true}
                                onChangeText={text => this.props.modificaSaldo(text)} 
                            />
                        </View>                                                        
                            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                             <Button buttonStyle={{width: 100,backgroundColor: '#ff0000', borderWidth: 5,
                                     borderRadius:20, borderColor: "transparent"}} title="Salvar" color="#fff" 
                                     titleStyle={{ fontWeight: "700", fontSize: 20}}  onPress={() => this.enviar()}/>
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

export default connect(mapStateToProps, { modificaTitulo, modificaSaldo, enviaConta})(ContaAdd);

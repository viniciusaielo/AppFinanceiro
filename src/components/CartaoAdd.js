import React, {Component} from 'react';
import { View, TextInput, Image, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import {Button} from 'react-native-elements';

import { modificaDispo, modificaFec, modificaDesc,
     modificaLimite, modificaVenc, modificaBandeira, modificaConta, enviaCartao } 
     from '../actions/contasActions';
import { Container, Header} from 'native-base';
import ContasItens from './ContasItens'


class CartaoAdd  extends Component {
   constructor(props) {
    super(props);
    this.state = {checked: false};

  }
  
  verificar(){
    this.setState({ checked: !this.state.checked })
    if(this.state.checked == true ){
        this.props.checked('Não')
    }else{this.props.checked('Sim')}
  }
  enviar(){
      const limite = this.props.limite;
      const dispo = this.props.dispo;
      const desc = this.props.desc;
      const venc = this.props.venc;
      const fec = this.props.fec;
      const bandeira = this.props.bandeira;
      const conta = this.props.conta_cartao;
      

      this.props.enviaCartao({limite,dispo,desc,venc,fec,bandeira,conta});
      this.props.modificaDispo('');
      this.props.modificaDesc('');
      this.props.modificaLimite('');
      this.props.modificaVenc('');
      this.props.modificaFec('');
      this.props.modificaBandeira('');
      this.props.modificaConta('');
      
  }
 
    render(){
        return(
            <Container>
               
                 <Header androidStatusBarColor='#CD5C5C' style={{height: 50, backgroundColor: '#F08080'}} >
                   
                </Header>
                <View style={{ flex: 1, marginTop: 20}}>
                    <View style={{ flex: 4}}>
                        <View style={{ margin: 10, justifyContent: 'center' }}>
                            <TextInput 
                                value={this.props.limite} placeholder="Limite Total" 
                                keyboardType = 'numeric'
                                placeholderTextColor='#808080' style={{ fontSize: 20, height: 45 }} 
                                onChangeText={text => this.props.modificaLimite(text)}
                             />
                        </View>
                        <View style={{ margin: 10, justifyContent: 'center' }}>
                            <TextInput 
                                value={this.props.dispo} placeholder="Limite Disponivel" 
                                keyboardType = 'numeric'
                                placeholderTextColor='#808080' style={{ fontSize: 20, height: 45 }} 
                                onChangeText={text => this.props.modificaDispo(text)}
                             />
                        </View>
                         <View style={{ margin: 10, justifyContent: 'center' }}>
                            <TextInput 
                                value={this.props.desc} 
                                placeholder="Descrição" style={{ fontSize: 20, height: 45 }} 
                                placeholderTextColor='#808080'
                                multiline = {true}
                                onChangeText={text => this.props.modificaDesc(text)} 
                            />
                        </View>
                        <View style={{ justifyContent:'space-around', flexDirection:'row',alignItems:'center' }}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize:18}}> Fechamento: </Text>
                                <TextInput 
                                    value={this.props.fec} 
                                    keyboardType = 'numeric'
                                    placeholder=" Dia" style={{ fontSize: 18, height: 45, width:50 }} 
                                    placeholderTextColor='#808080'
                                    multiline = {true}
                                    onChangeText={text => this.props.modificaFec(text)} 
                                />  
                            </View>
                            <View  style={{flexDirection:'row', alignItems:'center', marginLeft: -10}}>
                                <Text style={{fontSize:18}}>Vencimento: </Text>                
                                <TextInput 
                                    value={this.props.venc} 
                                    keyboardType = 'numeric'
                                    placeholder=" Dia" style={{ fontSize: 18, height: 45, width: 50 }} 
                                    placeholderTextColor='#808080'
                                    multiline = {true}
                                    onChangeText={text => this.props.modificaVenc(text)} 
                                />
                            </View>
                        </View>
                        
                        <View style={{ margin: 10,justifyContent: 'center' }}>
                            <Picker
                                style={{ transform: [ {scaleX: 1}, {scaleY: 1.5}]}}
                                selectedValue={this.props.bandeira}
                                onValueChange={text => { this.props.modificaBandeira(text) }} 
                                >
                                    <Picker.Item label='Bandeira do Cartão' value='' />
                                    <Picker.Item label='Master' value='Master' />
                                    <Picker.Item label='Visa' value='Visa' />
                                    <Picker.Item label='Elo' value='Elo' />
                                   
                                   
                            </Picker>
                        </View>
                         <View style={{ margin: 10, justifyContent: 'center' }}>
                            <ContasItens/>
                        </View>
                                              
                        <View style={{ flexDirection: 'row', justifyContent:'space-around'}} >
                           
                               
                            <View style={{ alignItems: 'flex-end'}}>
                             <Button buttonStyle={{width: 100,backgroundColor: '#F08080', borderWidth: 5,
                                     borderRadius:20, borderColor: "transparent"}} title="Salvar" color="#fff" 
                                     titleStyle={{ fontWeight: "700", fontSize: 20}}  onPress={() => this.enviar()} />
                            </View>
                        </View>                        
                    </View>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = state => (
    {
        limite: state.ContaReducer.limite,
        dispo: state.ContaReducer.dispo,
        venc:state.ContaReducer.venc,
        desc:state.ContaReducer.desc,
        fec:state.ContaReducer.fec,
        bandeira:state.ContaReducer.bandeira,
        conta_cartao: state.ContaReducer.conta_cartao
    }
)

export default connect(mapStateToProps, { modificaDispo, modificaFec, modificaDesc,
    modificaLimite, modificaVenc, enviaCartao, modificaBandeira, modificaConta})(CartaoAdd);

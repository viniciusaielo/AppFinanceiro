import React, {Component} from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import {Button, CheckBox} from 'react-native-elements';

import { modificaValor, modificaData, modificaDesc, modificaCat, modificaConta, checked, enviaReceita } from '../actions/eventoActions';
import DatePicker from 'react-native-datepicker';
import { Container, Header, Content, Left} from 'native-base';
import ContasItensR from './ContasItensR';
import CategoriaItens from './CategoriaItens';


class Receita  extends Component {
   constructor(props) {
    super(props);
    this.state = {checked: false};
  }
  componentWillMount(){
    const date = new Date()
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();
    let data = mes + "/" + dia + "/"+ ano;
    this.props.modificaData(data)
  }
  verificar(){
    this.setState({ checked: !this.state.checked })
    if(this.state.checked == true ){
        this.props.checked('Não')
    }else{this.props.checked('Sim')}
  }
  enviar(){
      const valor = this.props.valor;
      const data = this.props.data;
      const desc = this.props.desc;
      const cat = this.props.cat;
      const conta = this.props.conta;
      
      this.props.enviaReceita({valor,data,desc,cat,conta});
      this.props.modificaValor('');
      this.props.modificaDesc('');
      this.props.modificaCat('Salario');
      this.props.modificaConta('');
      
  }
 
    render(){
        return(
            <Container>
               
                 <Header androidStatusBarColor='#00CED1' style={{ backgroundColor: '#fff'}}  >
                   
                </Header>
                <View style={{ flex: 1,  padding: 10, alignItems: 'center', marginTop:10}}>

                    <View style={{ flex: 4,  justifyContent: 'center', position: 'absolute' }}>
                        <View style={{ margin: 15, justifyContent: 'center' }}>
                            <TextInput 
                                value={this.props.valor} placeholder="Insira o valor" 
                                keyboardType = 'numeric'
                                placeholderTextColor='#808080' style={{ fontSize: 20, height: 45 }} 
                                onChangeText={text => this.props.modificaValor(text)}
                             />
                        </View>
                         <View style={{ margin: 15, justifyContent: 'center' }}>
                            <TextInput 
                                value={this.props.desc} 
                                placeholder="Descrição" style={{ fontSize: 20, height: 45 }} 
                                placeholderTextColor='#808080'
                                multiline = {true}
                                onChangeText={text => this.props.modificaDesc(text)} 
                            />
                        </View>
                         <View style={{ margin: 15,justifyContent: 'center' }}>
                           <CategoriaItens/>
                        </View>
                         <View style={{ margin: 15, justifyContent: 'center' }}>
                            <ContasItensR/>
                        </View>
                         <View style={{ margin: 15, justifyContent: 'center' }}>
                            <DatePicker
                                style={{width: 320}}
                                date={this.props.data}
                                mode="date"
                                placeholder = 'selecione a data'
                                format='MM/DD/YYYY'
                                minDate='01/01/1970'
                                maxDate='12/31/2100'
                                confirmBtnText = 'Confirmar'
                                cancelBtnText = 'Cancelar'
                                customStyles={{ dateIcon : {position: 'absolute', left: 0, top: 4, marginLeft: 0 }, dateInput: {marginLeft: 36}}}
                                onDateChange = {(date) => this.props.modificaData(date)}
                            />
                        </View>
                        <View style={{ flexDirection: 'row'}} >
                            <View style={{ margin: 15, justifyContent: 'center' }}>
                                <CheckBox title='Receita Fixa' checkedIcon='dot-circle-o' uncheckedIcon='circle-o'
                                    checked={this.state.checked}  checkedColor='#20b2aa' 
                                    onPress={() => this.verificar()}
                                    />
                            </View>
                               
                            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                             <Button buttonStyle={{width: 100,backgroundColor: '#20b2aa', borderWidth: 5,
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
        valor: state.EventoReducer.valor,
        data: state.EventoReducer.data,
        desc: state.EventoReducer.desc,
        cat: state.EventoReducer.cat,
        conta: state.EventoReducer.conta,
        verificado: state.EventoReducer.verificado
    }
)

export default connect(mapStateToProps, { modificaValor, modificaData, modificaDesc, modificaCat, modificaConta, checked, enviaReceita})(Receita);

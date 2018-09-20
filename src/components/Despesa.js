import React, {Component} from 'react';
import { View, TextInput,  Image, Text, ActivityIndicator, Picker } from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { modificaValorD, modificaDataD, modificaDescD, modificaCatD, modificaContaD, checkedD, enviaDespesa } from '../actions/eventoActions';
import { atualizaConta } from '../actions/contasActions';
import DatePicker from 'react-native-datepicker';
import { Container, Header, Content, Left} from 'native-base';
import ContasItensD from './ContasItensD';
import CategoriaItensD from './CategoriaItensD';


class Despesa  extends Component {
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
    this.props.modificaDataD(data)
  }
    verificar(){
    this.setState({ checked: !this.state.checked })
    if(this.state.checked == true ){
        this.props.checkedD('Não')
    }else{this.props.checkedD('Sim')}
  }
  enviar(){
    const valor = this.props.valorD;
    const data = this.props.dataD;
    const desc = this.props.descD;
    const cat = this.props.catD;
    const conta = this.props.contaD;

    
   
    this.props.enviaDespesa({valor,data,desc,cat,conta});
    
    this.props.modificaValorD('');
    this.props.modificaDescD(''); 
    this.props.modificaCatD('');
    this.props.modificaContaD('');
    
}
    
    render(){
        return(
            <Container>
                <Header  androidStatusBarColor='#DC143C' style={{ backgroundColor: '#fff'}} >
                
                </Header>
                <View style={{ flex: 1, padding: 10, alignItems: 'center', marginTop:10 }}>
                    <View style={{ flex: 4,  justifyContent: 'center', position: 'absolute' }}>
                        <View style={{ margin: 15, justifyContent: 'center' }}>
                            <TextInput 
                                value={this.props.valorD} placeholder="Insira o valor" 
                                keyboardType = 'numeric'
                                placeholderTextColor='#808080' style={{ fontSize: 20, height: 45 }} 
                                onChangeText={text => this.props.modificaValorD(text)}
                             />
                        </View>
                         <View style={{ margin: 15, justifyContent: 'center' }}>
                            <TextInput 
                                value={this.props.descD} 
                                placeholder="Descrição" style={{ fontSize: 20, height: 45 }} 
                                placeholderTextColor='#808080'
                                multiline = {true}
                                onChangeText={text => this.props.modificaDescD(text)} 
                            />
                        </View>
                         <View style={{ margin: 15,justifyContent: 'center' }}>
                            <CategoriaItensD/>
                        </View>
                         <View style={{ margin: 15, justifyContent: 'center' }}>
                            <ContasItensD/>
                        </View>
                         <View style={{ margin: 15, justifyContent: 'center' }}>
                            <DatePicker
                                style={{width: 320}}
                                date={this.props.dataD}
                                mode="date"
                                placeholder = 'selecione a data'
                                format='MM/DD/YYYY'
                                minDate='01/01/1970'
                                maxDate='12/30/2100'
                                confirmBtnText = 'Confirmar'
                                cancelBtnText = 'Cancelar'
                                customStyles={{ dateIcon : {position: 'absolute', left: 0, top: 4, marginLeft: 0 }, dateInput: {marginLeft: 36}}}
                                onDateChange = {(date) => this.props.modificaDataD(date)}
                            />
                        </View>
                        <View style={{ flexDirection: 'row'}} >
                            <View style={{ margin: 15, justifyContent: 'center' }}>
                                <CheckBox title='Despesa Fixa' checkedIcon='dot-circle-o' uncheckedIcon='circle-o'
                                    checked={this.state.checked}  checkedColor='#ff0000' 
                                    onPress={() => this.verificar()}
                                    />
                            </View>
                               
                            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                             <Button buttonStyle={{width: 100,backgroundColor: '#ff0000', borderWidth: 5,
                                     borderRadius:20, borderColor: "transparent"}} title="Salvar" color="#fff" 
                                     titleStyle={{ fontWeight: "700", fontSize: 20}}  onPress={() => this.enviar()}/>
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
        valorD: state.EventoReducer.valorD,
        dataD: state.EventoReducer.dataD,
        descD: state.EventoReducer.descD,
        catD: state.EventoReducer.catD,
        contaD: state.EventoReducer.contaD,
        verificadoD: state.EventoReducer.verificadoD
    }
)

export default connect(mapStateToProps, { modificaValorD, modificaDataD, modificaDescD,
         modificaCatD, modificaContaD, checkedD, enviaDespesa,atualizaConta})(Despesa);

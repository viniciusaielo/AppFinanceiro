

import React, { Component } from 'react';
import {
  Picker, ListView
} from 'react-native';
import {consultaConta} from '../actions/contasActions';
import _ from 'lodash';
import { connect } from 'react-redux';
import { modificaConta } from '../actions/eventoActions';


class ContasItens extends Component {
  constructor(props) {
    super(props);
    this.state = {contaR: ''};
  }
  componentWillMount(){
    this.props.consultaConta()
    this.criaFonteDeDados( this.props.contas )
    this.itens = []
 }
componentWillReceiveProps(nextProps) {
    this.criaFonteDeDados( nextProps.contas )
    
 }
 modificaConta(text){
  this.setState({contaR: text})
  this.props.modificaConta(text)
}

criaFonteDeDados( contas ) {
    var itens = []
    for( var i = 0; i < contas.length; i++){
      itens.push(contas[i].titulo);
    }
    this.itens = itens
 
}
  render() {
    return (
        <Picker
          style={{ transform: [ {scaleX: 1}, {scaleY: 1.5}]}}
          selectedValue={this.state.contaR}
          onValueChange={text => { this.modificaConta(text) }} 
         >
            <Picker.Item label='Selecionar Conta' value='' />
            { this.itens.map(item => (<Picker.Item label={item} value={item} />))}
        </Picker>

    );
  }
}
const mapStateToProps = state => {
  const contas = _.map(state.ListaContaReducer, (val, uid) => {
      return { ...val, uid }
  })
  return { contas }
}




export default connect(mapStateToProps,{consultaConta,modificaConta})(ContasItens);




import React, { Component } from 'react';
import {
  Picker, ListView
} from 'react-native';
import {consultaConta,trocaid } from '../actions/contasActions';
import _ from 'lodash';
import { connect } from 'react-redux';
import { modificaContaD } from '../actions/eventoActions';


class ContasItens extends Component {
  constructor(props) {
    super(props);
    this.state = {contaD: ''};
  }
  componentWillMount(){
    this.props.consultaConta()
    this.criaFonteDeDados( this.props.contas )
    this.itens = []
 }
componentWillReceiveProps(nextProps) {
    this.criaFonteDeDados( nextProps.contas )

 }
modificaContaD(text){
  this.setState({contaD: text})
  this.props.modificaContaD(text)
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
          selectedValue={this.state.contaD}
          onValueChange={text => { this.modificaContaD(text) }} 
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




export default connect(mapStateToProps,{consultaConta,modificaContaD,trocaid })(ContasItens);


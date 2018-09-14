

import React, { Component } from 'react';
import {
  Picker
} from 'react-native';
import {consultaConta } from '../actions/contasActions';
import _ from 'lodash'


class ContasItens extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    this.props.consultaConta()
    this.criaFonteDeDados( this.props.contas )
    this.itens = []
 }
componentWillReceiveProps(nextProps) {
    this.criaFonteDeDados( nextProps.contas )
    
 }

criaFonteDeDados( contas ) {
    this.itens = ds.cloneWithRows(contas)
    console.log(this.fonteDeDados)  
}
  render() {
    return (
        <Picker
          style={{ transform: [ {scaleX: 1}, {scaleY: 1.5}]}}
          selectedValue={this.props.bandeira}
          onValueChange={text => { this.props.modificaBandeira(text) }} 
         >
            <Picker.Item label='Bandeira do Cartão' value='' />
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




export default connect(mapStateToProps,{consultaConta})(ContaItens);


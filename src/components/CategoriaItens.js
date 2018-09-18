

import React, { Component } from 'react';
import {
  Picker, ListView
} from 'react-native';
import { consultaCategoria } from '../actions/contasActions';
import {modificaCat} from '../actions/eventoActions';
import _ from 'lodash';
import { connect } from 'react-redux';


class CategoriaItens extends Component {
  constructor(props) {
    super(props);
    this.state = {categoria: ''};
  }
  componentWillMount(){
    this.props.consultaCategoria()
    this.criaFonteDeDados( this.props.categoria )
    this.itens = []
 }
componentWillReceiveProps(nextProps) {
    this.criaFonteDeDados( nextProps.categoria )
    
 }
 modificaCategoria(text){
  this.setState({categoria: text})
  this.props.modificaCat(text)
}

criaFonteDeDados( categoria ) {
    var itens = []
    for( var i = 0; i < categoria.length; i++){
      itens.push(categoria[i].categoria);
    }
    this.itens = itens
 
}
  render() {
    return (
        <Picker
          style={{ transform: [ {scaleX: 1}, {scaleY: 1.5}]}}
          selectedValue={this.state.categoria}
          onValueChange={text => { this.modificaCategoria(text) }} 
         >
            <Picker.Item label='Selecionar Categoria' value='' />
            { this.itens.map(item => (<Picker.Item label={item} value={item} />))}
        </Picker>

    );
  }
}
const mapStateToProps = state => {
  const categoria = _.map(state.ListaCategoriaReducer, (val, uid) => {
      return { ...val, uid }
  })
  return { categoria }
}




export default connect(mapStateToProps,{consultaCategoria, modificaCat})(CategoriaItens);


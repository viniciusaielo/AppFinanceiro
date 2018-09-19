import React, {Component} from 'react';
import { View, Text,  ListView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import {Container, Header, Body, Left} from 'native-base';
import {DrawerActions} from 'react-navigation';

import _ from 'lodash'
import {
    Actions
   } from 'react-native-router-flux';
import { consultaReceita, consultaData} from '../actions/eventoActions';
import Itens from './Itens';

class ConsultaReceita  extends Component {
   
    componentWillMount(){
        const date = new Date()
        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const ano = date.getFullYear();
        let data = mes + "/" + dia + "/"+ ano;
      
        this.props.consultaReceita(data);
        this.criaFonteDeDados( this.props.receitas );
        this.loading = true;
        this.data1 = '09/21/2016';
        this.data2 = '09/29/2016';
        this.contador = 0;
        this.consultado = [];

     }
    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados( nextProps.receitas )
        this.loading = false;
        this.tamanho = nextProps.receitas.length ;
        
     }

    criaFonteDeDados( receitas ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        
        receitas.sort((a,b) => {
            if (new Date(a.data) < new Date(b.data)){
                return 1;
            }
            if (new Date(a.data) > new Date(b.data)){
                return -1;
            }
            return 0;
        })
        this.fonteDeDados = ds.cloneWithRows(receitas)
        
     
    }

    renderList(){
        if(this.loading) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        if(this.tamanho == 0) {
            return(
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }} >
                     <Text> NENHUM REGISTRO ENCONTRADO </Text>
                </View>
            )
        }
        return (
            <ListView
                enableEmptySections
                dataSource={this.fonteDeDados}
                renderRow={data => (
                        <Itens key ={data.uid} data ={data} />
                    )
                }
          />
        )
    }
    modificaData(date){
        this.data1 = date
    }
    modificaData2(date){
        this.data2 = date
    }
    filtro(){

       
            this.consultado = this.props.receitas
            this.props.consultaData( this.consultado, this.data1, this.data2)
           
        this.props.consultaData(this.consultado, this.data1, this.data2)
  
    }
    
    render(){
        return(
            <Container>
                <Header androidStatusBarColor='#00CED1' style={{height: 50, backgroundColor: '#20b2aa'}}>
                    <Left >
                        <Icon name="menu" 
                            size={40} 
                            color="white"
                            onPress={ () => this.props.navigation.dispatch(DrawerActions.openDrawer())} 
                        />
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
                                date={this.data1}
                                mode="date"
                                placeholder = 'selecione a data'
                                format='MM/DD/YYYY'
                                minDate='01/01/1970'
                                maxDate='12/30/2100'
                                confirmBtnText = 'Confirmar'
                                cancelBtnText = 'Cancelar'
                                customStyles={{ dateIcon : {position: 'absolute', left: 0, top: 4, marginLeft: 0 }, dateInput: {marginLeft: 36}}}
                                onDateChange = {(date) => this.modificaData(date)}
                            />
                       
                            <Text> Até </Text>
                            <DatePicker
                                style={{width: 150}}
                                date={this.data2}
                                mode="date"
                                placeholder = 'selecione a data'
                                format='MM/DD/YYYY'
                                minDate='01/01/1970'
                                maxDate='12/30/2100'
                                confirmBtnText = 'Confirmar'
                                cancelBtnText = 'Cancelar'
                                onDateChange = {(date) => this.modificaData2(date)}
                            />
                        </View>
                         <View style={{ margin: 10,justifyContent: 'center' }}>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Icon name='search' containerStyle={{width: 100, height: 50,backgroundColor: '#fff', borderWidth: 2,
                                     borderRadius:50, borderColor: "black"}}  color="#000"  onPress={() => 
                                        this.filtro() }
                                      >
                                   
                                </Icon>
                            </View>
                        </View>
                        <View style={{flex:1, marginBottom: 10 }}>
                            {this.renderList()}
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
const mapStateToProps = state => {
    const receitas = _.map(state.ListaReceitasReducer, (val, uid) => {
        return { ...val, uid }
    })
    return { receitas }
    
}


export default connect(mapStateToProps,{consultaReceita, consultaData})(ConsultaReceita);

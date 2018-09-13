import React, {Component} from 'react';
import { View, ListView, Text, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { Icon} from 'react-native-elements';
import { modificaValor, modificaData, modificaDesc, modificaCat, modificaConta, checked, consultaDespesa, consultaDataD } from '../actions/eventoActions';
import DatePicker from 'react-native-datepicker';
import {Container, Header, Left, Body} from 'native-base';
import { DrawerActions} from 'react-navigation';
import Hamburger from 'react-native-hamburger';
import {
    Actions
   } from 'react-native-router-flux';

import ItensD from './ItensD';

class ConsultaDespesa  extends Component {
    componentWillMount(){
        this.props.consultaDespesa()
        this.criaFonteDeDados( this.props.despesas )
        this.loading = true;
        this.data1 = '09-21-2018';
        this.data2 = '09-29-2018';
        this.contador = 0;
        this.consultado = [];

     }
    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados( nextProps.despesas )
        this.loading = false;
        this.tamanho = nextProps.despesas.length ;
     }

    criaFonteDeDados( despesas ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        despesas.sort((a,b) => {
            if (new Date(a.data) < new Date(b.data)){
                return 1;
            }
            if (new Date(a.data) > new Date(b.data)){
                return -1;
            }
            return 0;
        })
        this.fonteDeDados = ds.cloneWithRows(despesas)
        
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
                        <ItensD key ={data.uid} data ={data} />
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
        console.log(this.contador)
       
        if(this.contador == 0){
            this.consultado = this.props.despesas
            this.props.consultaDataD( this.consultado, this.data1, this.data2)
            this.contador += 1
        }
        this.props.consultaDataD(this.consultado, this.data1, this.data2)
  
    }
    render(){
        return(
            <Container>
                <Header androidStatusBarColor='#DC143C' style={{height: 50, backgroundColor: '#ff0000'}}>
                    <Left >
                        <Icon name="menu" 
                            size={40} 
                            color="white"
                            onPress={ () => this.props.navigation.dispatch(DrawerActions.openDrawer())} 
                        />
                    </Left>
                    <Body>
                        <Text style={{fontSize: 22, color: '#fff', marginLeft: 25}}> Despesas </Text>
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
                                format='MM-DD-YYYY'
                                minDate='01-01-1970'
                                maxDate='30-12-2100'
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
                                format='MM-DD-YYYY'
                                minDate='01-01-1970'
                                maxDate='30-12-2100'
                                confirmBtnText = 'Confirmar'
                                cancelBtnText = 'Cancelar'
                                onDateChange = {(date) => this.modificaData2(date)}
                            />
                        </View>
                         <View style={{ margin: 10,justifyContent: 'center' }}>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Icon name='search' containerStyle={{width: 100, height: 50,backgroundColor: '#fff', borderWidth: 2,
                                     borderRadius:50, borderColor: "black"}}  color="#000"   onPress={() => 
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
                                containerStyle={{width: 60,height:60, backgroundColor: '#ff0000', borderWidth: 2,
                                borderRadius:80, borderColor: "transparent"} }  onPress={() => Actions.Despesa() }
                                />
                            </View>
                        </View>
                    </View>
                   
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const despesas = _.map(state.ListaDespesasReducer, (val, uid) => {
        return { ...val, uid }
    })
    return { despesas }
}


export default connect(mapStateToProps, { modificaValor, modificaData, modificaDesc, modificaCat, modificaConta, checked, consultaDespesa, consultaDataD})(ConsultaDespesa);

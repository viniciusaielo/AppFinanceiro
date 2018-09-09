import React, {Component} from 'react';
import { View, Text,  ListView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import {Container, Header, Body, Left} from 'native-base';
import {DrawerActions} from 'react-navigation';
import Hamburger from 'react-native-hamburger';
import _ from 'lodash'
import {
    Actions
   } from 'react-native-router-flux';
import { consultaReceita } from '../actions/eventoActions';
import Itens from './Itens';

class ConsultaReceita  extends Component {
   
    componentWillMount(){
        this.props.consultaReceita()
        this.criaFonteDeDados( this.props.receitas )
        this.loading = true

     }
    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados( nextProps.receitas )
        this.loading = false;
     }

    criaFonteDeDados( receitas ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.fonteDeDados = ds.cloneWithRows(receitas)
        
    }

    renderList(){
        if(this.loading) {
            return (
                <ActivityIndicator size="large" />
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

    render(){
        return(
            <Container>
                <Header style={{height: 50, backgroundColor: '#20b2aa'}}>
                    <Left >
                        <Hamburger 
                            type="cross"
                            color="white"
                            onPress={ () => this.props.navigation.dispatch(DrawerActions.openDrawer())
                            } />
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
                                date={this.props.data}
                                mode="date"
                                placeholder = 'selecione a data'
                                format='DD-MM-YYYY'
                                minDate='01-01-1970'
                                maxDate='30-12-2100'
                                confirmBtnText = 'Confirmar'
                                cancelBtnText = 'Cancelar'
                                customStyles={{ dateIcon : {position: 'absolute', left: 0, top: 4, marginLeft: 0 }, dateInput: {marginLeft: 36}}}
                                onDateChange = {(date) => this.props.modificaData(date)}
                            />
                       
                            <Text> Até </Text>
                            <DatePicker
                                style={{width: 150}}
                                date={this.props.data}
                                mode="date"
                                placeholder = 'selecione a data'
                                format='DD-MM-YYYY'
                                minDate='01-01-1970'
                                maxDate='30-12-2100'
                                confirmBtnText = 'Confirmar'
                                cancelBtnText = 'Cancelar'
                                onDateChange = {(date) => this.props.modificaData(date)}
                            />
                        </View>
                         <View style={{ margin: 10,justifyContent: 'center' }}>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Icon name='search' containerStyle={{width: 100, height: 50,backgroundColor: '#fff', borderWidth: 2,
                                     borderRadius:50, borderColor: "black"}}  color="#000" 
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


export default connect(mapStateToProps,{consultaReceita})(ConsultaReceita);

import React, {Component} from 'react';
import { View, Text, ListView, ActivityIndicator} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { consultaCartao } from '../actions/contasActions';
import { Container, Header,  Body, Left} from 'native-base';
import {DrawerActions} from 'react-navigation';
import ItensCartao from './ItensCartao'
import _ from 'lodash'
import {
    Actions
   } from 'react-native-router-flux';


class Cartao  extends Component {
    componentWillMount(){
        this.props.consultaCartao();
        this.criaFonteDeDados( this.props.cartao );
        this.loading = true;

     }
    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados( nextProps.cartao )
        this.loading = false;
        this.tamanho = nextProps.cartao.length ;
     }

    criaFonteDeDados( cartao ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.fonteDeDados = ds.cloneWithRows(cartao)
        
     
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
                        <ItensCartao key ={data.uid} data ={data} />
                    )
                }
          />
        )
    }
    render(){
        return(
            <Container>
                <Header androidStatusBarColor='#CD5C5C' style={{height: 50, backgroundColor: '#F08080'}}>
                    <Left >
                        <Icon name="menu" 
                            size={40} 
                            color="white"
                            onPress={ () => this.props.navigation.dispatch(DrawerActions.openDrawer())} 
                        />
                    </Left>
                    <Body>
                        <Text style={{fontSize: 22, color: '#fff', marginLeft: 25}}> Cartões </Text>
                    </Body>
                </Header>
               
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 4,  justifyContent: 'center' }}>
                    <View style={{flex:1, marginBottom: 10 }}>
                            {this.renderList()}
                        </View>
                        </View>                        
                        <View >                         
                            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                                
                                <Icon name='add' color='#fff' size={50} underlayColor='#000' raised 
                                containerStyle={{width: 60,height:60, backgroundColor: '#F08080', borderWidth: 2,
                                borderRadius:80, borderColor: "transparent"} } 
                                 onPress={() => Actions.CartaoAdd()}>
                                
                                </Icon>
                            </View>
                        </View>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const cartao = _.map(state.ListaCartaoReducer, (val, uid) => {
        return { ...val, uid }
    })
    return { cartao }
    
}


export default connect(mapStateToProps,{consultaCartao})(Cartao);

import React, {Component} from 'react';
import { View, Text, ListView } from 'react-native';
import {Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { modificaTitulo, modificaSaldo, enviaConta, consultaConta } from '../actions/contasActions';
import { Container, Header, Left, Body} from 'native-base';
import {DrawerActions} from 'react-navigation';
import PopupDialog, {DialogButton} from 'react-native-popup-dialog';
import ContaAdd from './ContaAdd';
import _ from 'lodash'
import {
    Actions
   } from 'react-native-router-flux';
import ItensConta from './ItensConta';



class Conta  extends Component {
    componentWillMount(){
        this.props.consultaConta()
        this.criaFonteDeDados( this.props.contas )
       

     }
    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados( nextProps.contas )
        
     }

    criaFonteDeDados( contas ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.fonteDeDados = ds.cloneWithRows(contas)
        console.log(this.fonteDeDados)
      
        
    }
    fechaPopup(){
        this.props.modificaTitulo('');
        this.props.modificaSaldo('');
        this.popupDialog.show();
    }
    
    render(){
        return(
            <Container>
                <Header androidStatusBarColor='#483D8B' style={{height: 50, backgroundColor: '#6A5ACD'}}>
                    <Left >
                        <Icon name="menu" 
                            size={40} 
                            color="white"
                            onPress={ () => this.props.navigation.dispatch(DrawerActions.openDrawer())} 
                        />
                    </Left>
                    <Body>
                        <Text style={{fontSize: 22, color: '#fff', marginLeft: 25}}> Contas </Text>
                    </Body>
                </Header>
                <PopupDialog
                        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                        srtyle={{width: 1, height: 100}}          
                        >
                        <ContaAdd />
                    <DialogButton text="Cancelar" align="center" onPress={() => this.popupDialog.dismiss()}/>
                </PopupDialog>
                <View style={{ flex: 1, padding: 10 }}>
                         <View style={{flex:1, marginBottom: 10 }}>
                         <ListView
                                    enableEmptySections
                                    dataSource={this.fonteDeDados}
                                    renderRow={data => (
                                            <ItensConta key ={data.uid} data ={data} />
                                        )
                                    }
                            />
                        </View>         
                        <View >                         
                            <View style={{ alignItems: 'flex-end' }}>
                                
                                <Icon name='add' color='#fff' size={50} underlayColor='#000' raised 
                                    containerStyle={{width: 60,height:60, backgroundColor: '#6A5ACD', borderWidth: 2,
                                    borderRadius:80, borderColor: "transparent"} } 
                                    onPress={() => {
                                            this.fechaPopup()
                                            }}>
                                
                                </Icon>
                            </View>
                        </View>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const contas = _.map(state.ListaContaReducer, (val, uid) => {
        return { ...val, uid }
    })
    return { contas }
}




export default connect(mapStateToProps,{modificaTitulo, modificaSaldo, enviaConta,consultaConta})(Conta);

import React, { Component } from 'react';
import { View, Text, ListView, ActivityIndicator, TouchableHighlight, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { Container, Header, Body, Left } from 'native-base';
import { DrawerActions } from 'react-navigation';
import PopupDialog, { DialogButton } from 'react-native-popup-dialog';
import _ from 'lodash'
import {
    Actions
} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import { consultaReceita, consultaData } from '../actions/eventoActions';
import Itens from './Itens';

class ConsultaReceita extends Component {
    constructor(props) {
        super(props)
        this.state = { mes: '', ano: '' }
    }
    componentWillMount() {
        const date = new Date()
        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const ano = date.getFullYear();
        let data = mes + "/" + dia + "/" + ano;

        this.props.consultaReceita(data);
        this.criaFonteDeDados(this.props.receitas);
        this.loading = false;

        this.meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Decembro"];
        this.setState({ mes: this.meses[mes - 1], ano: ano })

    }
    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.receitas)
        this.loading = false;
        this.tamanho = nextProps.receitas.length;

    }

    criaFonteDeDados(receitas) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        receitas.sort((a, b) => {
            if (new Date(a.data) < new Date(b.data)) {
                return 1;
            }
            if (new Date(a.data) > new Date(b.data)) {
                return -1;
            }
            return 0;
        })
        this.fonteDeDados = ds.cloneWithRows(receitas)


    }

    renderList() {

        if (this.tamanho == 0) {
            return (
                <View style={{ felx: 2,alignItems: 'center', justifyContent: 'center' }}>
                    <View >
                        <Text> NENHUM REGISTRO ENCONTRADO </Text>
                    </View>
                    
                    <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Icon name='add' color='#fff' size={50} underlayColor='#000' raised
                            containerStyle={{
                                width: 60, height: 60, backgroundColor: '#20b2aa', borderWidth: 2,
                                borderRadius: 80, borderColor: "transparent"
                            }} onPress={() => Actions.Receita()}
                        >

                        </Icon>
                    </View>
                </View>
            )
        }
        return (
            <ListView
                enableEmptySections
                dataSource={this.fonteDeDados}
                renderRow={data => (
                    <Itens key={data.uid} data={data} />
                )
                }
            />
        )
    }
    traduz(text) {
        this.setState({ mesp: text })
    }
    filtro() {

        this.props.consultaData(this.state.mes, this.state.ano);


    }

    render() {
        return (
            <Container>
                <Header androidStatusBarColor='#00CED1' style={{ height: 50, backgroundColor: '#20b2aa' }}>
                    <Left >
                        <Icon name="menu"
                            size={40}
                            color="white"
                            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                        />
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 22, color: '#fff', marginLeft: 25 }}> Receitas </Text>
                    </Body>
                </Header>
                <View >
                    <PopupDialog
                        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                        srtyle={{ width: 1, height: 100 }}
                    >

                        <Picker
                            style={{ transform: [{ scaleX: 1 }, { scaleY: 1.5 }] }}
                            selectedValue={this.state.mes}
                            onValueChange={text => this.setState({ mes: text })}
                        >
                            <Picker.Item label='Mês' value='' />
                            {this.meses.map(item => (<Picker.Item label={item} value={item} />))}
                        </Picker>
                        <Picker
                            style={{ transform: [{ scaleX: 1 }, { scaleY: 1.5 }] }}
                            selectedValue={this.state.ano}
                            onValueChange={text => { this.setState({ ano: text }) }}
                        >
                            <Picker.Item label='Ano ' value='' />

                        </Picker>

                        <DialogButton text="Confirmar" align="center" onPress={() => this.popupDialog.dismiss()} />

                    </PopupDialog>
                </View>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <View style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableHighlight onPress={() => this.popupDialog.show()}>
                                <Text style={{ fontSize: 20 }}>{this.state.mes}/{this.state.ano}</Text>
                            </TouchableHighlight>

                            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Icon name='search' containerStyle={{
                                    width: 80, height: 50, backgroundColor: '#fff', borderWidth: 2,
                                    borderRadius: 50, borderColor: "black"
                                }} color="#000" onPress={() =>
                                    this.filtro()}
                                >
                                </Icon>
                            </View>
                        </View>

                        <View style={{ flex: 4, marginBottom: 10 }}>
                            {this.renderList()}
                        </View>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Icon name='add' color='#fff' size={50} underlayColor='#000' raised
                                containerStyle={{
                                    width: 60, height: 60, backgroundColor: '#20b2aa', borderWidth: 2,
                                    borderRadius: 80, borderColor: "transparent"
                                }} onPress={() => Actions.Receita()}
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


export default connect(mapStateToProps, { consultaReceita, consultaData })(ConsultaReceita);

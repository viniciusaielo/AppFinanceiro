import React, {Component} from 'react';
import { View, TextInput, Text,ListView} from 'react-native';
import {Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import {DrawerActions} from 'react-navigation';
import { consultaCategoria } from '../actions/contasActions';
import { Container, Header,Body, Left} from 'native-base';
import firebase from 'firebase';
import ListaCategoria from './ListaCategoria';


class Categorias  extends Component {
    constructor(props) {
        super(props);
        this.state = {categoria: ''};
      }
      componentWillMount(){
        this.props.consultaCategoria();
        this.criaFonteDeDados( this.props.receitas );

     }
    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados( nextProps.categoria )
        this.tamanho = nextProps.categoria.length
     }

    criaFonteDeDados( categoria ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        
        categoria.sort((a,b) => {
            if (new Date(a.data) < new Date(b.data)){
                return 1;
            }
            if (new Date(a.data) > new Date(b.data)){
                return -1;
            }
            return 0;
        })
        this.fonteDeDados = ds.cloneWithRows(categoria)
        
     
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
    
  enviar(){
  
            firebase.database().ref(`/categoria`)
            .push(this.state.categoria)
            .then(alert("Categoria Salva"))
            .catch(erro => console.log(erro.message, dispatch))

}
    
    render(){
        return(
            <Container>
                <Header androidStatusBarColor='#A52A2A' style={{height: 50, backgroundColor: '#8B0000'}}>
                     <Left >
                        <Icon name="menu" 
                            size={40} 
                            color="white"
                            onPress={ () => this.props.navigation.dispatch(DrawerActions.openDrawer())} 
                        />
                    </Left>
                    <Body>
                        <Text style={{fontSize: 22, color: '#fff', marginLeft: 25}}> Categorias</Text>
                    </Body>
                </Header>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{justifyContent: 'space-between' , flexDirection:'row'}}>
                        <View style={{marginLeft: 50}}>
                            <TextInput 
                                value={this.state.categoria} placeholder="Categoria" 
                                placeholderTextColor='#808080' style={{ fontSize: 20, height: 55, width: 200 }} 
                                onChangeText={text => this.setState({categoria: text})}
                             />
                        </View>
                        <View style={{  justifyContent: 'center', marginRight:40}}>  
                            <Icon name='check' color='#fff' size={40} underlayColor='#000' raised 
                                containerStyle={{width: 50,height:50, backgroundColor: '#A52A2A', borderWidth: 2,
                                borderRadius:80, borderColor: "transparent"} } 
                                 onPress={() => this.enviar()}>
                            </Icon>
                        </View> 
                    </View>
                    <View style={{flex:1, marginBottom: 10 }}>
                        {this.renderList()}
                    </View>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const categoria = _.map(state.ListaCategoriaReducer, (val, uid) => {
        return { ...val, uid }
    })
    return { categoria }
}


export default connect(mapStateToProps, {consultaCategoria})(Categorias);

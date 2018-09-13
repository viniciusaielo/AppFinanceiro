import React from 'react';
import { Router,Scene } from 'react-native-router-flux';
//import FormLogin from './components/FormLogin';

import App from './components/App';
import Receita from './components/Receita';
import Principal from './components/Principal';
import Despesa from './components/Despesa';
import ConsultaReceita from './components/ConsultaReceita';
import ConsultaDespesa from './components/ConsultaDespesa';
import Conta from './components/Conta';
import Cartao from './components/Cartao';
import CartaoAdd from './components/CartaoAdd';
import ContaAdd from './components/ContaAdd';


export default props => (
	
    <Router navigationBarStyle={{backgroundColor: '#1e90ff' }}
    	 titleStyle={{color: '#fff', fontSize: 20 }}
    	 barButtonTextStyle={{color: '#fff'}}
		 barButtonIconStyle={{ tintColor: 'rgb(255,255,255)'}} 
		 backAndroidHandler={ onBackAndroid}
		 >
		 		<Scene key='ContaAdd' component={ContaAdd} title="Adicionar Cartão" hideNavBar = {false} navigationBarStyle={{backgroundColor: '#9400D3' }} />

		<Scene key='Cartao' component={Cartao} title="Cartões" hideNavBar = {false}  navigationBarStyle={{backgroundColor: '#F08080' }} />
		<Scene key='CartaoAdd' component={CartaoAdd} title="Adicionar Cartão" hideNavBar = {false}  navigationBarStyle={{backgroundColor: '#F08080' }} />
		<Scene key='Conta' component={Conta} title="Contas" hideNavBar = {false}  navigationBarStyle={{backgroundColor: '#6A5ACD' }} />
		<Scene key='ConsultaReceita' component={ConsultaReceita} title="Consulta Receita" hideNavBar = {false}  />
		<Scene key='ConsultaDespesa' component={ConsultaDespesa} title="Consulta Despesa" hideNavBar = {false}  />
		<Scene key='App' component={App} title="App" hideNavBar = {true}  initial />
		<Scene key='principal' component={Principal} title="Principal" hideNavBar = {true}  />
		<Scene key='Receita' component={Receita} title="Nova Receita" hideNavBar = {false}  navigationBarStyle={{backgroundColor: '#20b2aa' }} />
		<Scene key='Despesa' component={Despesa} title="Nova Despesa" hideNavBar = {false}  navigationBarStyle={{backgroundColor: '#ff0000' }} />


    </Router>

	);
	const onBackAndroid = () => {
		return false; // Return true to stay, or return false to exit the app.
	};
	
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './reducers';

class App extends Component { 
    componentWillMount(){
        var config = {
            apiKey: "AIzaSyAa4iBo3oNcIsv6JW5zjx1Jo__ES794vqg",
            authDomain: "financeiro-5f4cd.firebaseapp.com",
            databaseURL: "https://financeiro-5f4cd.firebaseio.com",
            projectId: "financeiro-5f4cd",
            storageBucket: "financeiro-5f4cd.appspot.com",
            messagingSenderId: "601914376928"
          };
          firebase.initializeApp(config);
    }
    
	render(){
		return(
			<Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))} >
		    	<Routes />
		   </Provider>
	    );
	}
}
export default App;

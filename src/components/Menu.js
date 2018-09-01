import Drawer from 'react-native-drawer';
import React, {Component} from 'react';
import Principal from './Principal';
import Receita from './Receita';


export default class Menu extends Component {
	closeControlPanel = () => { this._drawer.close() };
	openControlPanel = () => { this._drawer.open() };
	render() {
		return (
			<Drawer ref={(ref) => this._drawer = ref }
					content = { <Receita /> } type="overlay"
					
					openDrawerOffset={100}
				
					styles={drawerStyles}
					tweenHandler={Drawer.tweenPresets.parallax}
			>
				<Principal />
			</Drawer>
			)
	}


}
const drawerStyles = { 
	drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
	main: { paddingLeft: 3}
}
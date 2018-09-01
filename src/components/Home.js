
import {
    Picker,
    Text,
    View
} from 'react-native' ;
import React, { Component } from 'react';

export default class Home extends Component {
   constructor(props) {
       super(props)
        
            const services = ['a', 'b', 'c', 'd', 'e'];
            const selectedService ='a'
        
    }

    componentDidMount() {
          this.services= [ 'one', 'two', 'three', 'four', 'five' ]
        
    }

    render() {
        let serviceItems = this.services.map( (s, i) => {
            return (<Picker.Item key={i} value={s} label={s} />)
        });

        return (
            <View>
                <Text>Pick a service</Text>
                <Picker
                   
                    onValueChange={ (service) => ( this.setState({selectedService:service}) ) } >

                    {serviceItems}

                </Picker>
            </View>
        );
    }
}

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Icon, Button, Container, Header, Content, Left} from 'native-base';




export default class Setting extends Component {
    render(){
        return(
            <Container>
                <Header>
                    <Left>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')  }>
                         <Icon name="bars"/>
                     </TouchableOpacity>
                    </Left>
                </Header>
            
                <Content>
                    <Text> Setting </Text>
                </Content> 
            </Container>
     
        );
    }
}

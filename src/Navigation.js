import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import Module from './screen/Module';
import Config from './screen/Config';
import Concept from './screen/Concept';
import Icon from 'react-native-vector-icons/EvilIcons';
import React, { Component } from 'react';
import IConceptImpl from './screen/IConceptImpl'

const MainStack = createStackNavigator(
    {
        ModuleStack: { screen: Module },
        ConceptStack: { screen: Concept },
        IConceptImplStack: { screen: IConceptImpl }
    },
    {
        initialRouteName: 'ModuleStack',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#4285F6',
                marginBottom: 4,
                elevation: 25
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontSize: 18,
                fontWeight: 'bold',
            },
        },
    },
);

const rootNavigator = createDrawerNavigator({
    Home: {
        screen: MainStack,
        navigationOptions: {
            drawerLabel: 'Módulos',
            drawerIcon: ({ tintColor }) => {
                <Icon name='archive' size={25} color={tintColor} />
            }
        },
    },
    Config: {
        screen: Config,
        navigationOptions: {
            drawerLabel: 'Configurações',
            drawerIcon: ({ tintColor }) => (
                <Icon name='gear' size={25} color={tintColor} />
            ),

        },
    },
});

const AppContainer = createAppContainer(rootNavigator);
export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

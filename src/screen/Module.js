import React, { Component } from 'react'
import ContentModule from '../components/ContentModule'

import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation';
import { Text, FlatList, StyleSheet, View, TouchableOpacity } from 'react-native'
import data from '../data/data'
export default class Module extends Component {

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Gerenciamento de módulos',
			headerLeft: () => (
				<View style={{ marginLeft: 10 }}>
					<TouchableOpacity onPress={() => navigation.openDrawer()}>
						<Icon name="navicon" size={30} color={'white'} />
					</TouchableOpacity>
				</View>
			),
		};
	};

	state = {
		module: data
			
	}
	render() {

		const moduleToConcept = id => {
			const modules = [...this.state.module];
			modules.forEach(module => {
				if (module.id === id) {
					this.props.navigation.navigate('ConceptStack', {
						title: module.moduleContent,
						concepts: module.concepts,
					});
				}

			});
		};

		return (
			<View style={styles.container}>
				<FlatList data={this.state.module} keyExtractor={(item) => `${item.id}`}
					renderItem={({ item }) => (
						<ContentModule
							key={item.id}
							{...item}
							moduleToConcept={moduleToConcept}
						/>
					)} />
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Platform.OS === 'IOS' ? 10 : 0,
	},
})
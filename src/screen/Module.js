import React, { Component } from 'react'
import ContentModule from '../components/ContentModule'

import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, FlatList, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
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

		const moduleToExercices = id => {
			const modules = [...this.state.module]
			modules.forEach(value => {
				if (value.id === id) {
					if (value.exercise === undefined) {
						Alert.alert('Sem exercício no momento')
					} else
						this.props.navigation.navigate("ExerciceStack", {
							questions: value.exercise
						})
				}
			})
		}

		return (
			<View style={styles.container}>
				<FlatList data={this.state.module} keyExtractor={(item) => `${item.id}`}
					renderItem={({ item }) => (
						<ContentModule
							key={item.id}
							{...item}
							moduleToConcept={moduleToConcept}
							moduleToExercices={moduleToExercices}
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
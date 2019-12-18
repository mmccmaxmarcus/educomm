import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Concept extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title'),
        };
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "0%"
                }}
            />
        );
    };

    renderItem = ({ item }) => {

        const elements = id => {
            this.props.navigation.getParam('concepts').forEach(value => {
                if (value.id === id) {
                    this.props.navigation.navigate("IConceptImplStack", {
                        conceptImpl: value.IConceptImpl,
                        concept: value.concept
                    })
                }
            })
        }

        const exerciceConcept = id => {
            this.props.navigation.getParam('concepts').forEach(value => {
                if (value.id === id) {
                    this.props.navigation.navigate("ExerciceStack", {
                        questions: value.exercise
                    })
                }
            })
        }


        return (
            <View style={styles.container}>
                <View style={styles.descItem}>
                    <TouchableOpacity onPress={() => { elements(item.id) }}>
                        <Text style={styles.textConcept}>{item.concept}</Text>
                    </TouchableOpacity>

                    <View style={styles.icons}>
                        <TouchableOpacity onPress={() => { exerciceConcept(item.id) }}>
                            <Icon
                                style={styles.iconBordaEsquerda}
                                name="pencil-square-o"
                                size={35}
                                color="black"
                            />
                        </TouchableOpacity>
                        <Icon
                            name="user"
                            size={35}
                            color="black"
                        />
                        <Icon
                            name="ellipsis-h"
                            size={35}
                            color="black"
                        />
                    </View>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.navigation.getParam('concepts')}
                    keyExtractor={item => `${item.id}`}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    descItem: {

        flexDirection: 'column',
        width: '80%',

    },
    textConcept: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left'
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
        borderWidth: 1,
        borderRadius: 30,
        padding: 8

    },
});
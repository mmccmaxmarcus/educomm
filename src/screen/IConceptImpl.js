import React, { Component } from 'react';
import { Image, FlatList, Text, View, Alert, SafeAreaView } from 'react-native';

import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';


export default class Elements extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('concept'),
        };
    };

    _renderItem = ({ item }) => {
        const image =
            this.props.navigation.getParam('image') === null ? null : (
                <ReactNativeZoomableView doubleTapDelay={200}>
                    <Image
                        source={item.image}
                        width={150}
                        height={150}
                    />
                </ReactNativeZoomableView>
            );


        const subTexts = item.subTexts === undefined ? null : item.subTexts.map(value => {
            if (value == null || value == undefined) {
                return
            } else {
                return (<View style={{ paddingBottom: 5 }}><Text style={{ fontSize: 17 }} key={value.id}>{value.subText}</Text></View>)
            }
        })

        return (
            <SafeAreaView style={{ margin: 10 }}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, textAlign: 'justify'}}>{item.text}</Text>
                </View>

                <View style={{ paddingBottom: 10 }}>
                    {subTexts}
                </View>

            </SafeAreaView>
        );
    };

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.navigation.getParam('conceptImpl')}
                    keyExtractor={item => `${item.id}`}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

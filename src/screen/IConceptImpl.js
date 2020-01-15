import React, { Component } from 'react';
import { Image, FlatList, Text, View, Alert, SafeAreaView, StyleSheet} from 'react-native';
import VideoIConceptImpl from 'react-native-video'
import WebView from 'react-native-webview'

import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';


export default class Elements extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('concept'),
        };
    };

    _renderItem = ({ item }) => {
        const image =
            item.image === undefined ? null : (
                <ReactNativeZoomableView doubleTapDelay={200} >
                    <Image
                        source={item.image}
                        width={250}
                        height={300} resizeMode="contain"
                    />
                </ReactNativeZoomableView>
            );


        const subTexts = item.subTexts === undefined ? null : item.subTexts.map(value => {
            if (value == null || value == undefined) {
                return
            } else {
                return (<View style={{ paddingBottom: 5 }}>
                    <Text style={{ fontSize: 17 }} key={value.id}>{value.subText}</Text></View>)
            }
        })

        const video = item.url === undefined ? null : (
            <View style={{alignItems: "center", justifyContent: 'center'}}>
                  
            <WebView source={{uri: item.url}} javaScriptEnabled={true}
                domStorageEnabled={true} 
            style={{width: 350, height: 230, margin: 5,padding: 5, flex: 1}} />
           </View>  
        )

        
        return (
           
            <View style={styles.viewContainer}>

                {video}
                
                <View>
                    <Text style={styles.text}>{item.text}</Text>
                </View>

                <View style={styles.viewImage}>
                    {image}
                </View>

                <View style={styles.viewSubTexts}>
                    {subTexts}
                </View>

            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.navigation.getParam('conceptImpl')}
                    keyExtractor={item => `${item.id}`}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        margin: 10,
    },
    text: {
        fontSize: 18,
        textAlign: 'justify'
    },
    viewImage: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3
    },
    viewSubTexts: {
        paddingBottom: 10,
    }
})

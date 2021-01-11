
import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text,
} from 'react-native';
import Layout from "../constants/Layout";

export default class ActivityIndicatorHelper extends Component {
    render() {
        return (
            <View style={{ position: 'absolute', height: '110%', width: '100%', backgroundColor: 'rgba(12, 12, 13, 0.6)', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator
                    animating={true}
                    style={{ alignSelf: 'center' }}
                    color="white"
                    size="large"
                />
                <Text style={{ color: 'white' ,fontSize:Layout.font.normal_size}}>
                  loading...
                </Text>
            </View>
        );
    }
}

import React from 'react';
import {StyleSheet, View,} from 'react-native';

export default function Footer() {
    return (
        <View style={styles.viewFooter}>
        </View>
    );
}

const styles = StyleSheet.create({
    viewFooter: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#2BAEF7',
        height: '3%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

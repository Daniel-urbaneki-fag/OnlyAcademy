import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Modal } from 'react-native'

import CameraScreen from '../../components/CameraScreen';

export const TelaHome = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, alignItems: "center" }}>
                    <View>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttonTopExplore}>
                            <Image source={require('../../images/Camera.png')} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: '600',
                            color: '#000000',
                        }}>Explore</Text>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <CameraScreen closeModal={() => setModalVisible(false)} />
                    </Modal>
                    <View>
                        <TouchableOpacity style={styles.buttonTopExplore}>
                            <Image source={require('../../images/comboshape.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: "row"}}>
                    <View style={{paddingLeft: 20, alignItems: "center"}}>
                        <TouchableOpacity style={styles.buttonPeoplesStory}>
                            <Image source={require('../../images/you.png')} />
                        </TouchableOpacity>
                        <Text>You</Text>
                    </View>
                    <View style={{paddingLeft: 20, alignItems: "center"}}>
                        <TouchableOpacity style={styles.buttonPeoplesStory}>
                            <Image source={require('../../images/cara.png')} />
                        </TouchableOpacity>
                        <Text>Benjamin</Text>
                    </View>
                    <View style={{paddingLeft: 20, alignItems: "center"}}>
                        <TouchableOpacity style={styles.buttonPeoplesStory}>
                            <Image source={require('../../images/ela1.png')} />
                        </TouchableOpacity>
                        <Text>Farita</Text>
                    </View>
                    <View style={{paddingLeft: 20, alignItems: "center"}}>
                        <TouchableOpacity style={styles.buttonPeoplesStory}>
                            <Image source={require('../../images/ela2.png')} />
                        </TouchableOpacity>
                        <Text>Marie</Text>
                    </View>
                    <View style={{paddingLeft: 20, alignItems: "center"}}>
                        <TouchableOpacity style={styles.buttonPeoplesStory}>
                            <Image source={require('../../images/ela3.png')} />
                        </TouchableOpacity>
                        <Text>Claire</Text>
                    </View>
                </View>
                <View style={{backgroundColor: "#E6EEFA", padding: 10, margin: 10, borderRadius: 40}}>
                    <View style={{flexDirection: "row", marginBottom: 10}}>
                        <View style={{borderWidth: 2, borderColor: "#FFFFFF", borderRadius: 90}}>
                            <Image source={require('../../images/ela3.png')} />
                        </View>
                        <View style={{marginLeft: 20}}>
                            <Text style={{fontSize: 20, fontWeight: 600, color: "#000000"}}>Claire Dangais</Text>
                            <Text style={{fontSize: 16, fontWeight: 400, color: "#000000"}}>@claireD15</Text>
                        </View>
                    </View>
                    <View>
                        <ImageBackground source={require('../../images/image1Ceu.png')} style={{height: 300, justifyContent: "flex-end"}}>
                        </ImageBackground>
                    </View>
                </View>
                <View style={{backgroundColor: "#E6EEFA", padding: 10, margin: 10, borderRadius: 40}}>
                    <View style={{flexDirection: "row", marginBottom: 10}}>
                        <View style={{borderWidth: 2, borderColor: "#FFFFFF", borderRadius: 90}}>
                            <Image source={require('../../images/ela1.png')} />
                        </View>
                        <View style={{marginLeft: 20}}>
                            <Text style={{fontSize: 20, fontWeight: 600, color: "#000000"}}>Faria Smith</Text>
                            <Text style={{fontSize: 16, fontWeight: 400, color: "#000000"}}>@SmithFa</Text>
                        </View>
                    </View>
                    <View>
                        <ImageBackground source={require('../../images/caraimagefundo.png')} style={{height: 300, justifyContent: "flex-end"}}>
                        </ImageBackground>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    buttonPeoplesStory: {
        borderWidth: 2,
        borderRadius: 100,
        width: 70,
        height: 70,

        justifyContent: "center",
        alignItems: "center",
        borderColor: "#5790DF"
    },
    buttonTopExplore: {
        backgroundColor: "#d0d7e1",
        padding: 15,
        borderRadius: 100
    },
    container: {
        height: "100%",
    },
})
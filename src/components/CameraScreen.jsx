import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';

class CameraScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.camera = null;
    }

    takePicture = async () => {
        if (this.camera) {
            try {
                const options = { quality: 0.5, base64: true };
                const data = await this.camera.takePictureAsync(options);
                console.log(data.uri);
            } catch (error) {
                console.error(error);
            }
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                />
                <View style={styles.captureContainer}>
                    <TouchableOpacity onPress={this.takePicture} style={styles.captureButton}>
                        <Text style={styles.captureText}>CAPTURE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    captureContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
    },
    captureButton: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    captureText: {
        fontSize: 14,
    },
});

export default CameraScreen;
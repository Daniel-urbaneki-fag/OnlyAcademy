import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { supabase } from '../config/supabaseClient';

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
                console.log('Foto tirada:', data.uri);
                this.uploadImage(data.uri);
            } catch (error) {
                console.error('Erro ao tirar foto:', error);
            }
        }
    };

    uploadImage = async (imageUri) => {
        try {
            const file = {
                uri: imageUri,
                name: 'example.jpg',
                type: 'image/jpeg',
            };
    
            const { data, error } = await supabase.storage
                .from('uploadImagesOnlyAcademy')
                .upload('folder_name/example.jpg', file);
    
            if (error) {
                console.error('Erro ao enviar imagem para o Supabase Storage:', error.message);
            } else {
                console.log('Imagem enviada com sucesso:', data);
                // Aqui você pode salvar o URL da imagem no seu banco de dados (por exemplo, em uma tabela de perfis ou posts)
            }
        } catch (error) {
            console.error('Erro ao enviar imagem:', error.message);
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
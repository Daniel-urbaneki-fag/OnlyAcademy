import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Modal } from 'react-native'

import CameraScreen from '../../components/CameraScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { supabase } from '../../config/supabaseClient';

export const TelaHome = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [posts, setPosts] = useState([]);

    const userId = 'd1a37db7-bfde-4403-b42b-aeafe214171c';

    useEffect(() => {
        fetchPosts();
        // createPosts(postsExemple);
        // deletePostsByUserId(userId);
    }, []);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select(`
                *,
                profile:profile!inner (
                    first_name,
                    last_name,
                    profile_picture
                )
            `)

        if (error) {
            console.error('Erro ao buscar posts:', error);
        } else {
            setPosts(data);
            console.log('Posts:', data);
        }
    };

    const deletePostsByUserId = async (userId) => {
        const { data, error } = await supabase
            .from('posts')
            .delete()
            .eq('user_id', userId);
    
        if (error) {
            console.error('Erro ao deletar posts:', error);
        } else {
            console.log('Posts deletados com sucesso:', data);
        }
    };

    const createPosts = async (postsExemples) => {
        const { data, error } = await supabase
            .from('posts')
            .insert(postsExemples);
    
        if (error) {
            console.error('Erro ao criar posts:', error);
        } else {
            console.log('Posts criados com sucesso:', data);
        }
    };
    
    const postsExemple = [
        {
            user_id: userId,
            post_type: 'image',
            content: 'Primeiro post',
            number: '1',
            image_url: 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/instagram-post-templates.jpg?width=595&height=400&name=instagram-post-templates.jpg',
            video_url: '',
            likes: '56',
            shares: '5',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            user_id: userId,
            post_type: 'image',
            content: 'Segundo post',
            number: '2',
            image_url: 'https://www.hostinger.com.br/tutoriais/wp-content/uploads/sites/12/2018/04/wordpress-custom-post-types.webp',
            video_url: '',
            likes: '34',
            shares: '22',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
    ];

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@payment_storage', value);
        } catch (e) {
          console.error(e);
        }
      };

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
                        <TouchableOpacity onPress={() => storeData('false')} style={styles.buttonTopExplore}>
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
                {posts.map(post => (
                    <View key={post.id} style={{ backgroundColor: "#E6EEFA", padding: 10, margin: 10, borderRadius: 40 }}>
                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <View style={{ borderWidth: 2, borderColor: "#FFFFFF", borderRadius: 90, overflow: 'hidden' }}>
                                <ImageBackground source={{ uri: post.profile.profile_picture }} style={styles.profileImage} />
                            </View>
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 600, color: "#000000" }}>{post.profile.first_name} {post.profile.last_name}</Text>
                                <Text style={{ fontSize: 16, fontWeight: 400, color: "#000000" }}>@{post.profile.first_name}{post.profile.last_name}</Text>
                            </View>
                        </View>
                        <View>
                            <ImageBackground source={{ uri: post.image_url }} style={{ height: 300, justifyContent: "flex-end" }} />
                        </View>
                    </View>
                ))}
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
    profileImage: {
        width: 50,
        height: 50
    },
    container: {
        height: "100%",
    },
})
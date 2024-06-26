import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';

import backgroundImage from '../../images/bg-perfil.png';
import pessoaImage from '../../images/pessoa.png';

import { supabase } from '../../config/supabaseClient';

export const TelaPerfilUsuario = () => {
    const [profile, setProfile] = useState({ "bio": "", "birthdate": "", "cover_photo": "", "created_at": "", "first_name": "", "id": "", "last_name": "", "location": "", "profile_picture": "https://img.freepik.com/fotos-gratis/pessoa-mulher-sorrindo-estudio-retrato_1303-2281.jpg", "updated_at": "", "user_id": "" });

    const userId = 'd1a37db7-bfde-4403-b42b-aeafe214171c';

    useEffect(() => {
        fetchProfile();
        // addProfile()
        // updateProfilePicture()
        // deleteProfile()
    }, []);

    const fetchProfile = async () => {
        const { data, error } = await supabase
            .from('profile')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error) {
            console.error('Erro ao buscar perfil:', error);
        } else {
            console.log('Perfil encontrado:', data);
            setProfile(data);
        }
    };

    const addProfile = async () => {
        const profileData = {
            first_name: 'Maria',
            last_name: 'Silva',
            bio: 'Engenheira de Software apaixonada por tecnologia e inovação. Adora viajar e explorar novas culturas.',
            location: 'São Paulo',
            birthdate: new Date('1988-03-15').toISOString(),
            profile_picture: 'https://img.freepik.com/fotos-gratis/pessoa-mulher-sorrindo-estudio-retrato_1303-2281.jpg',
            cover_photo: 'https://img.freepik.com/fotos-gratis/pessoa-mulher-sorrindo-estudio-retrato_1303-2281.jpg',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
            .from('profile')
            .insert([profileData]);

        if (error) {
            console.error('Erro ao adicionar perfil:', error);
        } else {
            console.log('Perfil adicionado com sucesso:', data);
        }
    };

    const updateProfilePicture = async () => {
        const newProfilePicture = 'https://img.freepik.com/fotos-gratis/pessoa-mulher-sorrindo-estudio-retrato_1303-2281.jpg';

        const { data, error } = await supabase
            .from('profile')
            .update({ profile_picture: newProfilePicture, updated_at: new Date().toISOString() })
            .eq('user_id', userId);

        if (error) {
            console.error('Erro ao atualizar a foto do perfil:', error);
        } else {
            console.log('Foto do perfil atualizada com sucesso:', data);
        }
    };

    const deleteProfile = async () => {
        const { data, error } = await supabase
            .from('profile')
            .delete()
            .eq('user_id', userId);

        if (error) {
            console.error('Erro ao deletar perfil:', error);
            setMessage('Erro ao deletar perfil');
        } else {
            console.log('Perfil deletado com sucesso:', data);
            setMessage('Perfil deletado com sucesso');
        }
    };
    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.background}></ImageBackground>
            <View style={styles.boxPerfilUsuario}>
                <View style={styles.perfilUsuario}>
                    <View style={styles.boxCenter}>
                        <Text style={styles.title}>1K</Text>
                        <Text style={styles.titleLight}>Followers</Text>
                    </View>
                    <View>
                        <ImageBackground source={{ uri: profile.profile_picture ? profile.profile_picture : pessoaImage }} style={styles.boxPessoaImage}></ImageBackground>
                    </View>
                    <View style={styles.boxCenter}>
                        <Text style={styles.title}>342</Text>
                        <Text style={styles.titleLight}>Following</Text>
                    </View>
                </View>
                <View style={styles.boxInfosUser}>
                    <View>
                        <Text style={styles.title}>{profile.first_name ? profile.first_name : ""} {profile.last_name ? profile.last_name : ""}</Text>
                    </View>
                    <View>
                        <Text style={styles.titleLightGray}>{profile.bio ? profile.bio : ""}</Text>
                    </View>
                    <View style={styles.boxRow}>
                        <TouchableOpacity style={styles.buttonFollow}><Text style={styles.textButton}>Follow</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.buttonMessage}><Text style={styles.textButtonBlack}>Message</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.boxFilterButtons}>
                    <TouchableOpacity style={styles.filterMidia}><Text style={styles.textButtonFilter}>All</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.filterMidia}><Text style={styles.textButtonFilter}>Photos</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.filterMidia}><Text style={styles.textButtonFilter}>Videos</Text></TouchableOpacity>
                </View>
                <View style={{ justifyContent: "space-between", borderWidth: 10, borderColor: "#FFFFFF", borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: "#FFFFFF" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 10, borderColor: "#FFFFFF" }}>
                        <View>
                            <Image style={{ objectFit: "contain" }} source={require('../../images/image6.png')} />
                        </View>
                        <View style={{ justifyContent: "space-between" }}>
                            <Image source={require('../../images/image2.png')} />
                            <Image source={require('../../images/image3.png')} />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Image source={require('../../images/image4.png')} />
                        <Image source={require('../../images/image5.png')} />
                        <Image source={require('../../images/image1.png')} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    filterMidia: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    textButtonFilter: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000000',
    },
    boxFilterButtons: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center"
    },
    container: {
        height: "100%",
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    titleLight: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000000',
    },
    titleLightGray: {
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: "center",
        color: '#6C7A9C',
        padding: 10
    },
    background: {
        flex: 1,
        height: 200,
        resizeMode: 'cover',
    },
    boxPerfilUsuario: {
        backgroundColor: "#E6EEFA",
        height: "80%",
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    perfilUsuario: {
        justifyContent: "center",
        flexDirection: "row",
    },
    boxPessoaImage: {
        height: 120,
        width: 120,
        borderRadius: 70,
        marginTop: -40,
        overflow: 'hidden',
        resizeMode: 'cover',
        borderColor: "#FFFFFF",
        borderWidth: 5,
        padding: 40
    },
    boxCenter: {
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    boxInfosUser: {
        alignItems: "center"
    },
    boxRow: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around"
    },
    buttonFollow: {
        backgroundColor: "#5790DF",
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 40,
    },
    buttonMessage: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 40,
    },
    textButton: {
        color: "#FFFFFF",
        fontSize: 18
    },
    textButtonBlack: {
        color: "#000000",
        fontSize: 18
    },
});
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "../../services/Api";
import Header from "../../components/header";
import { styles } from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface Profile {
  id: number;
  email: string;
  nomeCompleto: string;
  nomeSocial: string | null;
  foto: string;
}



type ProfileFormNavigationProp = StackNavigationProp<any, "Home">;

const Home = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [token, setToken] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [profileToDeleteId, setProfileToDeleteId] = useState<number | null>(
    null
  );
  const navigation = useNavigation<ProfileFormNavigationProp>();

  // Use o useFocusEffect para fazer a requisição GET toda vez que a tela estiver em foco
  useFocusEffect(
    React.useCallback(() => {
      const fetchProfiles = async () => {
        try {
          const storedToken = await AsyncStorage.getItem("token");
          if (storedToken !== null) {
            setToken(storedToken);

            const config = {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            };

            const response = await Api.get("/perfil", config);
            setProfiles(response.data.content);
          } else {
            console.error("Token não encontrado no AsyncStorage");
          }
        } catch (error) {
          console.error("Erro ao buscar perfis:", error);
        }
      };

      fetchProfiles(); // Chame a função de busca de perfis quando a tela estiver em foco
    }, [])
  );

  const handleDeleteProfile = (profileId: number) => {
    setProfileToDeleteId(profileId);
    setDeleteModalVisible(true);
  };

  const handleCancelDelete = () => {
    setProfileToDeleteId(null);
    setDeleteModalVisible(false);
  };

  const handleConfirmDelete = async () => {
    if (profileToDeleteId) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await Api.delete(`/perfil/${profileToDeleteId}`, config);

        const updatedProfiles = profiles.filter(
          (profile) => profile.id !== profileToDeleteId
        );
        setProfiles(updatedProfiles);

        setProfileToDeleteId(null);
        setDeleteModalVisible(false);
      } catch (error) {
        console.error("Erro ao excluir perfil:", error);
      }
    }
  };

  const handleEditProfile = (profileId: number) => {
    navigation.navigate("EditarPerfil", { id: profileId });
  };

  const handleProfilePress = (profileId: number) => {
    navigation.navigate("Card", { id: profileId });
  };

  return (
    <>
      <Header title="" />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonNovoPerfil}
          onPress={() => navigation.navigate("NovoPerfil")}
        >
          Criar novo perfil
        </TouchableOpacity>
        <FlatList
          data={profiles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => handleProfilePress(item.id)}
            >
              <Image source={{ uri: item.foto }} style={styles.profileImage} />
              <Text style={styles.profileText}>{item.nomeCompleto}</Text>
              <Text style={styles.profileText}>{item.email}</Text>
              <Text style={styles.profileText}>{item.nomeSocial || ""}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditProfile(item.id)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteProfile(item.id)}
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
        {deleteModalVisible && (
          <View style={styles.deleteModalContainer}>
            <View style={styles.deleteModal}>
              <Text style={styles.deleteModalText}>
                Deseja realmente excluir este perfil?
              </Text>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.buttonLabel}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelDelete}
              >
                <Text style={styles.buttonLabel}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default Home;

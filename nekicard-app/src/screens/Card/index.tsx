import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Api } from "../../services/Api";
import { styles } from "./styles";
import { RouteProp, useRoute } from "@react-navigation/native";
import Header from "../../components/header";

interface Profile {
  email: string;
  nomeCompleto: string;
  nomeSocial: string | null;
  dataNasc: string | null;
  foto: string | null;
  telefone: string | null;
  redesSociais: {
    linkedin: string | null;
    github: string | null;
    instagram: string | null;
    facebook: string | null;
  };
}

type CardRouteProp = RouteProp<{ Card: { id: number } }, "Card">;

interface CardProps {
  route: CardRouteProp;
}

const Card = () => {
  const route = useRoute();
  const id =
    route.params && typeof route.params === "object"
      ? (route.params as any).id
      : undefined;
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await Api.get<Profile>(`/perfil/${id}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    fetchProfile();
  }, [id]);

  const formatDataNasc = (dataNasc: string | null) => {
    if (dataNasc) {
      const date = new Date(dataNasc);
      const day = date.getDate() + 1;
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return "";
  };

  return (
    <>
      <Header title="" />
      <View style={styles.container}>
        {profile !== null && (
          <View style={styles.cardContainer}>
            {profile.foto !== null && (
              <Image
                source={{ uri: profile.foto }}
                style={styles.profileImage}
              />
            )}
            {profile.nomeCompleto && (
              <Text style={styles.cardText}>{profile.nomeCompleto}</Text>
            )}
            {profile.email && (
              <Text style={styles.cardText}>{profile.email}</Text>
            )}

            {profile.nomeSocial !== null && (
              <Text style={styles.cardText}>{profile.nomeSocial}</Text>
            )}
            {profile.dataNasc !== null && (
              <Text style={styles.cardText}>
                {formatDataNasc(profile.dataNasc)}
              </Text>
            )}

            {profile.telefone !== null && (
              <Text style={styles.cardText}>{profile.telefone}</Text>
            )}
            <Text style={styles.subheading}>Redes Sociais</Text>
            {profile.redesSociais.linkedin !== null && (
              <Text style={styles.cardText}>
                {profile.redesSociais.linkedin}
              </Text>
            )}
            {profile.redesSociais.github !== null && (
              <Text style={styles.cardText}>{profile.redesSociais.github}</Text>
            )}
            {profile.redesSociais.instagram !== null && (
              <Text style={styles.cardText}>
                {profile.redesSociais.instagram}
              </Text>
            )}
            {profile.redesSociais.facebook !== null && (
              <Text style={styles.cardText}>
                {profile.redesSociais.facebook}
              </Text>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default Card;

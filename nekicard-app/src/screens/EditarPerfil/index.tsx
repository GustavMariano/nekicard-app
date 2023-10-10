import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/header";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "../../services/Api";
import { styles } from "./styles";

const EditarPerfil = () => {
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    nomeCompleto: "",
    nomeSocial: "",
    dataNasc: "",
    foto: "",
    telefone: "",
    redesSociais: {
      linkedin: "",
      github: "",
      instagram: "",
      facebook: "",
    },
  });

  const formatDataNasc = (dataNasc: string) => {
    if (!dataNasc) {
      return "";
    }

    const date = new Date(dataNasc);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const navigation = useNavigation();
  const route = useRoute();
  const id =
    route.params && typeof route.params === "object"
      ? (route.params as any).id
      : undefined;

  const profileSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email é obrigatório")
      .matches(
        /(.*@neki-it.com.br|.*@neki.com.br)$/,
        "Email deve terminar com @neki-it.com.br ou @neki.com.br"
      ),
    nomeCompleto: Yup.string().required("Nome Completo é obrigatório"),
    dataNasc: Yup.string()
      .required("Data de Nascimento é obrigatória")
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        "Data de Nascimento deve estar no formato yyyy-mm-dd"
      ),
    foto: Yup.string().required("Foto é obrigatória"),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    Api.get(`/perfil/${id}`, config)
      .then((response) => {
        const formattedDataNasc = formatDataNasc(response.data.dataNasc);
        setFormData({
          ...response.data,
          dataNasc: formattedDataNasc,
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do perfil:", error);
      });
  }, [id]);

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleLinkedInChange = (value: string) => {
    setFormData({
      ...formData,
      redesSociais: {
        ...formData.redesSociais,
        linkedin: value,
      },
    });
  };

  const handleGitHubChange = (value: string) => {
    setFormData({
      ...formData,
      redesSociais: {
        ...formData.redesSociais,
        github: value,
      },
    });
  };

  const handleInstagramChange = (value: string) => {
    setFormData({
      ...formData,
      redesSociais: {
        ...formData.redesSociais,
        instagram: value,
      },
    });
  };

  const handleFacebookChange = (value: string) => {
    setFormData({
      ...formData,
      redesSociais: {
        ...formData.redesSociais,
        facebook: value,
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await profileSchema.validate(formData, { abortEarly: false });

        const response = await Api.put("/perfil", formData, config);

        console.log("Resposta da API:", response.data);

        navigation.goBack();
      } else {
        console.error("Token não encontrado no AsyncStorage");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setValidationErrors(validationErrors);
        console.error("Erros de validação:", validationErrors);
      } else {
        console.error("Erro ao enviar dados para a API:", error);
      }
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <>
      <Header title="" />
      <View style={styles.container}>
        <Text style={styles.heading}>Editar Perfil</Text>
        {validationErrors.email && (
          <Text style={styles.errorText}>{validationErrors.email}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => handleInputChange("email", text)}
          value={formData.email}
        />
        {validationErrors.nomeCompleto && (
          <Text style={styles.errorText}>{validationErrors.nomeCompleto}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          onChangeText={(text) => handleInputChange("nomeCompleto", text)}
          value={formData.nomeCompleto}
        />

        <TextInput
          style={styles.input}
          placeholder="Nome Social"
          placeholderTextColor="#323238"
          onChangeText={(text) => handleInputChange("nomeSocial", text)}
          value={formData.nomeSocial}
        />
        {validationErrors.dataNasc && (
          <Text style={styles.errorText}>{validationErrors.dataNasc}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento"
          onChangeText={(text) => handleInputChange("dataNasc", text)}
          value={formData.dataNasc}
        />

        {validationErrors.foto && (
          <Text style={styles.errorText}>{validationErrors.foto}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Foto"
          onChangeText={(text) => handleInputChange("foto", text)}
          value={formData.foto}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          onChangeText={(text) => handleInputChange("telefone", text)}
          value={formData.telefone}
        />
        <Text style={styles.subheading}>Redes Sociais</Text>
        <TextInput
          style={styles.input}
          placeholder="LinkedIn"
          placeholderTextColor="#323238"
          onChangeText={handleLinkedInChange}
          value={formData.redesSociais.linkedin}
        />
        <TextInput
          style={styles.input}
          placeholder="GitHub"
          placeholderTextColor="#323238"
          onChangeText={handleGitHubChange}
          value={formData.redesSociais.github}
        />
        <TextInput
          style={styles.input}
          placeholder="Instagram"
          placeholderTextColor="#323238"
          onChangeText={handleInstagramChange}
          value={formData.redesSociais.instagram}
        />
        <TextInput
          style={styles.input}
          placeholder="Facebook"
          placeholderTextColor="#323238"
          onChangeText={handleFacebookChange}
          value={formData.redesSociais.facebook}
        />
        <TouchableOpacity style={styles.touchableButton} onPress={handleSubmit}>
          <Text style={styles.touchableButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableCancelButton}
          onPress={handleCancel}
        >
          <Text style={styles.touchableButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditarPerfil;

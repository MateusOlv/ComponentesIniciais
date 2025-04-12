import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  Modal,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ListRenderItem,
  SectionListRenderItem,
  SectionListData
} from 'react-native';

// Tipos para os dados
type ItemFlat = {
  id: string;
  nome: string;
};

type SectionData = {
  title: string;
  data: string[];
};

// Componente principal
const ComponentesDemo: React.FC = () => {
  // Estados para os componentes
  const [textoInput, setTextoInput] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  
  // Dados para FlatList
  const [dadosFlat, setDadosFlat] = useState<ItemFlat[]>([
    { id: '1', nome: 'Item 1' },
    { id: '2', nome: 'Item 2' },
    { id: '3', nome: 'Item 3' },
    { id: '4', nome: 'Item 4' },
    { id: '5', nome: 'Item 5' },
  ]);
  
  // Dados para SectionList
  const [dadosSection, setDadosSection] = useState<SectionData[]>([
    {
      title: 'Frutas',
      data: ['Maçã', 'Banana', 'Laranja'],
    },
    {
      title: 'Vegetais',
      data: ['Cenoura', 'Brócolis', 'Espinafre'],
    },
  ]);

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Função para o botão
  const mostrarAlerta = (): void => {
    Alert.alert(
      'Alerta!',
      `Você digitou: ${textoInput}`,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
        { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
    );
  };

  // Renderizar item da FlatList
  const renderItemFlat: ListRenderItem<ItemFlat> = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemFlat}
      onPress={() => Alert.alert('Item pressionado', item.nome)}
    >
      <Text>{item.nome}</Text>
    </TouchableOpacity>
  );

  // Renderizar item da SectionList
  const renderItemSection: SectionListRenderItem<string> = ({ item }) => (
    <View style={styles.itemSection}>
      <Text>{item}</Text>
    </View>
  );

  // Renderizar cabeçalho da seção
  const renderSectionHeader = ({ section }: { section: SectionListData<string> }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* View e Text */}
        <View style={styles.box}>
          <Text style={styles.titulo}>Demonstração de Componentes</Text>
          <Text style={styles.subtitulo}>React Native com Expo (TypeScript)</Text>
        </View>

        {/* TextInput e Button */}
        <View style={styles.box}>
          <TextInput
            style={styles.input}
            onChangeText={setTextoInput}
            value={textoInput}
            placeholder="Digite algo..."
          />
          <Button
            title="Mostrar Alerta"
            onPress={mostrarAlerta}
            color="#6200ee"
          />
        </View>

        {/* Image */}
        <View style={styles.box}>
          <Text style={styles.componentTitle}>Image</Text>
          <Image
            style={styles.imagem}
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          />
        </View>

        {/* Modal */}
        <View style={styles.box}>
          <Button
            title="Abrir Modal"
            onPress={() => setModalVisible(true)}
            color="#6200ee"
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Este é um Modal!</Text>
                <Button
                  title="Fechar"
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </Modal>
        </View>

        {/* ActivityIndicator */}
        <View style={styles.box}>
          <Text style={styles.componentTitle}>ActivityIndicator</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#6200ee" />
          ) : (
            <Text>Carregamento completo!</Text>
          )}
        </View>

        {/* Switch */}
        <View style={[styles.box, styles.switchContainer]}>
          <Text>Ativar recurso:</Text>
          <Switch
            value={switchValue}
            onValueChange={setSwitchValue}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={switchValue ? "#6200ee" : "#f4f3f4"}
          />
          <Text>{switchValue ? 'Ativado' : 'Desativado'}</Text>
        </View>

        {/* FlatList */}
        <View style={styles.box}>
          <Text style={styles.componentTitle}>FlatList</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={dadosFlat}
              renderItem={renderItemFlat}
              keyExtractor={item => item.id}
              horizontal={true}
            />
          </View>
        </View>

        {/* SectionList */}
        <View style={styles.box}>
          <Text style={styles.componentTitle}>SectionList</Text>
          <View style={[styles.listContainer, { height: 180 }]}>
            <SectionList
              sections={dadosSection}
              keyExtractor={(item, index) => item + index}
              renderItem={renderItemSection}
              renderSectionHeader={renderSectionHeader}
            />
          </View>
        </View>

        {/* TouchableOpacity */}
        <View style={styles.box}>
          <Text style={styles.componentTitle}>TouchableOpacity</Text>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => Alert.alert('TouchableOpacity', 'Você pressionou o botão!')}
          >
            <Text style={styles.touchableText}>Pressione-me</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    padding: 16,
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
  },
  componentTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#6200ee',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  imagem: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listContainer: {
    height: 100,
  },
  itemFlat: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemSection: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 2,
  },
  sectionHeader: {
    backgroundColor: '#6200ee',
    padding: 10,
  },
  sectionHeaderText: {
    color: 'white',
    fontWeight: 'bold',
  },
  touchable: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  touchableText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ComponentesDemo;
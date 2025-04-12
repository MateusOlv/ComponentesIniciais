import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  const data = [
    { id: '1', name: 'Cristiano Ronaldo', imageUri: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg' },
    { id: '2', name: 'Lionel Messi', imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lionel-Messi-Argentina-2022-FIFA-World-Cup_sharpness.jpg/330px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_sharpness.jpg' },
    { id: '3', name: 'Neymar Jr.', imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Neymar_%28cropped%29.jpg/270px-Neymar_%28cropped%29.jpg' },
    { id: '4', name: 'Kylian Mbappé', imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Mbappe_celebration_after_scoring_penalty_vs_Real_Valladolid_Matchday_21_LaLiga_2025.jpg/285px-Mbappe_celebration_after_scoring_penalty_vs_Real_Valladolid_Matchday_21_LaLiga_2025.jpg' },
    { id: '5', name: 'Mohamed Salah', imageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Mohamed_Salah_2017.jpg/255px-Mohamed_Salah_2017.jpg' },
  ];

  const sections = [
    {
      title: 'Atacantes',
      data: ['Cristiano Ronaldo', 'Lionel Messi', 'Kylian Mbappé'],
    },
    {
      title: 'Meio-campistas',
      data: ['Neymar Jr.'],
    },
    {
      title: 'Pontas',
      data: ['Mohamed Salah'],
    },
  ];

  const handlePress = () => {
    Alert.alert('Siiuuuu!', 'Você clicou no botão do CR7!');
  };

  const handleOpenModal = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisible(true);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <TextInput placeholder="Digite aqui" style={styles.input} />

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Clique aqui</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
          <Text style={styles.buttonText}>Abrir Modal com Carregamento</Text>
        </TouchableOpacity>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>
            Modo {isEnabled ? 'Ativado' : 'Desativado'}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#6200ee' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <Image
          source={{ uri: data[0].imageUri }}
          style={styles.image}
        />

        {loading && (
          <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Siiuuuu! Você está vendo o Modal!</Text>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Fechar Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text style={styles.sectionHeader}>Jogadores</Text>
        {data.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Image
              source={{ uri: item.imageUri }}
              style={styles.playerImage}
              resizeMode="contain"
            />
          </View>
        ))}

        {sections.map((section, index) => (
          <View key={index}>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            {section.data.map((player, idx) => (
              <Text key={idx} style={styles.sectionItem}>{player}</Text>
            ))}
          </View>
        ))}

        <StatusBar barStyle="default" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  loader: {
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  itemContainer: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  itemText: {
    fontSize: 18,
  },
  playerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 10,
    backgroundColor: '#ddd',
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginTop: 20,
    width: '100%',
  },
  sectionItem: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingLeft: 20,
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  switchLabel: {
    fontSize: 16,
  },
});

import React from 'react'
import { ImageBackground, View, Text, StyleSheet, Dimensions, Image, Pressable, FlatList, SafeAreaView } from 'react-native';
import { Colors } from '../../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../../components/CustomInput';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const DATA = [
  {
    id: 1,
    name: 'Emma',
    description: 'love you bye :)',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
  },
  {
    id: 2,
    name: 'Taylor',
    description: 'Yes i igree',
    url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
  },
  {
    id: 3,
    name: 'Tiffany',
    description: 'What about you?',
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },

  {
    id: 4,
    name: 'Sara',
    description: 'Hi,how r you?',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
  },

  {
    id: 5,
    name: 'Emma',
    description: 'Not feeling good :(',
    url: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
  },
  {
    id: 6,
    name: 'Jane',
    description: 'It went well what about you.',
    url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }
];




export default function Chats({navigation}) {
  

  const renderItem = ({ item }) => (
    <Pressable style={styles.item} onPress={()=>navigation.navigate('chat-detail')}>
      <View style={styles.circularImageContainer}>
        <Image source={{ uri: item.url }} style={styles.circularImage} />
      </View>
       <View style={{flexDirection:'column'}}>
         <Text style={styles.itemName}>{item.name}</Text>
         <Text style={styles.itemDescription}>{item.description}</Text>
       </View>
    </Pressable>
  );

  return (
    <ImageBackground
      source={require('../assets/bg-img.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.top_container}>
        <Text style={styles.leftTop}>Welcome Asad!</Text>
        <Ionicons name="notifications-circle" size={24} color={'white'} />
      </View>

      <View style={styles.input_container}>
        <CustomInput Logo={<Ionicons name="search" size={24} color={Colors.txt_grey} />} placeholder={'search'} />
      </View>

      <SafeAreaView style={styles.safeContainer}>
        <Text style={styles.title}>Chats</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()} 
        />
      </SafeAreaView>


    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  top_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  leftTop: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.txt_white,
  },
  input_container: {
    width: width * 0.95,
    height: height * 0.1,
    margin: 10
  },
  title: {
    color: Colors.txt_white,
    fontSize: 20,
    paddingLeft: 10,
    marginBottom: 10,
  },
  itemName: {
    color: Colors.txt_white,
    fontSize: 17,
    marginLeft:10
  },
  itemDescription: {
    color: Colors.txt_grey,
    fontSize: 13,
    marginTop:5,
    marginLeft:10
  },
  safeContainer: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  circularImageContainer: {
    width: width * 0.15,
    height: height * 0.06,
    borderRadius: 50,
    overflow: 'hidden',
  },
  circularImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
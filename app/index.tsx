import { StyleSheet, Image, Pressable, ActivityIndicator, View } from 'react-native';
import { useState, useEffect} from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PaperProvider, Text, Button, TextInput } from 'react-native-paper';
import axios from 'axios';

import { scrapeProductData } from '@/utils/scrape';

export default function EnterText() {
  const navigation = useNavigation<any>();
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const addParam = (param: string) => {
    setSelected((prevSelected) => [...prevSelected, param]);
  };

  const handleScrape = (urls : string[]) => {
    console.log(urls, " right before")
    navigation.navigate('displayResults', {urls: urls, text: text})
  };

  const apiKey = 'AIzaSyAJoqZjTaabNOYUR3HVGaeTHD_-jjzadCg';
  const cx = 'c6bd6833b44bd4211';

  const getUrls = async (input: string) => {
    try {
      const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          key: apiKey,
          cx: cx,
          q: input,
        },
      });
      const searchResults = response.data.items || [];
      const urls = searchResults.map((item: { link: string }) => item.link).slice(0, 3);
      
      await handleScrape(urls); 
      setDone(true);
    } catch (error) {
      console.error('Invalid Input. Please Try Again');
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);  // Show loading page
    setDone(false);    // Reset done state for new search
    await getUrls(text);  // Wait for getUrls to finish
  };

  return (
    // <PaperProvider>
    <ThemedView style={styles.allContainer}>
      <Text variant="titleLarge">Search product by name</Text>
      <TextInput
        mode="outlined"
        placeholder="Type something..."
        value={text}
        onChangeText={(value) => setText(value)}
        style={styles.textInput}
      />
      {loading ? (
        <ThemedText>Loading...</ThemedText>) : (
          <Button mode="contained" onPress={handleSubmit}>Search</Button>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    flex: 1, // Makes the container take up the entire screen
    top: 200,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  textInput: {
    marginTop: 20,
    marginBottom: 20,
    height: 40, // Adjust the height to reduce the vertical size
    width: "80%", // Set the width to make it responsive
    fontSize: 16, // Adjust text size
    paddingHorizontal: 10, // Add padding inside the input
    paddingVertical: 10,
    backgroundColor: "#fff", // Optional: change background color
  },
  output: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#000',
  },
  buttonsArea: {
    width: '80%',
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    padding: 20,
  },
  button: {
    width: '60%',
    paddingVertical: 12, // Vertical padding for size
    paddingHorizontal: 20, // Horizontal padding for size
    marginVertical: 10, // Space between buttons
    borderRadius: 8, // Rounded corners
    alignItems: "center", // Center the text inside
    justifyContent: "center", // Center the text inside
    elevation: 3, // Add shadow on Android
    shadowColor: "#000", // Shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow positioning for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 2, // Shadow radius for iOS
  },
  buttonText: {
    color: "#FFFFFF", // White text
    fontSize: 16, // Text size
    fontWeight: "bold", // Bold text
  },
});
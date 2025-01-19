import { StyleSheet, Image, Pressable, TextInput, Button, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PaperProvider } from 'react-native-paper';
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
    navigation.navigate('displayResults', {urls: urls})
  };

  // const handleScrape = (url: string[], params: string[]) => {
  //   scrapeProductData(url, setProductData); // Pass setProductData to update state after scraping
  // };


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
      console.log(urls);
      await handleScrape(urls); 
      setDone(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
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
      <ThemedText type="title">Search product by name</ThemedText>
      <TextInput
        placeholder="Type something..."
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <ThemedText style={styles.output}>You typed: {text}</ThemedText>
      {loading ? (
        <ThemedText>Loading...</ThemedText>) : (
        <Button title="Search" onPress={handleSubmit} />
      )}

      <ThemedText type="title">Select Search Parameters</ThemedText>
      <ThemedView style={styles.buttonsArea}>
        
      {/* <Pressable style={({ pressed }) => [styles.button,
        { backgroundColor: pressed ? '#0056b3' : '#007BFF' },]} onPress={() => addParam("price")}>
          <ThemedText style={styles.buttonText}>Price</ThemedText>
      </Pressable>
        <Pressable style={({ pressed }) => [styles.button,
        { backgroundColor: pressed ? '#0056b3' : '#007BFF' },]} onPress={() => addParam("description")}>
          <ThemedText style={styles.buttonText}>Description</ThemedText>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.button,
        { backgroundColor: pressed ? '#0056b3' : '#007BFF' },]} onPress={() => addParam("sustainability")}>
          <ThemedText style={styles.buttonText}>Sustainability</ThemedText>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.button,
        { backgroundColor: pressed ? '#0056b3' : '#007BFF' },]} onPress={() => addParam("quality")}>
          <ThemedText style={styles.buttonText}>Quality</ThemedText>
        </Pressable> */}
      </ThemedView>

    </ThemedView>
    // {/* </PaperProvider> */}
  );
}

const styles = StyleSheet.create({
  allContainer: {
    flex: 1, // Makes the container take up the entire screen
    top: 200,
    alignItems: 'center', // Centers horizontally
    backgroundColor: '#f0f0f0',
  },
  input: {
    marginTop: 20,
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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

import { ScrollView, Text, View, Image, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useDeferredValue } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from 'react-native';

import { scrapeProductData } from '@/utils/scrape';
import { RootStackParamList } from '@/utils/types';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import axios from 'axios';

export default function DisplayResults() {
    const route: any = useRoute();
    console.log(route, " this is the line");
    const { urls, text } = route.params;

    const apiKey = 'AIzaSyBgQC6RQaSIfTC0kVjoKi01tGSev228Pik';
    const cx = 'e20842139757042ae';

    const [imageUri, setImageUri] = useState<string | null>(null);

    const [productData, setProductData] = useState({
        product_price: 0,
        product_description: '',
        product_sustainability: '',
        product_quality: '',
        product_decision: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const getImage = async (input: string) => {
        try {
            const imageResponse = await axios.get('https://www.googleapis.com/customsearch/v1', {
                params: {
                    key: apiKey,
                    cx: cx,
                    q: input,
                    searchType: 'image',
                    num: 1,
                },
            });
            const imageUrl = imageResponse.data.items?.[0]?.link;
            if (imageUrl) {
                setImageUri(imageUrl);
            } else {
                console.error('No image found for the query');
            }
        } catch (error) {
            console.error('error fetching image', error);
        }

    }

    useEffect(() => {
        console.log('Component loaded running fn');
        getImage(text)
        scrapeProductData(urls[0], setProductData, setIsLoading);
    }, [])

    if (isLoading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        );
      } else
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.allContainer}>
            <View>
                {imageUri && (
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                )}
                <ThemedText style={styles.text}>
                    <Text style={styles.subtext}>Price:</Text> ${productData.product_price}
                </ThemedText>
                <ThemedText style={styles.text}>
                    <Text style={styles.subtext}>Description:</Text> {productData.product_description}
                </ThemedText>
                <ThemedText style={styles.text}>
                    <Text style={styles.subtext}>Sustainability:</Text> {productData.product_sustainability}
                </ThemedText>
                <ThemedText style={styles.text}>
                    <Text style={styles.subtext}>Quality:</Text> {productData.product_quality}
                </ThemedText>
                <ThemedText style={styles.text}>
                    <Text style={styles.subtext}>Should I buy it?</Text> {productData.product_decision}
                </ThemedText>
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    allContainer: {
        flex: 1, // Makes the container take up the entire screen
        alignItems: 'center', // Centers horizontally
        backgroundColor: '#f0f0f0',
        margin: 50,
    },
    text: {
        padding: 10
    },
    subtext: {
        fontWeight: 'bold'
    },
    image: {
        width: 300,
        height: 300,
        marginVertical: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingVertical: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
      },
      loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
      },
      contentText: {
        fontSize: 20,
        fontWeight: 'bold',
      },
});

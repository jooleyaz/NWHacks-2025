import { Text, View, Image, StyleSheet, Platform } from 'react-native';
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

type DisplayResultsRouteProp = RouteProp<RootStackParamList, 'DisplayResults'>;

export default function DisplayResults() {
    const route: any = useRoute();
    console.log(route, " this is the line");
    const { urls } = route.params;

    const [productData, setProductData] = useState({
        product_price: 0,
        product_description: '',
        product_sustainability: '',
        product_quality: '',
    });

    const handleScrape = (urls: string) => {
        // for (const url of urls) {
        //     scrapeProductData(url, setProductData); // Pass setProductData to update state after scraping
        // }
        scrapeProductData(urls[0], setProductData); // Pass setProductData to update state after scraping
    };

    useEffect(() => {
        console.log('Component loaded running fn');
        scrapeProductData(urls[0], setProductData);
    }, [])

    return (
        <View style={styles.allContainer}>
            <View>
                <Button title="Your information is loading!"
                    onPress={() => handleScrape(urls)}
                />
                <ThemedText style={styles.text}>
                    <Text style={styles.subtext}>Price:</Text> {productData.product_price}
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
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    allContainer: {
        flex: 1, // Makes the container take up the entire screen
        top: 50,
        alignItems: 'center', // Centers horizontally
        backgroundColor: '#f0f0f0',
    },
    text: {
        padding: 10
    },
    subtext: {
        fontWeight: 'bold'
    }
});

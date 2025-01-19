import { View, Image, StyleSheet, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from 'react-native';

import {scrapeProductData} from '@/utils/scrape';
import { RootStackParamList } from '@/utils/types';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

type DisplayResultsRouteProp = RouteProp<RootStackParamList, 'DisplayResults'>;

export default function DisplayResults() {
    const route:any = useRoute();
    console.log(route, " this is the line");
    const {urls} = route.params;

    const [productData, setProductData] = useState({
        product_price: 0,
        product_description: '',
        product_sustainability: '',
        product_quality: '',
    });

    const handleScrape = (url: string[]) => {
        scrapeProductData(url, setProductData); // Pass setProductData to update state after scraping
    };

    return (
        <View>
            <View>
                <ThemedText type="title">Julia's testing zone!</ThemedText>
                <HelloWave />
            </View>
            <View>
                <ThemedText>
                    The following stats will be displayed about a product:
                    - price (unbiased, suitability-based on customer data, comparison-based on market average)
                    - description (unbiased)
                    - quality (sentiment analysis-webscraped user reviews, longevity-descriptions, weight, stats)
                    - sustainability/ethics (where manufactured, any comments, etc.)
                    - final decision (should you buy this, based on your info?)
                </ThemedText>
                <Button title="Scrape"
                    onPress={() => handleScrape([
                        urls
                    ])}
                />
                    <ThemedText>
                        Price: {productData.product_price}
                    </ThemedText>
                    <ThemedText>
                        Description: {productData.product_description}
                    </ThemedText>
                    <ThemedText>
                        Sustainability: {productData.product_sustainability}
                    </ThemedText>
                    <ThemedText>
                        Quality: {productData.product_quality}
                    </ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
});

import { Image, StyleSheet, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import axios from 'axios';

export default function HomeScreen() {
  const scrapeProductData = async (url:string) => {
    try {
      const response = await axios.post('http://206.87.193.193:3000/scrape', { url });
      console.log(response.data);
    } catch (error) {
      console.error("Scraping failed:", error);
    }
  };

  //scrapeProductData("https://www.amazon.ca/Shisedio-Fino-Premium-Touch-Hair/dp/B00U37A82K/ref=sr_1_5?crid=3H1XORLQISDOZ&dib=eyJ2IjoiMSJ9.JNNMbhq-_QqzTNcQheAU2oASpwmXMBOyqnLAOjLNTlh-9NKVA3gKklkzRmrd-71i3l0zN3q184kwERI57btQ79Yg-nGl6zUvG6r1Bdck_wOuNQ-tVEzHP-nmdr0qOchm942U8PZMLDKr8x9JKH8TASjJ4uGed6BjFpPAYb8AkrF11b3YiRwd30SlTkgJtb109QOx0Uk6LKb8eXsawI8PEw6DqcKTwFX5TV2mBH8BGJrgPsHwMoJwAsrMVMp-ZriqfB9Cm6sZWtK_pQjZknWAAF7Q2319ZXMbHo_IBv5UwsQevEPuF-7BG6bpkNwjTFaj6iVyrAwv8I_YtPb8IJ0ruiGztOdRm5TjQzbmG_rRcPZLZ_EGAjY46Yh39PcvXSfNlHUyL9XRgOAV6sK5vHQrA9AgcB-z3G7Rx6LL2Ew5dibHsN-BPf7Tykao3_lnVD1a.kXHKwim8q4ZE7mVo-WILHFfUdnBUIBt94Dz3HGbw-1Q&dib_tag=se&keywords=shiseido&qid=1737241633&sprefix=shiseido%2Caps%2C169&sr=8-5")

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Julia's testing zone!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
        <ThemedText>
          The following stats will be displayed about a product:
          - price (unbiased, suitability-based on customer data, comparison-based on market average)
          - description (unbiased)
          - quality (sentiment analysis-webscraped user reviews, longevity-descriptions, weight, stats)
          - sustainability/ethics (where manufactured, any comments, etc.)
          - final decision (should you buy this, based on your info?)
        </ThemedText>

      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

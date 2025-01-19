import { StyleSheet, Image, Platform, Pressable } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function NewSearch() {
  return (
    <ThemedView style={styles.allContainer}>
    <ThemedText type="title">New Search</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    flex: 1, // Makes the container take up the entire screen
    top: 200,
    alignItems: 'center', // Centers horizontally
    backgroundColor: '#f0f0f0',
  },
});

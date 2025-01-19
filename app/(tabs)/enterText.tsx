import { StyleSheet, Image, Platform, Pressable, TextInput } from 'react-native';
import { useState } from 'react';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function EnterText() {
    const [text, setText] = useState('');

    return (
        <ThemedView style={styles.allContainer}>
        <ThemedText type="title">Search product by name</ThemedText>
        <TextInput
            style={styles.input}
            placeholder="Type something..."
            value={text}
            onChangeText={(value) => setText(value)}
        />
        <ThemedText style={styles.output}>You typed: {text}</ThemedText>
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
});

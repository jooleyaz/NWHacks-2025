import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "react-native/Libraries/Components/Button";
import { StyleSheet, Pressable } from "react-native";

export default function SelectParams() {
  const [selected, setSelected] = useState<string[]>([]);

  const addParam = (param: string) => {
    setSelected((prevSelected) => [...prevSelected, param]);
  };

  return (
    <ThemedView style={styles.page}>
      <ThemedView style={styles.buttons}>
        <Button title="Price" onPress={() => addParam("price")} />
        <Button title="Description" onPress={() => addParam("description")} />
        <Button title="Sustainability" onPress={() => addParam("sustainability")} />
        <Button title="Quality" onPress={() => addParam("quality")} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {},
  buttons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});


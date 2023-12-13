import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { Text, TouchableOpacity, View } from "..";
import { XMarkIcon } from "../../svg/icons";

interface Props {
  onCancel: () => void;
}

export const Search: React.FC<Props> = ({ onCancel }) => {
  const [searchText, setSearch] = useState("");
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 500);

    return () => {
      clearTimeout(focusTimeout);
    };
  }, []); // Empty dependency array ensures the effect runs

  const handleClear = () => {
    setSearch("");
  };

  return (
    <View
      className="w-full flex flex-row justify-between items-center"
      style={styles.container}
    >
      <View
        className="flex flex-row items-center justify-center"
        style={{ gap: 10 }}
      >
        <Pressable onPress={onCancel}>
          <XMarkIcon />
        </Pressable>
        <TextInput
          style={styles.input}
          ref={inputRef}
          placeholder="Search feelings"
          placeholderTextColor="#9d9d9d"
          value={searchText}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <TouchableOpacity onPress={handleClear}>
        <Text style={{ color: "#9d9d9d" }}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    borderColor: "#9d9d9d",
    borderWidth: 0.5,
    padding: 10
  },
  input: {
    color: "#fff" // Change the text color as needed
  }
});

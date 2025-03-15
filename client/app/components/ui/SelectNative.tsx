
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import { Svg, Path } from "react-native-svg";

interface SelectNativeProps {
  options: { label: string; value: string }[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const SelectNative: React.FC<SelectNativeProps> = ({
  options,
  defaultValue,
  onValueChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0]?.value);
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find(option => option.value === selectedValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    if (onValueChange) {
      onValueChange(value);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectText}>{selectedOption?.label}</Text>
        <View style={styles.iconContainer}>
          <Svg width={12} height={8} viewBox="0 0 12 8" fill="none">
            <Path
              d="M1.41 0.59L6 5.17L10.59 0.59L12 2L6 8L0 2L1.41 0.59Z"
              fill="#042558"
            />
          </Svg>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    selectedValue === item.value && styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedValue === item.value && styles.selectedOptionText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 131,
  },
  selectButton: {
    height: 29,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 10,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectText: {
    fontSize: 14,
    color: "#042558",
  },
  iconContainer: {
    position: "absolute",
    right: 8,
    top: "50%",
    marginTop: -4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    maxHeight: "60%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  selectedOption: {
    backgroundColor: "#F5F9FF",
  },
  optionText: {
    fontSize: 16,
    color: "#042558",
  },
  selectedOptionText: {
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#042558",
    fontWeight: "bold",
  },
});
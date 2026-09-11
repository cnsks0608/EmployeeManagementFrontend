import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Dropdown as ElementDropdown } from 'react-native-element-dropdown';


type DropdownItem = {
  label: string;
  value: number | string | undefined; // undefined -> tüm departmanlar gibi
};

type DropdownProps = {
  data: DropdownItem[];  // tüm seçeneklerin listesi 
  value: number | string | undefined;
  onChange: (value: number | string | undefined) => void;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  searchable?: boolean;
  maxHeight?: number; 
};

export function Dropdown({ data, value, onChange, placeholder, style, searchable = true, maxHeight }: DropdownProps) {
  return (
    <ElementDropdown
      style={[styles.dropdown, style]}
      placeholderStyle={styles.placeholderText}
      selectedTextStyle={styles.selectedText}
      inputSearchStyle={styles.searchInput}
      data={data}
      search={searchable}
      searchPlaceholder="Ara..."
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={(item) => onChange(item.value)}
      maxHeight={maxHeight}
      renderRightIcon={() =>
        value !== undefined ? (
          <Pressable onPress={() => onChange(undefined)}>
            <Ionicons name="close-circle" size={18} color="#999" />
          </Pressable>
        ) : (
          <Ionicons name="chevron-down" size={18} color="#999" />
        )
      }
    />
    // searchPlaceholder -> dropdown açıkken görünen, placeholder -> dropdown kapalıyken görünen
  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  placeholderText: {
    fontSize: 14,
    color: '#999',
  },
  selectedText: {
    fontSize: 14,
    color: '#333',
  },
  searchInput: {
    borderRadius: 6,
    fontSize: 14,
  },
});
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleProp, StyleSheet, Text, TextInput, ViewStyle } from 'react-native';
import { Dropdown as ElementDropdown } from 'react-native-element-dropdown';

type DropdownItem = {
  label: string;
  value: number | string | undefined;
};

type DropdownProps = {
  data: DropdownItem[];
  value: number | string | undefined;
  onChange: (value: number | string | undefined) => void;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  searchable?: boolean;
  maxHeight?: number;
  listHeaderLabel?: string;
};

export function Dropdown({ data, value, onChange, placeholder, style, searchable = true, maxHeight, listHeaderLabel }: DropdownProps) {
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
      renderInputSearch={(onSearch) => (
        <TextInput
          style={styles.searchInput}
          placeholder="Ara..."
          autoCapitalize="none"
          onChangeText={onSearch}
        />
      )}
      flatListProps={
        listHeaderLabel
          ? {
            ListHeaderComponent: () => (
              <Text style={styles.listHeader}>{listHeaderLabel}</Text>
            ),
          }
          : undefined
      }
    />
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    margin: 8,
  },
  listHeader: {
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f5f5f5',
  },
});
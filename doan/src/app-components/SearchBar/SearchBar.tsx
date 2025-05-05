import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '@assets/colors/global_colors';
import sizes from '@assets/styles/sizes';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

interface SearchBarProps {
  recieveText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ recieveText }) => {
  const [text, setText] = useState<string>('');
  const [debouncedText] = useDebounce(text, 500);

  useEffect(() => {
    if(debouncedText){
      recieveText(debouncedText);
    }
  }, [debouncedText]);

  return (
    <View>
      <View style={[styles.searchContainer]}>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconTouch}>
            <FontAwesome name="microphone" size={sizes._24sdp} color={colors.black} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Tìm kiếm"
            value={text}
            onChangeText={setText}
            style={styles.input}
          />
        </View>

        {text !== '' && (
          <View style={styles.clearIconContainer}>
            <TouchableOpacity onPress={() => setText('')} style={styles.clearButton}>
              <AntDesign name="closecircle" size={sizes._23sdp} color={colors.text_gray} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: 8,
    padding: 5,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: '10%',
  },
  iconTouch: {
    padding: 5,
  },
  inputContainer: {
    width: '78%',
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  clearIconContainer: {
    width: '12%',
    position: 'relative',
  },
  clearButton: {
    position: 'absolute',
    top: -12,
    right: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;

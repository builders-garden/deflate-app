import { TextInput, View } from "react-native";

type DeflateInputProps = {
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
};

export const DeflateInput = ({
  placeholder,
  value,
  onValueChange,
}: DeflateInputProps) => {
  return (
    <View className="bg-[#556FC5]/50 rounded-xl h-[64px] w-full px-5 py-[10px]">
      <TextInput
        className="h-full text-[24px] text-white placeholder:text-[#B6BCF9]"
        placeholder={placeholder}
        value={value}
        onChangeText={(e) => onValueChange(e)}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        // caretHidden={true}
      />
    </View>
  );
};

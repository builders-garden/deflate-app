import { View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { DeflateText } from "./deflate-text";

type DeflateSelectProps = {
  data: any[];
  placeholder?: string;
  onValueChange: (value: { title: string; value: any }) => void;
};

export const DeflateSelect = ({
  data,
  placeholder,
  onValueChange,
}: DeflateSelectProps) => {
  return (
    <SelectDropdown
      data={data}
      onSelect={(selectedItem, index) => {
        onValueChange(selectedItem);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View className="bg-[#556FC5]/50 rounded-xl h-[64px] w-full px-5 py-[10px] flex justify-center">
            <DeflateText
              text={selectedItem ? selectedItem.title : placeholder}
              className={
                selectedItem
                  ? "text-[24px] text-white"
                  : "text-[24px] text-[#B6BCF9]"
              }
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View className="bg-[#556FC5] rounded-xl h-[64px] w-full px-5 py-[10px] flex justify-center mb-2">
            <DeflateText
              text={item.title}
              className="text-[24px] text-[#B6BCF9]"
            />
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={{
        marginBottom: 20,
        padding: 8,
        borderRadius: 20,
        backgroundColor: "#B6BCF9",
      }}
      //   dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

import { TouchableOpacity } from "react-native";
import { DeflateText } from "./deflate-text";

type DeflateButtonProps = {
  onPress?: (...args: any[]) => void;
  text: string;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
};

export const DeflateButton = ({
  onPress,
  text,
  className,
  textClassName,
  disabled = false,
}: DeflateButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`bg-[#3B2086] disabled:bg-[#3B2086]/50 rounded-full px-8 py-[10px] flex flex-row items-center justify-center ${className}`}
    >
      <DeflateText
        text={text}
        className={`text-white text-[16px] ${textClassName}`}
        font="BG_Bold"
      />
    </TouchableOpacity>
  );
};

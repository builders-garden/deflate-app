import { Text } from "react-native";

type DeflateTextProps = {
  text: string;
  font?: string;
  className?: string;
};

export const DeflateText = ({
  text,
  font = "BG_Regular",
  className,
}: DeflateTextProps) => {
  return (
    <Text
      style={{
        fontFamily: font,
      }}
      className={`tracking-[-1px] ${className}`}
    >
      {text}
    </Text>
  );
};

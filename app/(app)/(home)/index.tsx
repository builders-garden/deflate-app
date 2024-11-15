import { usePrivy } from "@privy-io/expo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = usePrivy();

  return (
    <>
      <SafeAreaView className="bg-[#B6BCF9] h-screen flex flex-col items-center justify-between px-[32px]"></SafeAreaView>
    </>
  );
}

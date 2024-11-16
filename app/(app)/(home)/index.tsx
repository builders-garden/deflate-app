import { DeflateText } from "@/components/deflate-text";
import { usePrivy } from "@privy-io/expo";
import { Redirect, router } from "expo-router";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-gifted-charts";
import { useState } from "react";

const lineData = [
  { value: 0 },
  { value: 10 },
  { value: 8 },
  { value: 58 },
  { value: 56 },
  { value: 78 },
  { value: 74 },
  { value: 98 },
];

const chartOptions = ["4h", "24h", "3d", "7d", "30d", "All"];

export default function HomeScreen() {
  const { user, isReady } = usePrivy();
  const [chartData, setChartData] = useState<any[]>(lineData);
  const [chartRange, setChartRange] = useState<string>(chartOptions[1]);

  // useEffect(() => {
  //   // shuffle chart data
  //   const shuffledData = lineData.map((data) => ({
  //     value: Math.floor(Math.random() * 10),
  //   }));
  //   setChartData(shuffledData);
  // }, [chartRange]);

  if (!user && isReady) {
    return <Redirect href={"/"} />;
  }

  return (
    <>
      <SafeAreaView className="bg-[#B6BCF9] h-screen flex flex-col justify-between">
        <TouchableOpacity
          className="px-[24px]"
          onPress={() => router.push("/(app)/(home)/profile")}
        >
          <View className="rounded-full h-[64px] w-[64px] bg-[#556FC5]/50 flex items-center justify-center">
            <DeflateText
              text={user!
                .custom_metadata!.username.toString()
                .charAt(0)
                .toUpperCase()}
              className="text-[36px] text-[#3B2086]"
              font="BG_Bold"
            />
          </View>
        </TouchableOpacity>
        <View className="flex flex-col items-center justify-center">
          <DeflateText
            text="My wallet"
            className="text-[24px] text-[#3B2086]"
          />
          <DeflateText
            text="$46,490"
            className="text-[64px] text-[#3B2086]"
            font="BG_Bold"
          />
          <View className="bg-white h-[32px] rounded-full flex items-center justify-center w-[100px]">
            <DeflateText
              text="+54%"
              className="text-emerald-500 text-[24px]"
              font="BG_Bold"
            />
          </View>
          <View className="flex flex-row items-center justify-center gap-x-8 mt-4">
            <View className="flex flex-col items-center justify-center">
              <View className="rounded-full flex items-center justify-center">
                <TouchableOpacity>
                  <Image
                    source={require("@/assets/images/deposit.png")}
                    height={54}
                    width={54}
                    className="h-[54px] w-[54px]"
                  />
                </TouchableOpacity>
                <DeflateText
                  text="Deposit"
                  className="text-[16px] text-[#3B2086] tracking-normal"
                  font="BG_Medium"
                />
              </View>
            </View>
            <View className="flex flex-col items-center justify-center">
              <View className="rounded-full flex items-center justify-center">
                <TouchableOpacity>
                  <Image
                    source={require("@/assets/images/withdraw.png")}
                    height={54}
                    width={54}
                    className="h-[54px] w-[54px]"
                  />
                </TouchableOpacity>
                <DeflateText
                  text="Withdraw"
                  className="text-[16px] text-[#3B2086] tracking-normal"
                  font="BG_Medium"
                />
              </View>
            </View>
          </View>
          <View className="w-full py-4">
            <LineChart
              curved
              data={chartData}
              height={150}
              initialSpacing={0}
              yAxisSide={1}
              yAxisIndicesWidth={0}
              yAxisLabelWidth={0}
              isAnimated
              animateOnDataChange
              animationDuration={1000}
              onDataChangeAnimationDuration={300}
              adjustToWidth
              parentWidth={Dimensions.get("screen").width}
              showVerticalLines={false}
              showReferenceLine1={false}
              thickness={5}
              color1="#3B2086"
              textColor1="#3B2086"
              hideDataPoints
              dataPointsColor1="#3B2086"
              startFillColor1="#3B2086"
              startOpacity={1}
              hideAxesAndRules
            />
            <View className="flex flex-row justify-evenly gap-x-4 w-full mt-4 px-4">
              {chartOptions.map((option) => (
                <TouchableOpacity
                  onPress={() => setChartRange(option)}
                  className={
                    chartRange === option
                      ? "flex flex-col items-center justify-center p-[10px] bg-[#556FC5]/50 rounded-xl w-[50px]"
                      : "flex flex-col items-center justify-center p-[10px] w-[50px]"
                  }
                  key={option}
                >
                  <DeflateText
                    text={option}
                    font="BG_Medium"
                    className="text-[#3B2086] text-[16px]"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View className="px-[24px]">
          <View className="bg-white rounded-[20px] w-full h-[86px] flex flex-row items-center px-5">
            <Text className="text-[48px] mr-3">😁</Text>
            <View className="flex flex-col">
              <DeflateText
                text="Safe mode"
                className="text-[20px]"
                font="BG_Bold"
              />
              <DeflateText
                text="Low-risk saving strategy"
                className="text-[12px] text-[#8F8F91] tracking-normal"
                font="BG_Medium"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

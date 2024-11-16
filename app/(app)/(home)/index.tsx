import { DeflateText } from "@/components/deflate-text";
import { useEmbeddedWallet, usePrivy } from "@privy-io/expo";
import Privy, { InMemoryCache } from "@privy-io/js-sdk-core";
import { Redirect, router } from "expo-router";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-gifted-charts";
import { useCallback, useEffect, useRef, useState } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { DeflateBackdrop } from "@/components/deflate-backdrop";
import { base } from "viem/chains";
import { createWalletClient, custom } from "viem";
import * as WebBrowser from "expo-web-browser";
import { usePortfolio } from "@/hooks/usePortfolio";
import { ONE_INCH_TIMERANGE } from "@/lib/api/portfolio";
import { useDeposit } from "@/hooks/useDeposit";
import { initializeBiconomySmartAccount } from "@/lib/biconomy";
import { useBiconomySmartAccount } from "@/hooks/useBiconomySmartAccount";
import { useUpdateUser } from "@/hooks/useUpdateUser";

const lineData = [
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
  { value: 0 },
];

const chartOptions = ["1d", "1w", "1m", "1y"];

export default function HomeScreen() {
  const { user, isReady, getAccessToken } = usePrivy();
  const { updateUser } = useUpdateUser();
  const wallet = useEmbeddedWallet();
  const [isWalletInitialized, setIsWalletInitialized] = useState(false);
  const { fetchSmartAccount, smartAccount } = useBiconomySmartAccount();
  const { deposit } = useDeposit();

  const [chartData, setChartData] = useState<any[]>(lineData);
  const [chartRange, setChartRange] = useState<string>("1w");
  const {
    data: portfolio,
    refetch,
    isLoading,
  } = usePortfolio(ONE_INCH_TIMERANGE["1week"]);

  useEffect(() => {
    if (user && wallet?.account?.address && !isWalletInitialized) {
      setIsWalletInitialized(true);
      fetchSmartAccount().then(async (account) => {
        await updateUser({ smartAccountAddress: account?.account?.address });
      });
    }
  }, [user, wallet, isWalletInitialized]);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const openDeposit = async () => {
    try {
      const userWalletAddress = wallet?.account?.address;
      const privy = new Privy({
        appId: process.env.EXPO_PUBLIC_PRIVY_APP_ID!,
        storage: new InMemoryCache(),
      });
      const chainId = `eip155:8453`;

      const { message } = await privy.auth.siwe.init(
        {
          chainId,
          address: userWalletAddress!,
        },
        `${"deflate.builders.garden"}`,
        "https://deflate.builders.garden"
      );

      const walletClient = createWalletClient({
        chain: base,
        transport: custom(await wallet.getProvider()),
      });

      const signature = await walletClient.signMessage({
        message,
        account: userWalletAddress as `0x${string}`,
      });

      const redirectUrl = new URL("https://deflate.builders.garden");
      redirectUrl.searchParams.append("signature", signature as string);
      redirectUrl.searchParams.append("message", message as string);
      redirectUrl.searchParams.append("address", userWalletAddress as string);

      console.log(`opening ${redirectUrl}`);
      const result = await WebBrowser.openBrowserAsync(redirectUrl.toString());

      // if (result.type === WebBrowser.WebBrowserResultType.CANCEL) {
      //   await deposit({ amount: 5 });
      // }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      if (chartRange === "1d") {
        refetch(ONE_INCH_TIMERANGE["1day"]);
      } else if (chartRange === "1w") {
        refetch(ONE_INCH_TIMERANGE["1week"]);
      } else if (chartRange === "1m") {
        refetch(ONE_INCH_TIMERANGE["1month"]);
      } else {
        refetch(ONE_INCH_TIMERANGE["1year"]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [chartRange]);

  if (!user && isReady) {
    return <Redirect href={"/"} />;
  }

  return (
    <>
      <SafeAreaView
        className="bg-[#B6BCF9] h-screen flex flex-col justify-between"
        onTouchEnd={() => bottomSheetRef?.current?.dismiss()}
      >
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
            text={`$${portfolio?.currentValue.toFixed(2) || "0.00"}`}
            className="text-[64px] text-[#3B2086] text-center"
            font="BG_Bold"
          />
          {portfolio?.profitAndLoss?.roi && portfolio.profitAndLoss.roi > 0 ? (
            <View className="bg-white h-[32px] rounded-full flex items-center justify-center w-[100px]">
              <DeflateText
                text={`${(portfolio.profitAndLoss.roi * 100).toFixed(2)}%`}
                className="text-emerald-500 text-[24px]"
                font="BG_Bold"
              />
            </View>
          ) : portfolio?.profitAndLoss?.roi &&
            portfolio?.profitAndLoss?.roi < 0 ? (
            <View className="bg-white h-[32px] rounded-full flex items-center justify-center w-[100px]">
              <DeflateText
                text={`${(portfolio?.profitAndLoss?.roi * 100).toFixed(2)}%`}
                className="text-red-500 text-[24px]"
                font="BG_Bold"
              />
            </View>
          ) : (
            <></>
          )}
          <View className="flex flex-row items-center justify-center gap-x-8 mt-4">
            <View className="flex flex-col items-center justify-center">
              <View className="rounded-full flex items-center justify-center">
                <TouchableOpacity onPress={() => openDeposit()}>
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
          {portfolio?.valueChart && (
            <View className="w-full py-4">
              <LineChart
                curved
                data={portfolio.valueChart.map((item) => ({
                  value: item.value_usd,
                }))}
                areaChart
                height={200}
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
                endFillColor1="#3B2086"
                startOpacity={1}
                endOpacity1={0.7}
                hideAxesAndRules
              />
              <View className="flex flex-row justify-evenly gap-x-4 w-full px-4">
                {chartOptions.map((option) => (
                  <TouchableOpacity
                    onPress={() => {
                      setChartRange(option);
                      refetchValueChart(
                        option === "1d"
                          ? ONE_INCH_TIMERANGE["1d"]
                          : option === "1w"
                          ? ONE_INCH_TIMERANGE["1week"]
                          : option === "1m"
                          ? ONE_INCH_TIMERANGE["1month"]
                          : ONE_INCH_TIMERANGE["1year"]
                      );
                    }}
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
          )}
        </View>
        {user?.custom_metadata?.mode === "advanced" ? (
          <TouchableOpacity
            onPress={() => handlePresentModalPress()}
            className="px-[24px]"
          >
            <View className="bg-white rounded-[20px] w-full h-[86px] flex flex-row items-center px-5">
              <Text className="text-[48px] mr-3">⚡</Text>
              <View className="flex flex-col">
                <DeflateText
                  text="Advanced mode"
                  className="text-[20px]"
                  font="BG_Bold"
                />
                <DeflateText
                  text="Automated trading strategy"
                  className="text-[12px] text-[#8F8F91] tracking-normal"
                  font="BG_Medium"
                />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="px-[24px]"
            onPress={() => handlePresentModalPress()}
          >
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
          </TouchableOpacity>
        )}

        <BottomSheetModal
          ref={bottomSheetRef}
          stackBehavior="replace"
          enableDismissOnClose
          enableDynamicSizing
          enableOverDrag={false}
          enablePanDownToClose
          backdropComponent={DeflateBackdrop}
        >
          <BottomSheetView className="h-[400px] p-4">
            {user?.custom_metadata?.mode === "safe" ? (
              <View className="flex flex-col gap-y-4">
                <DeflateText
                  text="😁 Safe mode"
                  className="text-[24px]"
                  font="BG_Bold"
                />
                <Text className="text-[16px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eaque, qui obcaecati. Reiciendis accusamus dicta ea eius
                  facilis corrupti repellat ipsam voluptatibus ullam minima
                  aspernatur facere consequuntur dolores earum, amet cupiditate.
                </Text>
                <Text className="text-[16px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eaque, qui obcaecati. Reiciendis accusamus dicta ea eius
                  facilis corrupti repellat ipsam voluptatibus ullam minima
                  aspernatur facere consequuntur dolores earum, amet cupiditate.
                </Text>
              </View>
            ) : (
              <View className="flex flex-col gap-y-4">
                <DeflateText
                  text="⚡ Advanced mode"
                  className="text-[24px]"
                  font="BG_Bold"
                />
                <Text className="text-[16px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eaque, qui obcaecati. Reiciendis accusamus dicta ea eius
                  facilis corrupti repellat ipsam voluptatibus ullam minima
                  aspernatur facere consequuntur dolores earum, amet cupiditate.
                </Text>
                <Text className="text-[16px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eaque, qui obcaecati. Reiciendis accusamus dicta ea eius
                  facilis corrupti repellat ipsam voluptatibus ullam minima
                  aspernatur facere consequuntur dolores earum, amet cupiditate.
                </Text>
              </View>
            )}
          </BottomSheetView>
        </BottomSheetModal>
      </SafeAreaView>
    </>
  );
}

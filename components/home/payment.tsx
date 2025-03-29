import { Color } from "components/color";
import { View, Text } from "react-native";

export default function Payment() {
  const data = [
    { key: 1, value: 60, svg: { fill: "#f87171" }, label: "1st Installment" },
    { key: 2, value: 40, svg: { fill: "#4ade80" }, label: "2nd Installment" },
    { key: 3, value: 100, svg: { fill: "#06b6d4" }, label: "3rd Installment" },
  ];
  
  return (
    <View className="p-4 rounded-2xl shadow-md bg-white">

      <View className="flex-row justify-between" >
        <View className="flex-col">
            <Text className="text-lg font-semibold text-black mb-2">
                Payments
            </Text>

            <Text className="text-2xl font-bold text-black">$36,358</Text>
            <View className="flex-row items-center gap-2 mt-1">
                <View className={`bg-[${Color.primary}] p-1 rounded-full`}>
                <Text className="text-white text-sm">⬆ +20%</Text>
                </View>
                <Text className="text-gray-500 text-sm">Waiver</Text>
            </View>

            {/* Legend */}
            <View className="flex-row mt-4">
                <View className="flex-row items-center mr-4">
                    <View className="w-2.5 h-2.5 rounded-full bg-red-400 mr-1"></View>
                    <Text className="text-gray-500 text-sm">$7,263</Text>
                </View>

                <View className="flex-row items-center mr-4">
                    <View className="w-2.5 h-2.5 rounded-full bg-green-400 mr-1"></View>
                    <Text className="text-gray-500 text-sm">$7,263</Text>
                </View>

                <View className="flex-row items-center mr-4">
                    <View className="w-2.5 h-2.5 bg-cyan-500 mr-1 rounded-full"></View>
                    <Text className="text-gray-500 text-sm">$7,263</Text>
                </View>
                
            </View>
            {/* <View className="flex-row mt-4">
                <View className="flex-row items-center mr-4">
                    <View className="w-2.5 h-2.5 rounded-full bg-red-400 mr-1"></View>
                    <Text className="text-gray-500 text-sm">Late fine</Text>
                </View>

                <View className="flex-row items-center mr-4">
                    <View className="w-2.5 h-2.5 rounded-full bg-green-400 mr-1"></View>
                    <Text className="text-gray-500 text-sm">No Late fine</Text>
                </View>

                <View className="flex-row items-center mr-4">
                    <View className="w-2.5 h-2.5 bg-cyan-500 mr-1 rounded-full"></View>
                    <Text className="text-gray-500 text-sm">No Late fine</Text>
                </View>
                
            </View> */}
        </View>
        <View className="flex-col justify-center">
            {/* <View className="w-28 h-28 bg-cyan-500 rounded-full">

            </View> */}
            {/* <PieChart style={{ height: 100, width: 100 }} data={data} innerRadius={"70%"} outerRadius={"100%"} /> */}
            <View className="flex-row items-center mt-2">
                <View className="w-2.5 h-2.5 bg-red-400 mr-1"></View>
                <Text className="text-gray-500 text-md">1st Installment</Text>
            </View>

            <View className="flex-row items-center mt-2">
                <View className="w-2.5 h-2.5 bg-green-400 mr-1"></View>
                <Text className="text-gray-500 text-md">2nd Installment</Text>
            </View>

            <View className="flex-row items-center mt-2">
                <View className="w-2.5 h-2.5 bg-cyan-500 mr-1"></View>
                <Text className="text-gray-500 text-md">3rd Installment</Text>
            </View>
        </View>
      </View>
    </View>
  );
}

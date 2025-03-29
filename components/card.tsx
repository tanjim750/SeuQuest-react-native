import { View, Text } from "react-native";
import { Pie, PieChart } from "recharts";

export default function Card() {
  const data = [
    { name: "Organic", value: 60, color: "#2563eb" },
    { name: "Referral", value: 40, color: "#f87171" },
    { name: "Empty", value: 100, color: "#e5e7eb" }, // Gray background
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
                <View className="bg-green-100 p-1 rounded-full">
                <Text className="text-green-600 text-sm">⬆ +20%</Text>
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
        </View>
        <View className="flex-col justify-center">
            <View className="w-28 h-28 bg-cyan-500 rounded-full">

            </View>
        </View>
      </View>
    </View>
  );
}

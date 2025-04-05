import { Pressable, Text } from "react-native"
import {FontAwesome} from "@expo/vector-icons"
import { useState } from "react"

export const ButtonBgLime = ({onPress,title}:any) => {
    const [pressed, setPressed] = useState(false);

    return (
        <Pressable
            className={pressed ? styles.btnLimePressed:styles.btnLime} 
            onPress={onPress}
            onPressOut={() => setPressed(false)}
            onPressIn={() => setPressed(true)}
            >
            <Text className='text-md text-gray-500 font-semibold'>{title}</Text>
        </Pressable>
    );
}

export const ButtonBgLimeIcon = ({onPress,title,iconName, iconSize }:any) => {
    const [pressed, setPressed] = useState(false);

    return (
        <Pressable
            className={pressed ? styles.btnLimePressed:styles.btnLime} 
            onPress={onPress}
            onPressOut={() => setPressed(false)}
            onPressIn={() => setPressed(true)}
            >
            <FontAwesome name={iconName} size={iconSize}/>
            <Text className='text-md text-gray-500 font-semibold'>{title}</Text>
        </Pressable>
    );
}

export const ButtonBgGray = ({onPress,title}:any) => {
    const [pressed, setPressed] = useState(false);

    return (
        <Pressable
            className={pressed ? styles.btnGrayPressed:styles.btnGray} 
            onPress={onPress}
            onPressOut={() => setPressed(false)}
            onPressIn={() => setPressed(true)}
            >
            <Text className='text-md text-gray-500 font-semibold'>{title}</Text>
        </Pressable>
    );
}

export const CustomButton = ({onPress,className, children}:any) => {
    const [pressed, setPressed] = useState(false);

    return (
        <Pressable
            className={pressed ? `${className} opacity-50`:className} 
            onPress={onPress}
            onPressOut={() => setPressed(false)}
            onPressIn={() => setPressed(true)}
            >
            {children}
        </Pressable>
    );
}

const styles = {
    btnLime: "flex-row items-center gap-2 bg-lime-400 py-1 px-2 rounded-md",
    btnLimePressed: "flex-row items-center gap-2 bg-lime-400 py-1 px-2 rounded-md opacity-50",
    btnGray:"py-1 px-2 bg-gray-300 rounded-md",
    btnGrayPressed: "py-1 px-2 bg-gray-300 rounded-md opacity-50"
}
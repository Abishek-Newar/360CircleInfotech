import { Pressable, StyleSheet} from "react-native";
import { Box, Text } from "../utils";

const Button = ({label,onLongPress, onPress, disabled, uppercase}) =>{
    return (
        <Pressable onPress={onPress} onLongPress={onLongPress} disabled={disabled}>
            <Box bg={disabled? "gray800" : "primary" } py="3.5" borderRadius="rounded-7xl" >
                <Text variant="textXs" fontWeight="700" color="white" textAlign="center" textTransform={uppercase? "uppercase": null}>
                    {label}
                </Text>
            </Box>
        </Pressable>
    )
    }

export default Button


const styles = StyleSheet.create({})
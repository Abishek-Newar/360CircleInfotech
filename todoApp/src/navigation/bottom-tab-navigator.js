import { useTheme } from "@shopify/restyle";
import Icons from "../components/shared/icons";
import Completed from "../screens/completed";
import Today from "../screens/today-screen";
import HomeStack from "./HomeStackNavigator";

const { createBottomTabNavigator } = require("@react-navigation/bottom-tabs");



const Tab = createBottomTabNavigator();



const BottomTabNavigator = () => {
    const theme = useTheme()
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: theme.colors.gray550,
        tabBarHideOnKeyboard: true,
    }}
    >
        <Tab.Screen name="HomeStack" component={HomeStack} options={()=>({
            title: "Home",
            headerShown: false,
            tabBarIcon: ({color}) => <Icons Name="home" color={color}
             />
        })} />
        <Tab.Screen name="Completed" component={Completed} options={()=>({
            title: "Create",
            headerShown: false,
            tabBarIcon: ({color}) => <Icons Name="completed" color={color} />
        })} />
        
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as skia from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { useDerivedValue } from "react-native-reanimated";

const A = () => {
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    setState(true);
  }, []);

  return state ? (
    <skia.Canvas style={{ flex: 1, backgroundColor: "blue" }}>
      <skia.Rect x={0} y={0} width={100} height={100} color={"cyan"}/>
    </skia.Canvas>
  ) : (
    <></>
  );
};

const B = () => (
  <skia.Canvas style={{ flex: 1, backgroundColor: "yellow" }}>
    <skia.Circle cx={50} cy={50} r={50} color={"orange"}/>
  </skia.Canvas>
);

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<{
  A: undefined;
  B: undefined;
}>();

const ReactNavigationExample = () => {
  /**
   * in this example you'll probably see:
   * - component A (blue) renders with the skia.Rect
   * - (switch to B) component B (yellow) renders, but the skia.Circle is not rendered
   * - (switch to A) component A (blue) renders, but the skia.Circle from A is rendered instead of the skia.Rect
   */
  return (
    <NavigationContainer>
      <BottomTab.Navigator initialRouteName={"A"}>
        <BottomTab.Screen name="A" component={A}/>
        <BottomTab.Screen name="B" component={B}/>
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

const BasicExample = () => {
  /**
   * in this example you'll probably see:
   * - component A (blue) renders with the skia.Rect
   * - (switch to B) component B (yellow) renders, but the skia.Circle is not rendered
   * - (switch to A) component A (blue) renders, but the skia.Rect is not rendered
   * however, if you switch back and forth between A and B a few times, sometimes A renders correctly
   */
  const [state, setState] = useState<"a" | "b">("a");

  return <View style={{ flex: 1, marginTop: 100 }}>
    <Button title={state === "a" ? "Go to B" : "Go to A"} onPress={() => setState((s) => s === "a" ? "b" : "a")}/>
    <Button title={"B"} onPress={() => setState("b")}/>
    {
      state === "a" ? <A/> : <B/>
    }
  </View>;
}

export const App = () => {
  // You don't need to use this value, skia.Path also seems to has the same issue
  const x = useDerivedValue(() => skia.Skia.Color(0xff0000ff), []);

  return <ReactNavigationExample/>;
  // return <BasicExample/>;
};

export default App;

 import * as Font from 'expo-font';

export const myUseFonts = async () =>
  await Font.loadAsync({
    Memoir: require('../assets/MouseMemoirs-Regular.ttf'),
    DancingScript: require('../assets/DancingScript-VariableFont_wght.ttf'),
    Oswald: require('../assets/Oswald-VariableFont_wght.ttf'),
  });

import React, {useContext} from 'react';
import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import WelcomeBanner from './Components/WelcomeBanner';
import ExerciseCategory from './Components/ExerciseCategory';
import BodyPartsWorkout from './Components/BodyPartsWorkout';
import { ScrollView } from 'react-native-virtualized-view';
import { LinearGradient } from 'expo-linear-gradient';
import {UserContext} from "./UserContext";

function HomeScreen({route}) {
  // const [fontsLoaded] = useFonts({
  //   DancingScript: require('../assets/DancingScript-VariableFont_wght.ttf'),
  //   MouseMemoir: require('../assets/MouseMemoirs-Regular.ttf'),
  //   Oswald: require('../assets/Oswald-VariableFont_wght.ttf'),
  // });
  //
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

    const { myCurrentUserObject } = useContext(UserContext);
    const prevUser = "kai"
  //  const prevUser = route.params?.currentUser;




    return (
    <ScrollView>
          <LinearGradient
              colors={['#d7d2cc', '#04121e']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
          >
              <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop:10 }}>
                  <View className="flex-1"style={{
                      marginTop:10
                  }}>
                      <StatusBar />
                      <WelcomeBanner name={prevUser}/>
                      <ExerciseCategory />
                      <BodyPartsWorkout />
                  </View>
              </ScrollView>
          </LinearGradient>
      </ScrollView>

  );
}

export default HomeScreen;

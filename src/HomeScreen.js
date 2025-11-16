import React, {useContext} from 'react';
import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import WelcomeBanner from './Components/WelcomeBanner';
import ExerciseCategory from './Components/ExerciseCategory';
import BodyPartsWorkout from './Components/BodyPartsWorkout';
import { ScrollView } from 'react-native-virtualized-view';
import { LinearGradient } from 'expo-linear-gradient';
import {UserContext} from "./UserContext";

function HomeScreen({route}) {
    const { myCurrentUserObject } = useContext(UserContext);
    return (
    <ScrollView>
          <LinearGradient
              colors={['#d7d2cc', '#04121e']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
          >
              <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop:10 }}>
                  <View className="flex-1" style={{
                      marginTop:10
                  }}>

                      {/*<StatusBar />*/}
                      <WelcomeBanner />
                      <ExerciseCategory />
                      <BodyPartsWorkout />
                  </View>
              </ScrollView>
          </LinearGradient>
      </ScrollView>

  );
}

export default HomeScreen;

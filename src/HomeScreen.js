import React, {useContext} from 'react';
import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import WelcomeBanner from './Components/WelcomeBanner';
import Meal from './Components/Meal';
import ChooseDinner from './Components/ChooseDinner';
import { ScrollView } from 'react-native-virtualized-view';
import { LinearGradient } from 'expo-linear-gradient';
import {UserContext} from "./UserContext";
import ChooseSeller from "./Components/Seller";
import Eatery from "./Components/EateryScroller";

function HomeScreen() {
     return (
    <ScrollView>
          <LinearGradient
              // colors={['#d7d2cc', '#04121e']}
              // colors={['#d7d2cc', 'rgba(5,0,0,0.91)']}
              colors={['#ede7d8', 'rgba(255,255,255,0.96)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
          >
        {/*<LinearGradient*/}
        {/*    colors={['#FF3D00', '#FF6A00', '#FFC300']}*/}
        {/*    start={{ x: 0, y: 0 }}*/}
        {/*    end={{ x: 1, y: 0 }}*/}
        {/*    style={{ flex: 1 }}*/}
        {/*>*/}
              <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop:10 }}>
                  <View className="flex-1" style={{
                      marginVertical:10
                  }}>


                      <WelcomeBanner
                      />
                      <Eatery
                      />
                      <Meal
                      />
                      <ChooseSeller
                      />
                      <ChooseDinner
                      />
                  </View>
              </ScrollView>
          </LinearGradient>
      </ScrollView>

  );
}

export default HomeScreen;

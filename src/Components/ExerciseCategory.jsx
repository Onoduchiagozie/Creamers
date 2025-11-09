// import React from 'react';
// import { FlatList, Text, View } from 'react-native';
// import { Equipments } from '../Constants';
// import EquipmentsImages from './EquipmentsImages';
// import { useFonts } from 'expo-font';
//
// const ExerciseCategory = () => {
//   const [fontsLoaded] = useFonts({
//     DancingScript: require('../../assets/DancingScript-VariableFont_wght.ttf'),
//     MouseMemoir: require('../../assets/MouseMemoirs-Regular.ttf'),
//   });
//   return (
//     <View
//       style={{
//         marginHorizontal: 10,
//         marginTop: 20,
//         marginBottom: 40,
//       }}
//     >
//       <Text
//         className="italic text-center"
//         style={{
//           fontSize: 26,
//           fontWeight: 'bold',
//           marginLeft: 20,
//           marginBottom: 10,
//         }}
//       >
//         Choose
//         <Text style={{ color: 'red' }}> Equipment </Text>
//       </Text>
//       <FlatList
//         data={Equipments}
//         keyExtractor={(item) => item.id || item.name}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => {
//           return <EquipmentsImages equip={item} />;
//         }}
//       />
//     </View>
//   );
// };
//
// export default ExerciseCategory;


import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { Equipments } from '../Constants';
import EquipmentsImages from './EquipmentsImages';
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('window');

const ExerciseCategory = () => {
    // const [fontsLoaded] = useFonts({
    //     DancingScript: require('../../assets/DancingScript-VariableFont_wght.ttf'),
    //     MouseMemoir: require('../../assets/MouseMemoirs-Regular.ttf'),
    // });

  //  if (!fontsLoaded) return null;

    return (
        <View
            style={{
                marginHorizontal: 10,
                marginTop: 20,
                marginBottom: 40,
            }}
        >
            {/* TITLE */}
            <Text
                style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    marginLeft: 10,
                    fontFamily:"casual",

                    marginBottom: 5, // ✅ closer to images
                }}
            >
                Choose
                <Text style={{ color: 'red' }}> Equipment</Text>
            </Text>

            {/* LIST */}
            <FlatList
                data={Equipments}
                keyExtractor={(item) => item.id || item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: 5,
                }}
                renderItem={({ item }) => <EquipmentsImages equip={item} />}
            />
        </View>
    );
};

export default ExerciseCategory;

// import React, { useEffect, useState } from 'react';
// import { View, Image, Text, TouchableOpacity } from 'react-native';
//
// import { useNavigation } from '@react-navigation/native';
//
// // const API_KEY = 'FPSX3091bc0cffc149c394a54a3c76414e7d'; // davalchi api key
// const API_KEY = 'FPSX24ae06e2383d474d8e618b836b8563c7'; // chiagozie api key
// const BASE_URL = 'https://api.freepik.com/v1/ai/text-to-image';
//
// const EquipmentsImages = ({ equip }) => {
//   const navigation = useNavigation();
//   return (
//     <View style={{}} className="rounded-4xl mx-2 ">
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate('BodyPartExerciseList', {
//             workout: equip,
//           })
//         }
//       >
//         <Image
//           source={equip.imagePath}
//           className="h-72 w-96"
//           style={{
//             marginTop: 10,
//             borderWidth: 5,
//             borderRadius: 5,
//             width: 260,
//               height: 220,
//             resizeMode: 'stretch',
//             marginLeft: 10,
//           }}
//         />
//
//         <Text
//           className="text-center my-2"
//           style={{
//             marginLeft: 10,
//
//             fontSize: 24,
//             fontFamily: 'MouseMemoir',
//           }}
//         >
//           {equip.name
//             .split(' ')
//             .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//             .join(' ')}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
//
// export default EquipmentsImages;





import React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
// responsive width
const IMAGE_WIDTH = width * 0.85;  // 65% of screen
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.60; // keep a good proportion

const EquipmentsImages = ({ equip }) => {
    const navigation = useNavigation();

    return (
        <View style={{ marginRight: 15 }}>
            <TouchableOpacity
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    navigation.navigate('BodyPartExerciseList', { workout: equip });
                }}
            >

            {/* IMAGE */}
                <Image
                    source={equip.imagePath}
                    style={{
                        marginTop: 10,
                        borderWidth: 4,
                        borderColor: '#130101',
                        borderRadius: 10,
                        width: IMAGE_WIDTH,
                        height: IMAGE_HEIGHT,
                        resizeMode: 'cover',
                        marginLeft: 10, // ✅ 7+ spacing
                    }}
                />

                {/* TEXT */}
                <Text
                    style={{
                        marginLeft: 20,  // ✅ ensure left spacing
                        fontSize: 22,
                        marginTop: 8,
                        fontFamily: 'American Typewriter',
                        textAlign: 'left', // ✅ no more centered mismatch
                    }}
                >
                    {equip.name
                        .split(' ')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default EquipmentsImages;


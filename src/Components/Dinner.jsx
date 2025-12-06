import React, {useState} from 'react';
import {Dimensions, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from "expo-haptics";
import { ImageBackground } from "expo-image";
import {EvilIcons, Ionicons} from "@expo/vector-icons";

const Dinner = ({ givenImage }) => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');





    // Each card takes 35% of screen width
    const cardWidth = width * 0.45;
    const cardHeight = cardWidth * 1.1; // Makes it slightly taller (adjust ratio as needed)

    return (
        <TouchableOpacity
            style={[styles.container, {
                width: cardWidth,
                height: cardHeight*1.4,
                marginHorizontal: 10,
                marginVertical: 20,
                borderWidth: 5,
                elevation: 10,
                borderColor:'orange',
                borderRadius: 50

             }]}
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.navigate('BodyPartExerciseList', { workout: givenImage });
            }}
        >
            <ImageBackground
                source={{uri:givenImage.image_url}}
                style={{ width: '100%',
                    height: '100%',
                    justifyContent: 'flex-end',
                elevation:10,
                  }}
                imageStyle={{
                    }}
            >
                {/* Overlay for better text readability */}
                <View style={{flexDirection: 'column', justifyContent: 'space-around',
                    paddingHorizontal: 10

                }}>
                      <Text style={{fontSize: 15,
                     textAlign: 'right',
                    fontWeight: 'bold',
                    paddingHorizontal: 8,
                    paddingBottom: 12,color:'red',
                          fontStyle: 'italic',
                          textDecorationLine:'underline'}}>
                    {givenImage.category
                        .split(' ')
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ')}
                </Text>

                <Text style={{
                     fontSize: 15,
                     textAlign: 'left',
                    fontWeight: 'bold',
                    paddingHorizontal: 8,
                    paddingBottom: 12,
                     textDecorationLine:'underline',
                    color:'yellow',
                    fontStyle: 'italic'
                }}>
                    {givenImage.name
                        .split(' ')
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ')}
                </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            alignSelf:'flex-end',
                            paddingHorizontal: 8,
                            paddingBottom: 12,
                            color:'white',
                            fontStyle: 'italic',
                        }}
                    >
                        {givenImage.rating}
                        <EvilIcons name='star'/> Star
                    </Text>
                </View>


            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: '#fff',
    },
    imageBackground: {
        // Puts text at bottom like a description
    },
    image: {
    },
    overlay: {
         backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for text readability
        borderRadius: 15,
    },
    text: {

     },
});

export default Dinner;


// import React from 'react';
// import { FlatList, Text, View } from 'react-native';
// import { BodyParts } from '../Constants';
// import { useNavigation } from '@react-navigation/native';
// import Dinner from './Dinner';
//
// const ChooseDinner = () => {
//     const navigation = useNavigation();
//
//     return (
//         <View style={{
//             flex: 1,
//             backgroundColor: '#f5f5f5',
//             paddingTop: 20,
//         }}>
//
//             {/* TITLE */}
//             <Text
//                 style={{
//                     fontSize: 30,
//                     fontFamily: 'casual',
//                     fontWeight: 'bold',
//                     fontStyle: 'italic',
//                     marginLeft: 16,
//                     marginBottom: 15,
//                 }}
//             >
//                 Choose
//                 <Text style={{ color: 'red' }}> Dinner</Text>
//             </Text>
//
//             <FlatList
//                 data={BodyParts}
//                 keyExtractor={(item) => item.id || item.name}
//                 numColumns={2}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{
//                     paddingHorizontal: 10,
//                     paddingBottom: 20,
//                 }}
//                 columnWrapperStyle={{
//                     justifyContent: 'space-between',
//                     marginBottom: 15,
//                 }}
//                 renderItem={({ item }) => (
//                     <Dinner givenImage={item} />
//                 )}
//             />
//         </View>
//     );
// };
//
// export default ChooseDinner;
//
//
// // import React from 'react';
// // import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import * as Haptics from "expo-haptics";
// // import {ImageBackground} from "expo-image";
// //
// // const Dinner = ({ givenImage }) => {
// //     const navigation = useNavigation();
// //     const { width } = Dimensions.get('window');
// // const breadth=width*0.8;
// // const length=breadth*0.5;
// //
// //     return (
// //         <TouchableOpacity
// //             style={{
// //                  backgroundColor:'red',
// //                 justifyContent:'space-between',
// //
// //              }}
// //
// //
// //             onPress={() =>{
// //                 Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
// //                 navigation.navigate('BodyPartExerciseList', { workout: givenImage }       )}
// //             }
// //         >
// //
// //             <ImageBackground
// //                 source={givenImage.imagePath}
// //                 style={{
// //
// //                     //   borderWidth: 4,
// //                     // borderRadius: 10,
// //                     // marginBottom: 10,     // ✅ spacing from rows below
// //                     // marginTop: 10,        // ✅ spacing from rows above
// //                 }}
// //             >
// //                 <Text
// //                     style={{
// //                         fontFamily: 'MouseMemoir',
// //                         fontSize: 22,
// //                         textDecorationStyle:'dotted',
// //                         textAlign: 'center',   // ✅ aligned under image
// //                     }}
// //                 >
// //                     {givenImage.name
// //                         .split(' ')
// //                         .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
// //                         .join(' ')}
// //                 </Text>            </ImageBackground>
// //
// //
// //         </TouchableOpacity>
// //     );
// // };
// //
// // export default Dinner;
// //

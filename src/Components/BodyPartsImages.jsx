// import React from 'react';
// import { Image, Text, TouchableOpacity, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
//
// const BodyPartsImages = ({ givenImage }) => {
//   const navigation = useNavigation();
//
//   return (
//     <View style={{}}>
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate('BodyPartExerciseList', {
//             workout: givenImage,
//           })
//         }
//       >
//         <Image
//           source={givenImage.imagePath}
//           className=" h-52 w-44"
//           style={{
//             resizeMode: 'stretch',
// height: 200,
//               width: 120,
//             backgroundColor: 'transparent',
//             borderWidth: 5,
//             borderRadius: 10,
//             marginTop: 10,
//             marginHorizontal: 25,
//           }}
//         />
//
//         <Text
//           style={{
//             fontFamily: 'MouseMemoir',
//             fontSize: 24,
//           }}
//           className="text-center "
//         >
//           {givenImage.name
//             .split(' ') // Split into words
//             .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
//             .join(' ')}{' '}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
//
// export default BodyPartsImages;



import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from "expo-haptics";

const BodyPartsImages = ({ givenImage }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{
                width: 150,             // ✅ consistent card width
                alignItems: 'center',   // ✅ image + text perfectly centered
                marginHorizontal: 15,    // ✅ 2-point spacing between columns
            }}


            onPress={() =>{
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.navigate('BodyPartExerciseList', { workout: givenImage }       )}
            }
        >
            {/* IMAGE */}
            {/*<Image*/}
            {/*    source={givenImage.imagePath}*/}
            {/*    style={{*/}
            {/*        height: 350,*/}
            {/*        width: 120,*/}
            {/*        resizeMode: 'cover',*/}
            {/*        borderWidth: 4,*/}
            {/*        borderRadius: 10,*/}
            {/*        marginBottom: 5,*/}
            {/*    }}*/}
            {/*/>*/}

            <Image
                source={givenImage.imagePath}
                style={{
                    height: 350,
                    width: '80%',         // ✅ takes 80% of screen width
                    alignSelf: 'center',  // ✅ centers it horizontally

                    resizeMode: 'cover',
                    borderWidth: 4,
                    borderRadius: 10,

                    marginBottom: 10,     // ✅ spacing from rows below
                    marginTop: 10,        // ✅ spacing from rows above
                }}
            />

            <Text
                style={{
                    fontFamily: 'MouseMemoir',
                    fontSize: 22,
                    textAlign: 'center',   // ✅ aligned under image
                }}
            >
                {givenImage.name
                    .split(' ')
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ')}
            </Text>

        </TouchableOpacity>
    );
};

export default BodyPartsImages;


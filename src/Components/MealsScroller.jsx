import React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import {ImageBackground} from "expo-image";
import {EvilIcons, Ionicons} from "@expo/vector-icons";

const { width } = Dimensions.get('window');
// responsive width

const MealsScroller = ({ equip }) => {
    const navigation = useNavigation();
    const IMAGE_WIDTH = width * 0.20;  // 65% of screen
    const IMAGE_HEIGHT = IMAGE_WIDTH * 0.40; // keep a good proportion
const [cart,setCart] = React.useState(0);
    return (
        <View style={{ marginRight: 15 }}>
            <TouchableOpacity
                onPress={() => {
                     navigation.navigate('FoodDetail', { meal: equip });
                }}
            >

            {/* IMAGE */}
                <ImageBackground
                    source={equip.image_url}
                    style={{
                        flexDirection: 'column',
                        marginTop: 10,
                        borderWidth: 4,
                        borderColor: '#e8bd1e',
                        borderRadius: 20,
                        width: IMAGE_WIDTH*3,
                        height: IMAGE_HEIGHT*5,
                        resizeMode: 'cover',
                        marginLeft: 10,
                        overflow:'hidden',
                        elevation:8,
                        justifyContent:'space-between',
                        // borderTopLeftRadius:20,
                        // borderTopRightRadius:20,

                    }}
                ><Text
                style={{
                    fontSize: 26,
                     top: 5,   // Distance from the top edge
                    right: 5, // Distance from the right edge
                    zIndex: 1,
                    marginLeft: 10,
                    color: 'white',
                }}>
                    {cart}
                </Text>
<TouchableOpacity  onPress={() => {
    setCart(cart+1);
}}>
    <EvilIcons name='plus' size={30} style={{ position: 'absolute',
        top: 0,   // Distance from the top edge
        right: 5, // Distance from the right edge
        zIndex: 1, // Ensure the icon is above other card content
        backgroundColor: 'transparent', // Optional: add a background to make it stand out
        borderRadius: 15,
        padding: 2,}} />
</TouchableOpacity>




                {/* TEXT */}
                <View style={{
                    flex: 1,
                    justifyContent: 'space-between', // Aligns children to the bottom of the container
                    alignItems: 'space-between',
                    paddingBottom: 10, // O
                    padding: 20,
                    flexDirection: 'row',
                    fontFamily:'casual',
                     marginTop: 8,

                  }}>

                    <Text
                        style={{
                            textOverflow:'',
                             // fontSize: 12,
                             // ✅ no more centered mismatch
                            fontFamily:'casual',
                            marginLeft: 15,
                            color: 'white',

                        }}
                    >
                        {equip.name
                            .split(' ')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                    </Text>

                    <Text style={{
                        fontFamily:'casual',
                        marginLeft: 15,
                        color: 'white',
                        textDecorationLine:'underline',

                    }}>
                        {equip.price}
                    </Text>
                </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
};

export default MealsScroller;


import React from "react";
import {View, Text, TouchableOpacity, Dimensions} from "react-native";
 import { EvilIcons } from "@expo/vector-icons";
 import {TextInput} from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel from "react-native-reanimated-carousel/src/components/Carousel";
import {eateries, foodItems} from "../Constants";
import {Image, ImageBackground} from "expo-image";
import * as Haptics from "expo-haptics";
import {useNavigation} from "@react-navigation/native";

const WelcomeBanner = ({}) => {
    const navigation = useNavigation();

    const width = Dimensions.get('window').width;
     return (
        <View
            style={{
                paddingTop: 30,
                paddingHorizontal: 20,
                marginTop: 10,
                flexDirection: 'column',
            }}
        >
             <View
                style={{
                    width: "100%",
                    marginBottom: 10,
                    flexDirection: 'row',
                    justifyContent: "space-between",
                }}
            >
                <Text
                    numberOfLines={4}
                    style={{
                        fontSize: 40,
                        fontWeight: "bold",
                         color: "red",
                        maxWidth: "95%",
                        textAlign: "left",
                        fontFamily: 'casual',

                    }}
                >
                    Welcome
                </Text>
                <EvilIcons name="bell" size={30} color="red" />
            </View>

             {/*<TextInput*/}
             {/*    right={<TextInput.Icon icon="cloud-search-outline" />}*/}
             {/*    placeholder="Search "*/}
             {/*    placeholderTextColor='red'*/}
             {/*   style={{*/}
             {/*       height: 50,*/}
             {/*       borderWidth: 4,*/}
             {/*       borderRadius:25,*/}
             {/*       paddingHorizontal: 10,*/}
             {/*       backgroundColor: "transparent",*/}
             {/*       borderBottomWidth: 7,*/}
             {/*       marginVertical: 10,*/}
             {/*       justifyContent: "center",*/}
             {/*       overflow:'hidden',*/}
             {/*   }}*/}
             {/*/>*/}

             <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {foodItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            width: "25%",
                            alignItems: "center",
                            marginVertical: 12,
                        }}
                    >
                        <MaterialCommunityIcons
                            name={item.icon}
                            size={36}
                            color="#ff6f61"
                        />
                        <Text
                            style={{
                                marginTop: 4,
                                fontSize: 12,
                                fontWeight: "bold",
                                fontFamily: 'casual',
                             }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={{ flex: 1 }}>
                <Carousel
                     loop
                    width={width*0.99}
                    height={width / 2}
                    autoPlay={true}
                    data={eateries}
                    scrollAnimationDuration={3000} // Speed of the scroll
                    onSnapToItem={(index) => console.log('current index:', index)}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                flex: 2,
                                  // justifyContent: 'center',
                                // alignItems: 'center',
                             }}
                        ><TouchableOpacity
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                            navigation.navigate('BodyPartExerciseList', { workout: item });
                        }}>
                            <ImageBackground
                                source={{uri:item.logo_url}}
                                style={{
                                    borderRadius:15,
                                    overflow: 'hidden',
                                    resizeMode: "contain",
                                    height: width/2,
                                    elevation:1,
                                    marginRight:20,
                                    borderWidth:4,
                                    borderColor:"#ff6f61"

                                }}
                            />
                        </TouchableOpacity>

                        </View>
                    )}
                />
            </View>
        </View>
    );
};

export default WelcomeBanner;

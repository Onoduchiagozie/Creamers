//
//
// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
// import * as Haptics from "expo-haptics";
//
// export default function TimerScreen({ route, navigation }) {
//     const { startTime, exercise } = route?.params || {};
//     const [isRunning, setIsRunning] = useState(true);
//     const [offsetMs, setOffsetMs] = useState(0);
//     const [now, setNow] = useState(Date.now());
//     const intervalRef = useRef(null);
//     const pausedStartedAtRef = useRef(null);
//
//     const baseStart = useMemo(() => (typeof startTime === 'number' ? startTime : Date.now()), [startTime]);
//
//     // Timer tick
//     useEffect(() => {
//         if (isRunning) {
//             intervalRef.current = setInterval(() => setNow(Date.now()), 500);
//         } else if (intervalRef.current) {
//             clearInterval(intervalRef.current);
//             intervalRef.current = null;
//         }
//         return () => clearInterval(intervalRef.current);
//     }, [isRunning]);
//
//     // Adjust offset when paused
//     useEffect(() => {
//         if (!isRunning) {
//             pausedStartedAtRef.current = Date.now();
//         } else if (pausedStartedAtRef.current) {
//             setOffsetMs((prev) => prev + (Date.now() - pausedStartedAtRef.current));
//             pausedStartedAtRef.current = null;
//         }
//     }, [isRunning]);
//
//     const elapsedMs = Math.max(0, now - baseStart - offsetMs);
//
//     const format = (ms) => {
//         const totalSeconds = Math.floor(ms / 1000);
//         const mins = Math.floor(totalSeconds / 60);
//         const secs = totalSeconds % 60;
//         return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
//     };
//
//     const onReset = () => {
//         setOffsetMs(0);
//         pausedStartedAtRef.current = null;
//         setNow(Date.now());
//     };
//
//     const screenHeight = Dimensions.get('window').height;
//     const imageHeight = isRunning ? screenHeight * 0.45 : screenHeight * 0.7;
//
//     // ---------------- DESIGN OPTIONS ----------------
//     // COMMENT/UNCOMMENT the one you want to use
//
//     // Option 1: Full-width cover with rounded corners
//     const DesignOption1 = () => (
//         <Image
//             source={{ uri: exercise?.gifUrl }}
//             style={{
//                 width: '100%',
//                 height: imageHeight,
//                 borderRadius: 16,
//                 resizeMode: 'cover',
//                 marginVertical: 16,
//                 borderWidth: 2,
//                 borderColor: '#f59e0b', // orange border
//             }}
//         />
//     );
//
//     // Option 2: Contained with thick border and shadow
//     const DesignOption2 = () => (
//         <View style={{
//             alignItems: 'center',
//             marginVertical: 16,
//             shadowColor: '#000',
//             shadowOpacity: 0.4,
//             shadowRadius: 8,
//             shadowOffset: { width: 0, height: 4 },
//             elevation: 8, // for Android shadow
//             borderRadius: 32,
//             borderWidth: 3,
//             borderColor: '#3b82f6',
//             overflow: 'hidden',
//         }}>
//             <Image
//                 source={{ uri: exercise?.gifUrl }}
//                 style={{ width: '90%', height: imageHeight, resizeMode: 'contain' }}
//             />
//         </View>
//     );
//
//     // Option 3: Framed with dark background
//     const DesignOption3 = () => (
//         <View style={{
//             marginVertical: 16,
//             backgroundColor: '#1f2937',
//             padding: 8,
//             borderRadius: 12,
//             width: '100%',
//             alignItems: 'center',
//         }}>
//             <Image
//                 source={{ uri: exercise?.gifUrl }}
//                 style={{ width: '100%', height: imageHeight, borderRadius: 12, resizeMode: 'cover' }}
//             />
//         </View>
//     );
//
//     // Option 4: Timer overlay on image (modern fitness app style)
//     const DesignOption4 = () => (
//         <View style={{ marginVertical: 16, width: '100%', borderRadius: 16, overflow: 'hidden' }}>
//             <Image
//                 source={{ uri: exercise?.gifUrl }}
//                 style={{ width: '100%', height: imageHeight, resizeMode: 'cover', opacity: 0.9 }}
//             />
//             <View style={{
//                 position: 'absolute',
//                 top: 16,
//                 left: 16,
//                 backgroundColor: 'rgba(0,0,0,0.5)',
//                 paddingVertical: 8,
//                 paddingHorizontal: 16,
//                 borderRadius: 12,
//             }}>
//                 <Text style={{ color: 'white', fontSize: 32, fontFamily: 'Oswald' }}>{format(elapsedMs)}</Text>
//             </View>
//         </View>
//     );
//
//     // --------------------------------------------------
//
//     return (
//         <ScrollView
//             contentContainerStyle={{ padding: 24, alignItems: 'center' ,backgroundColor: 'blue' }}>
//             scrollEnabled={!isRunning}
//
//         >
//             <Text style={{ fontSize: 22, color: 'white', marginBottom: 8, fontFamily: 'Oswald' }}>
//                 {exercise?.name}
//             </Text>
//
//             {/* UNCOMMENT ONE DESIGN OPTION TO USE */}
//             {/*<DesignOption1 />*/}
//             {/*<DesignOption2 />*/}
//             <DesignOption3 />
//             {/* <DesignOption4 /> */}
//
//             {/* Exercise info */}
//             <View style={{ marginTop: 24, width: '100%' }}>
//                 <Text style={{ color: 'white', fontSize: 16 }}>Target Muscle: {exercise?.target}</Text>
//                 <Text style={{ color: 'white', fontSize: 16 }}>
//                     Secondary Muscles: {exercise?.secondaryMuscles?.join(', ')}
//                 </Text>
//                 <Text style={{ color: 'white', fontSize: 16 }}>Difficulty: {exercise?.difficulty}</Text>
//                 <Text style={{ color: 'white', fontSize: 16 }}>Equipment: {exercise?.equipment}</Text>
//                 <Text style={{ color: 'white', fontSize: 16, marginTop: 8 }}>Instructions:</Text>
//                 {exercise?.instructions?.map((inst, i) => (
//                     <Text key={i} style={{ color: 'white', fontSize: 14, marginLeft: 8 }}>
//                         • {inst}
//                     </Text>
//                 ))}
//             </View>
//
//             {/* Buttons */}
//             <View style={{ flexDirection: 'row', gap: 12, marginTop: 32 }}>
//                 <TouchableOpacity
//                     onPress={() =>{
//                         setIsRunning((r) => !r)  ;
//                         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
//
//                     }
//
//                 }
//                     style={{ backgroundColor: isRunning ? 'orange' : 'green', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 }}
//                 >
//                     <Text style={{
//                         backgroundColor: isRunning ? 'orange' : 'green',
//                         paddingVertical: 12,
//                         paddingHorizontal: 20,
//                         borderRadius: 8,
//                         zIndex: 10,          // ensure button is above other content
//                         elevation: 10,
//                         color: 'white',
//                         fontSize: 18,
//                         fontFamily: 'casual' }}>
//                         {isRunning ? 'Pause' : 'Resume'}
//                     </Text>
//                 </TouchableOpacity>
//
//                 <TouchableOpacity onPress={onReset} style={{ backgroundColor: '#374151', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 }}>
//                     <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Oswald' }}>Reset</Text>
//                 </TouchableOpacity>
//
//                 <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: 'indigo', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 }}>
//                     <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Oswald' }}>Done</Text>
//                 </TouchableOpacity>
//             </View>
//         </ScrollView>
//     );
// }
//

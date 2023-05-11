import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Sound from 'react-native-sound';
import Images from 'assets/images';
import SvgIcons from 'assets/svgs';
import { useTheme } from 'hooks/useTheme';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
interface IPlayAudioProps {
    music: premium.MusicPremium;
}
const PlayAudio = (props: IPlayAudioProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [playing, setPlaying] = useState<boolean>(false);
    const { music } = props;
    Sound.setCategory('Playback');
    const audio = new Sound(music?.audio || '', null, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // if loaded successfully
        console.log(
            'duration in seconds: ' + audio.getDuration() + 'number of channels: ' + audio.getNumberOfChannels()
        );
    });
    useEffect(() => {
        audio.setVolume(1);
        return () => {
            audio.release();
        };
    }, []);
    const playPause = () => {
        if (playing) {
            audio.pause(() => {
                console.log('pause successful');
                setPlaying(false);
            });
            audio.setVolume(0);
        } else {
            setPlaying(true);
            audio.play((success) => {
                if (success) {
                    setPlaying(false);
                    console.log('successfully finished playing');
                } else {
                    audio.stop();
                    console.log('playback failed due to audio decoding errors');
                }
            });
        }
    };
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={playPause}>
            <View style={styles.itemContentContainer}>
                <FastImage source={music?.image ? { uri: music?.image } : Images.Babe} style={styles.image} />
                <View style={styles.itemContent}>
                    <Text style={styles.itemContentHeader}>{music?.name}</Text>
                </View>
            </View>
            <View style={styles.iconPlay}>
                {!playing ? (
                    <SvgIcons.IcPlay width={scales(17)} height={scales(17)} color={getThemeColor().Color_Gray5} />
                ) : (
                    <SvgIcons.IcPause width={scales(17)} height={scales(17)} color={getThemeColor().Color_Gray5} />
                )}
            </View>
        </TouchableOpacity>
    );
};
const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        itemContentContainer: {
            flexDirection: 'row',
            backgroundColor: color.Color_Bg,
            borderRadius: scales(8),
            paddingVertical: scales(15),
            paddingHorizontal: scales(12),
            marginBottom: scales(15),
            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        },
        itemContent: {
            flex: 1,
            marginLeft: scales(10),
        },
        itemContentHeader: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        itemContentDesc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        image: {
            width: scales(50),
            height: scales(50),
        },
        headerImg: {
            width: Sizes.scrWidth - scales(30),
            height: scales(188),
            marginBottom: scales(15),
        },
        iconPlay: {
            position: 'absolute',
            left: scales(25),
            top: scales(25),
        },
    });
};
export default PlayAudio;
// import React, { useEffect, useState } from 'react';
// import { StyleSheet, TouchableOpacity, View } from 'react-native';

// import SvgIcons from 'assets/svgs';

// import { getThemeColor } from 'utils/getThemeColor';
// import { scales } from 'utils/scales';

// import Sound from 'react-native-sound';

// Sound.setCategory('Playback');

// const PlayAudio = () => {
//     const [playing, setPlaying] = useState<boolean>(false);

//     const audio = new Sound(
//         'https://storage.googleapis.com/babau-ca037.appspot.com/MAKING%20MY%20WAY.mp3',
//         '',
//         (error) => {
//             if (error) {
//                 console.log('failed to load the sound', error);
//                 return;
//             }
//             // if loaded successfully
//             console.log(
//                 'duration in seconds: ' + audio.getDuration() + 'number of channels: ' + audio.getNumberOfChannels()
//             );
//         }
//     );
//     useEffect(() => {
//         audio.setVolume(1);
//         return () => {
//             audio.release();
//         };
//     }, []);
//     const playPause = () => {
//         if (audio.isPlaying()) {
//             audio.pause();
//             setPlaying(false);
//         } else {
//             setPlaying(true);
//             audio.play((success) => {
//                 if (success) {
//                     setPlaying(false);
//                     console.log('successfully finished playing');
//                 } else {
//                     setPlaying(false);
//                     console.log('playback failed due to audio decoding errors');
//                 }
//             });
//         }
//     };
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity style={styles.playBtn} onPress={playPause}>
//                 {!playing ? (
//                     <SvgIcons.IcPlay width={scales(17)} height={scales(17)} color={getThemeColor().Color_Gray5} />
//                 ) : (
//                     <SvgIcons.IcPause width={scales(17)} height={scales(17)} color={getThemeColor().Color_Gray5} />
//                 )}
//             </TouchableOpacity>
//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#000',
//     },
//     playBtn: {
//         padding: 20,
//     },
// });
// export default PlayAudio;

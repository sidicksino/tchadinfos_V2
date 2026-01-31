import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

type Props = {
    streamUrl: string;
    style?: any;
};

export default function LiveVideoPlayer({ streamUrl, style }: Props) {
  // Initialize player with the HLS source (m3u8)
  const player = useVideoPlayer(streamUrl, (player) => {
    player.loop = false; // Live streams don't loop
    player.play();
  });

  return (
    <View style={[styles.container, style]}>
      <VideoView 
        style={styles.video} 
        player={player} 
        allowsPictureInPicture 
        nativeControls 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

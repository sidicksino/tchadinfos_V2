import React, { useCallback, useState } from "react";
import { View, Modal, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  videoId: string;
  visible: boolean;
  onClose: () => void;
};

const { width } = Dimensions.get("window");

const VideoPlayerModal = ({ videoId, visible, onClose }: Props) => {
  const [playing, setPlaying] = useState(true);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.playerContainer}>
            {/* Close Button */}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close-circle" size={36} color="#fff" />
            </TouchableOpacity>

            <YoutubePlayer
                height={220} // 16:9 ratio approx for width
                width={width * 0.9}
                play={playing}
                videoId={videoId}
                onChangeState={onStateChange}
                initialPlayerParams={{
                    modestbranding: true,
                    rel: false,
                }}
            />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  playerContainer: {
    width: "100%",
    alignItems: "center",
  },
  closeButton: {
    marginBottom: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
});

export default VideoPlayerModal;

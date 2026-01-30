import axios from "axios";

export interface YouTubeVideo {
    id: string; // The video ID
    title: string;
    thumbnail: string;
    publishedAt: string;
    channelTitle: string;
}

const API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY || "AIzaSyBzeeLtLS3DbZQvD7ZzjQJ804isn7Xzbjc";
// TchadInfos Channel ID
const CHANNEL_ID = "UCwO0v-YozR_tOXu-UeC7sWA";

export const fetchTchadInfosVideos = async (): Promise<YouTubeVideo[]> => {
    try {
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
                params: {
                    key: API_KEY,
                    q: "TchadInfos", // Search by keyword instead of invalid ID
                    part: "snippet,id",
                    order: "date",
                    maxResults: 15,
                    type: "video", // Ensure we only get videos
                },
            }
        );

        const items = response.data.items;
        console.log("YouTube API Success. Items found:", items.length);

        // Map YouTube API response to our app's video structure
        const videos: YouTubeVideo[] = items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high ? item.snippet.thumbnails.high.url : item.snippet.thumbnails.medium.url,
            publishedAt: item.snippet.publishedAt,
            channelTitle: item.snippet.channelTitle,
        }));

        return videos;
    } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        if (axios.isAxiosError(error)) {
            console.error("Axios Error Details:", error.response?.data);
            console.error("Status:", error.response?.status);
        }
        console.log("Using API Key:", API_KEY ? "Present" : "Missing");
        console.log("Channel ID:", CHANNEL_ID);
        return [];
    }
};

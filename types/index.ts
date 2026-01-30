export interface NewsDataType{
    article_id: string; 
    title: string;
    link: string;
    keywords: string[];
    creator: null; 
    video_url: null; 
    description: string;
    content: string; 
    pubDate: string;
    image_url: string; 
    source_id: string;
    source_priority: number;
    source_name: string; 
    source_url: string;
    source_icon: string;
    language: string; 
    country: string[];
    category: string[];
    at_tag: string[]; 
    at_region: string[]; 
    at_org: null;
    sentinent: string;
    sentiment_stats: Sentimentstats;
    duplicate: boolean;
}

interface Sentimentstats {
    positive: number;
    neutral: number;
    negative: number;
}
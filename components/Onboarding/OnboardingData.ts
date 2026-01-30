export interface OnboardingData {
    id: string;
    title: string;
    description: string;
    image?: any;
}

export const ONBOARDING_DATA: OnboardingData[] = [
    {
        id: '1',
        title: 'Discover Information',
        description: 'Stay updated with the latest news from Tchad and around the world, specifically curated for you.',
        image: require('../../assets/images/ti_logo.png'),
    },
    {
        id: '2',
        title: 'Connect Instantly',
        description: 'Join a vibrant community. Share your thoughts and engage in meaningful discussions instantly.',
        image: require('../../assets/images/ti_logo.png'),
    },
    {
        id: '3',
        title: 'Experience Premium',
        description: 'Enjoy a seamless, ad-free reading experience with our premium features designed for comfort.',
        image: require('../../assets/images/ti_logo.png'),
    },
];

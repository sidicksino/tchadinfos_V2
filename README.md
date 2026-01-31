# Welcome to your Expo app

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Live Streaming Configuration

To update the **Live TV** and **Radio** streams, you do NOT need to edit the code. Simply open the `.env` file in the root directory and update the following variables:

```bash
# TV Direct -> Must be an HLS stream (.m3u8)
EXPO_PUBLIC_TV_STREAM_URL=https://your-hls-stream-url.m3u8

# Radio Direct -> Can be MP3, AAC, or standard audio stream
EXPO_PUBLIC_RADIO_STREAM_URL=https://your-radio-stream.mp3
```

> **Note:** After changing the `.env` file, you may need to restart the development server (`npx expo start -c`) for changes to take effect.

## Development & Build Guide

### 1. Initialize EAS (Expo Application Services)
To link your project to EAS, run:

```bash
eas init
```
**Output:**
- Project created for `@sidick102/TchadInfos`
- Project ID: `213ead18-5838-482e-940c-8045a9fe50c2`

### 2. Install Development Client
For native modules support (e.g., `expo-video`, `expo-av`), install the dev client:

```bash
npx expo install expo-dev-client
```

### 3. Configure Build
Generate the `eas.json` configuration file:

```bash
eas build:configure
```
Select **All** platforms when prompted.

### 4. Create Development Build (Android)
To compile a standalone Android build that includes all native libraries:

```bash
eas build --profile development --platform android
```

**Steps:**
- **App ID**: `com.sidick102.TchadInfos`
- **Keystore**: Generated automatically.
- **Result**: You will receive a QR code and link to install the APK on your device.

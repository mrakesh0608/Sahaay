<div id="top" align="center">
  <img src="front-end/assets/icon.png" alt="app-logo"/>
  <h3>Sahaay</h3>
</div>

## Cloning The Repo
- Clone the repo `git clone https://github.com/mrakesh0608/Sahaay.git` or `gh repo clone mrakesh0608/Sahaay`
- Change directory into front-end `cd Sahaay/front-end`
- Install dependencies `npm i`

## Development Build - Android App
- To build development apk
  ```
  npm run build-apk-dev
  ```
- Download development build apk from [Expo dev](https://expo.dev/)
- Install development build app in your Android device.
- - Start metro bundler
  ```
  npm start
  ```
- Start metro bundler with empty cache 
  ```
  npm run start-c
  ```
- Scan the QR code from Metro Bundler with Expo Go (Android) or the Camera app (iOS)

## Production Build - Android App
- To generate production ready apk
  ```
  npm run build-apk
  ```
- Download apk from [Expo dev](https://expo.dev/)
- Install and open app in your Android device.

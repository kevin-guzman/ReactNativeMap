# ReactNativeMap

Dependencies:
Go to folder proyect and write the following commands
- npm install react-native-paper
- npm install react-navigation
- npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
- npm install react-navigation-stack @react-native-community/masked-view react-native-safe-area-context
- npm install react-native-maps --save-exact

And thats all

Runing on android device or emulator:
Once intalled the dependencies you havo to go to the folder proyect and run (you must have connected your android phone or open your 
emulator AVD)
- react-native run-android

How it works?
- Prees on map an you'll go to other screen, in this screen you have to write a name for the marker and a type of hospital. Then you have to 
press on "Guardar marcador" button. Then you could see the marker on the map (The initial region is in my natal city Bogotá Colombia)
- This app send the selected coords to a api and then the app reads the api posts
- There are 4 buttons on the map screen when you press some of these you can see in the map the hospitals that have te info button type

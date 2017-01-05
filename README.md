# Niklas little X-mas project
Test app based on ionic accessing simple web service at x-stress.se

## result
App that communicates with a webservice (a bit dirty but to prove technique)

- App relyies on Ionic-framework and is built for android but an ios version can be built from same source provided that one have a Mac
- App takes notes that are added to a centrally stored list shared by all phones running app
- App notes geolocation where notes are created and provides realtime dist and dir to other notes (silly but to prove access to GPS)
- App is also able to scan barcodes and add to the list
- This extemely tiny app is almost usable as a chat-app, post-wall-app or what-to-by-app with some modifications.
- The parts of the app related to Niklas-lista is around 1-2 days of work


To test
- Install attached apk file at an Android (for IOS, clone source from github https://github.com/niklas-holmstrand/test-ionic.git, install ionic and build installation kit)
- When app starts, go to tab "nlist" (app is initially based from youtube tutorial https://www.youtube.com/watch?v=ilM8YorL_jI, therefore it opens with a reddit snapshot)
- Add items (manual text or barcode read) and delete items. Follow geographic vector to other notes in list.
- List is also available at http://www.x-stress.se/niktest/index.html

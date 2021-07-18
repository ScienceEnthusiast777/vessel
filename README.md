# vessel

deployed version: https://the-vessel.herokuapp.com/
</br>
A prototype for an application that hosts a randomly generated card game built with user input. 
Users can upload images to have them generated into cards with random attributes, and create and share rule systems with others. The purpose of this project
was mainly to learn how to manipulate image files with a package called Jimp (https://www.npmjs.com/package/jimp?activeTab=readme) 
</br>
<img src="https://github.com/atrathbone/atrathbone/blob/main/Vessel-screengrab.PNG?raw=true" height="75%" width="75%"/>
</br>
</br>
Users can create an account and once logged in can upload an image in the 'furnace' section. This gets uploaded and processed in to a card
using Jimp to create a composite image from various randomly generated elements (as well as the username) in the backend, 
and then stored directly in the database.
</br>
<img src="https://github.com/atrathbone/atrathbone/blob/main/Vessel-screengrab1.PNG?raw=true" height="35%" width="35%"/>
</br>
</br>
In the 'offerings' section users can request and offering- meaning that they can request a randomly generated sheet of 9 cards as a printable image file.
</br>
<img src="https://github.com/atrathbone/atrathbone/blob/main/Vessel-screengrab2.PNG?raw=true" height="35%" width="35%"/>
</br>
</br>
The 'rule systems' section allows users to create rule sets, and also to extend those created by others, as well as edit any that they originally created. 
When a users rule set is extended they will see a small flag to alert them and they can either approve or reject the extension- and the extension will 
become marked in the database accordingly.


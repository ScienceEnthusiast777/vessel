# vessel

A prototype for an application that hosts a randomly generated card game built with user input. 
Users can upload images to have them generated into cards with random attributes, and create and share rule systems with others.

Users can create an account and once logged in can upload an image in the 'furnace' section. This gets uploaded and processed in to a card
using Jimp to create a composite image from various randomly generated elements (as well as the username) in the backend, 
and then stored directly in the database.

In the 'offerings' section users can request and offering- meaning that they can request a randomly generated sheet of 9 cards as a printable image file.

The 'rule systems' section allows users to create rule sets, and also to extend those created by others, as well as edit any that they originally created. 
When a users rule set is extended they will see a small flag to alert them and they can either approve or reject the extension- and the extension will 
become marked in the database accordingly.


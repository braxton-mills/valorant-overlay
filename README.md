# Valorant Overlay

[![https://github.com/fill30/valorant-overlay/blob/master/LICENSE](https://img.shields.io/github/license/fill30/valorant-overlay)](https://github.com/fill30/valorant-overlay/blob/master/LICENSE)  
This is an overlay for the Riot game VALORANT. It is written as a NodeCG Bundle.

![Example 1](https://i.imgur.com/FwQ0vqc.png)

## How it works

The overlay consists of 3 sections:

- Graphics
- Dashboard
- NodeCG (backend)

#### Graphics

The graphics are written in HTML, CSS and Javascript. It can be added into OBS as a simple browser source like most overlays. The graphics are updated through NodeCG Replicants which will change the data everytime it is changed in the dashboard.

Graphics elements:

- Team Names
- Player Names
- Images of which character each player is playing as

#### Dashboard

The dashboard panels that get added to NodeCG, as shown [here](https://i.imgur.com/LlW6qvl.png), are written in HTML, CSS and Javascript. This is how the user changes the data shown in the graphics. Remember data will only update when the "Set" button is pressed.

#### NodeCG

You can learn more about NodeCG on their website. [nodecg.com](https://nodecg.com)

## Setup

This can be added into any broadcast software (e.g. OBS, Xsplit, vMix) as a browser source.

1. Start by making sure you have [NodeJS and NPM](https://nodejs.org/en/download/) installed.
2. Now you need to download an instance of NodeCG v^1.50. The easiest way is through the nodecg-cli. Start by running 'npm install --global nodecg-cli' to install the nodecg-cli. Then make a folder for NodeCG and in the folder run 'nodecg setup'.
3. When you have an instance of NodeCG you can now download the bundle by navigating to the 'bundles' folder and then cloning the github repository, run 'git clone https://github.com/fill30/valorant-overlay.git'.
4. Start NodeCG by going back into the NodeCG folder and running 'npm start' or 'nodecg start'.
5. If NodeCG has started correctly you should now be able to go to http://localhost:9090/ to access the dashboard and graphics.

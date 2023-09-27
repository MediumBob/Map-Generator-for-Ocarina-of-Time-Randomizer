# Map Generator for Ocarina of Time Randomizer
**WARNING: This project is still in development!**

# Description
This tool visualizes the randomized map generated with the [Ocarina of Time Randomizer](https://ootrandomizer.com/) v7.1 (by TestRunner et al.) given a seed's spoiler file.

# Usage Instructions
1.  **Generate a seed.**
    1. Navigate to the [Ocarina of Time Randomizer Web Generator](https://ootrandomizer.com/) (by dragonbane0 and TreZc0_) and select "Play Now". Adjust the randomization rules as desired then select "GENERATE SEED!" at the bottom of the page.
    2. On the following page, click "BROWSE" to select your Ocarina of Time base ROM (file with .n64 extension), then scroll down and select "PATCH ROM!".
    3. ***BE SURE to save the spoiler file before closing out of this window!*** You'll find this option below the "PATCH ROM!" button.

![Screenshot](./assets/images/save-spoiler-log.png)

>**NOTE: If you forgot to download your spoiler, you can refer to the [OoT Randomizer FAQ](https://wiki.ootrandomizer.com/index.php?title=Frequently_Asked_Questions#How_Do_I_Find_My_Spoiler_Log_Again.3F) on how to recover it.**

Once you have saved your spoiler file and patched your ROM, you may close out of the randomizer window.

2. **Upload your seed.**
    1. **Navigate to the [OoT_RandomizerMappingTool](url goes here)**, (hosted on Github Pages).
    2. **Click the "Browse..." button** at the top of the page to upload the spoiler for your seed (file with .json extension).
    3. The tool should then generate a graph of your map in the central window of the page.

3. **Navigate your seed.**
   1. Use the search bar to highlight a region in your graph.
   2. Use the path finder to highlight paths from one region to another.
   3. Click on a node to display the node details in the panel on the right.


# Other Notes
* ***Spoilers generated with Ocarina of Time Randomizer versions prior to 7.1 are not guaranteed to work***. The developers have changed (and may continue to change) the naming conventions for the spoiler information, and the current parser does not include region names from older versions of the OoT Randomizer.
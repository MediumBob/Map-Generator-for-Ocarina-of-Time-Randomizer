![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/MediumBob/Map-Generator-for-Ocarina-of-Time-Randomizer/test.yml)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/mediumbob/Map-Generator-for-Ocarina-of-Time-Randomizer/main)
![GitHub](https://img.shields.io/github/license/mediumbob/Map-Generator-for-Ocarina-of-Time-Randomizer)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/mediumbob/Map-Generator-for-Ocarina-of-Time-Randomizer/main)

![GitHub issues](https://img.shields.io/github/issues/mediumbob/Map-Generator-for-Ocarina-of-Time-Randomizer)
![GitHub closed issues](https://img.shields.io/github/issues-closed/mediumbob/Map-Generator-for-Ocarina-of-Time-Randomizer?label=%20&color=green)

# Map Generator for Ocarina of Time Randomizer
**WARNING: This project is still in development!**

# Description
This tool generates an interactive network graph of the randomized map created with the [Ocarina of Time Randomizer](https://ootrandomizer.com/) v7.1 (by TestRunner et al.) given a seed's spoiler file.

# Usage Instructions

1. **Go to the [Map Generator](https://mediumbob.github.io/Map-Generator-for-Ocarina-of-Time-Randomizer/)**.
2. **Upload your spoiler JSON.**
>Didn't download your spoiler? Don't worry! The [OoT Randomizer FAQ](https://wiki.ootrandomizer.com/index.php?title=Frequently_Asked_Questions#How_Do_I_Find_My_Spoiler_Log_Again.3F) has options to recover your spoiler. 


3. **Behold your map and navigate your seed!**
   1. Use the **search bar** to highlight a region in your graph.
   2. Use the **path finder** to highlight paths from one region to another.
   3. Click on a node or edge to show its **details and properties**.
>Haven't generated a seed yet? Go to the [Ocarina of Time Randomizer Web Generator](https://ootrandomizer.com/) (by dragonbane0 and TreZc0_) to generate a new seed. If you need help, refer to the "Instructions" tab at the top of the [Map Generator](https://mediumbob.github.io/Map-Generator-for-Ocarina-of-Time-Randomizer/).


# Other Notes
* ***Spoilers generated with Ocarina of Time Randomizer versions prior to 7.1 are not guaranteed to work***. The developers have changed (and may continue to change) the naming conventions for the spoiler information, and the current parser does not include region names from older versions of the OoT Randomizer.
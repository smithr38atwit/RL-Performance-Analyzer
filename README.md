# RL-Performance-Analyzer
## Setup
Run the "setup.ps1" script to create the necessary environments and install dependencies.
If you cannot run this file, you will need to change your execution policy (e.g. to change policy to remote signed, run powershell as administrator and type ```Set-ExecutionPolicy -ExecutionPolicy RemoteSigned```).
You will also need to make sure you have Python 3.11 installed.
Once the setup script has finished running, you will need to get an API token from ballchasing:
### Set up your Ballchasing API token
1. Go to [ballchasing](https://ballchasing.com/upload) and sign in with steam. If you do not have a steam account, you can contact me at smithr38@wit.edu and I will provide you with a token.
2. Generate an upload token
3. Paste the token in the provided space in ".env"
## Usage
1. Run the script "run.ps1" to start the program.
2. Enter the name of the player you want to analyze.
3. You can add up to 3 players to compare, and switch between them with the dropdown.

![usage_demo](https://user-images.githubusercontent.com/54961768/231275696-19b8125a-41bb-4d68-bcf8-cbdc9cdc125e.gif)

The offense and defense scores are calculated based on several stats from the plaers most recent replay, which are compared with the stats of the other players in the lobby. The overall score is just an average of the two, which can be scaled based on miscellaneous factors.

## Licensing
This project is licensed under the terms of the MIT license.

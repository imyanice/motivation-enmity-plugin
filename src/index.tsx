import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React } from 'enmity/metro/common';
import { getByProps } from 'enmity/metro';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';
import { ApplicationCommandInputType, 
    ApplicationCommandOptionType, 
    ApplicationCommandType, 
    Command 
} from "enmity/api/commands";
import { sendReply } from "enmity/api/clyde";
import fetch from "node-fetch";

const Motivation: Plugin = {
   ...manifest,

   onStart() {
     const motivation: Command = {
  id: "motivation-command",
  name: "motivation",
  displayName: "motivation",
  description: "Sends a motivational message to you :)",
  displayDescription: "Sends a motivational message to you :)",
      
  type: ApplicationCommandType.Chat,
  inputType: ApplicationCommandInputType.BuiltIn,

  execute: async function (args, message) : Promise<void> {
    const channelId = message.channel.id;
    const quote: Array = fetch("https://raw.githubusercontent.com/Yan-Jobs/quotes/main/motivation/index.json");
    const randomIndex = Math.floor(Math.random() * quote.length); 
    const randomElement: string = quote[randomIndex];
    sendReply(channelId, randomElement)
    
  }
};
     this.commands = [motivation]
   },

   onStop() {
     this.commands = []
   },
};

registerPlugin(Motivation);

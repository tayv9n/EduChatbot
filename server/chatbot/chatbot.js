const { OpenAI } = require("openai");
const fs = require('fs');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

class ChatBot {
    constructor(users, topic, botname='ChatZot', assertiveness=2) {
        this.users = users
        console.log(this.users);
        console.log(typeof(this.users));
        this.topic = topic
        this.initialQuestion = '';
        this.botname = botname;
        this.assertiveness = assertiveness;

        console.log("initialized variables");

        this.messageRatios = [];
        this.countPerUser = [];
        this.messageCount = 0;

        this.behaviorPrompt = readFileContent("chatbot/behavior_prompt.txt");
        this.chimePrompt = readFileContent("chatbot/chime_prompt.txt");
        this.participationPrompt = readFileContent("chatbot/participation_prompt.txt");

        this.behaviorPrompt = this.behaviorPrompt.replace("{{users}}", users.toString());
        this.behaviorPrompt = this.behaviorPrompt.replace("{{topic}}", topic);
        this.chimePrompt = this.chimePrompt.replace("{{botname}}", botname);

        this.behaviorMessages = [{role: "system", content: this.behaviorPrompt}];
        this.chimeMessages = [{role: "system", content: this.chimePrompt}];

        console.log("Object constructed. Now initialize Prompts.")
        // return initial question
        

        // Initialize ChatBot
        // Needs to know the names of users in lobby
        // Needs the topic of the discussion

        // Variables:
        // messageBacklog: all the messages that have been send but not sent in api call
        // userList: names of users
        // messageRatios: ratios of users and their participation
        // messageCount: count of messages

    }

    async initializePrompting() {
        try {

            console.log("starting question generation...");
            
            let completion = await openai.chat.completions.create({
                messages: this.behaviorMessages,
                model: "gpt-3.5-turbo-1106",
            });

            console.log("question generated.");

            this.initialQuestion = completion.choices[0].message.content;

            this.behaviorMessages.push({role: "assistant", content: completion.choices[0].message.content});

        } catch (error) {
            console.error('An error occurred:', error.message);
            return 0;
        } return 1;
    }

    async botMessageListener(user, message) {
        // Recieves messages as input and decides whether to respond
        let lowParticipationUser = this.participationTracker(user);

        this.chimeMessages.push({role: "user", name: user, content: message})
        this.behaviorMessages.push({role: "user", name: user, content: message})
        
        try {
            let completion  = await openai.chat.completions.create({
                messages: this.chimeMessages,
                model: "gpt-3.5-turbo-1106"
            })

            console.log(completion.choices[0].message.content);

            if (completion.choices[0].message.content == "...") {
                this.chimeMessages.push({role: "assistant", content: "..."});
                
                if (lowParticipationUser) {
                    let response = await this.sendMessage(1, user=user);
                    return response;
                }

            } else {
                this.chimeMessages.push({role: "assistant", content: "CHIME."});
                let response = await this.sendMessage(0);
                return response;
            }
        } catch (error) {
            // ERROR
            return 0;
        }
    }

    participationTracker(userName) {
        // refreshes ratios and checks if someone isnt participating enough
        // if not, 

        const index = this.users.indexOf(userName);
        if (index === -1) {
          // ERROR
        }

        this.messageCount++;

        this.countPerUser[index] += 1;
    
        // Update ratios
        for (let i = 0; i < this.users.length; i++) {
          this.messageRatios[i] = this.countPerUser[i] / this.messageCount;
        }
    
        // Check for ratios less than 0.05
        for (let i = 0; i < this.users.length; i++) {
          if (this.messageRatios[i] < 0.05) {
            return this.users[i];
          }
        }
        return null;
    }

    startConclusion() {
        // Alert if time is running out, starts the conclusion phase  vb
    }

    inactivityResponse() {
        // when no one has sent a message in a while
    }

    async sendMessage(messageCase, user="") {
        // recieves input and sends response to groupchat
        switch (messageCase) {
            case 0:
                let completion  = await openai.chat.completions.create({
                    messages: this.behaviorMessages,
                    model: "gpt-3.5-turbo-1106"
                });

                this.behaviorMessages.push({role: "assistant", content: completion.choices[0].message.content});

                return completion.choices[0].message.content;

            case 1:
                // Participation prompt. replace with students name
                let participationPromptSpecific = this.participationPrompt.replace("{{user}}", user)
                this.behaviorMessages.push({role: "system", content: participationPromptSpecific});

                let completion1  = await openai.chat.completions.create({
                    messages: this.behaviorMessages,
                    model: "gpt-3.5-turbo-1106"
                });

                this.behaviorMessages.push({role: "assistant", content: completion.choices[0].message.content});

                return completion1.choices[0].message.content;

            case 2:
                return "not implemented";
            case 3:
                return "not implemented";

        }

        // 0: chime 
        // 1: participation
        // 2: conclusion
        // 3: inactivity
    }

    getInitialQuestion() {
        return this.initialQuestion;
    }
}

module.exports = ChatBot;

function readFileContent(fileName) {
  try {
    const fileContent = fs.readFileSync(fileName, 'utf8');
    return fileContent;
  } catch (err) {
    console.error('Error reading the file:', err);
    return null;
  }
}

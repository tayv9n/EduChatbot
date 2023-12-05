const { OpenAI } = require("openai");
const fs = require('fs');

const openai = new OpenAI({
    apiKey: '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'
});

class ChatBot {
    constructor(users, topic) {
        this.users = users
        this.topic = topic
        this.initialQuestion = '';

        console.log("initialized variables");

        this.messageRatios = [];
        this.countPerUser = [];
        this.messageCount = 0;

        this.behaviorPrompt = readFileContent("behavior_prompt.txt");
        this.chimePrompt = readFileContent("chime_prompt.txt");

        this.behaviorPrompt = this.behaviorPrompt.replace("{{users}}", users.toString());
        this.behaviorPrompt = this.behaviorPrompt.replace("{{topic}}", topic);
        this.chimePrompt = this.chimePrompt.replace("{{botname}}", "ChatZot"); // NEED TO ADD BOT NAME

        console.log(this.behaviorPrompt);

        this.behaviorMessages = [];
        this.chimeMessages = [{role: "system", content: this.chimePrompt}];
        this.behaviorMessages.push({role: "system", content: this.behaviorPrompt});

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

    destructor() {

        //Deleting bots
        //openai.beta.assistants.del(this.behaviorLayer.id).then((e) => {console.log(e);});
        //openai.beta.assistants.del(this.chimeLayer.id).then((e) => {console.log(e);});

        //Deleting threads
        //openai.beta.threads.del(this.behaviorLayerThread.id).then((e) => {console.log(e);});
        //openai.beta.threads.del(this.chimeLayerThread.id).then((e) => {console.log(e);});
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
                this.behaviorMessages.push({role: "system", content: "PARTICIPATION PROMPT"});

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

    getInitialQuestion(mode) {
        if (mode == 0) {
            return this.initialQuestion;
        } else if (mode == 1) {

            // SOCKET IO SEND MESSAGE

            return this.initialQuestion;
        }
    }

    async waitForRunCompletion(threadId, runId) {
        let runStatus = null;
    
        do {
            const run = await openai.beta.threads.runs.retrieve(threadId, runId);
            runStatus = run.status;
            if (runStatus !== 'completed') {
                // Wait for some time before checking again
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
            }
        } while (runStatus !== 'completed');
    
        return runStatus;
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

let userlist = ['Tariq', 'Tay', 'Kai', 'Neeraja', 'Kevin'];
let messRatio = [0.2, 0.1, 0.2, 0.2, 0.3];

bot = new ChatBot(userlist, 'AI');
bot.messageRatios = messRatio;
bot.messageCount = 20;

bot.participationTracker('Tariq');
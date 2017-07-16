"use strict";

const Alexa = require("alexa-sdk");

var APP_ID = "amzn1.ask.skill.b974e95a-f6c9-4648-b487-e0e62726aa2c";
var SKILL_NAME = "Even Checker";

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    "LaunchRequest": function () {
        console.log("went in newsession function");
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes["speechOutput"] = "Welcome to " + SKILL_NAME + ". You can say: is 1256 even? Please tell me a number you would like to check the even status of";
        this.attributes["repromptSpeech"] = "To find the even status of a number, say something like: is 103 even?";
        this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptSpeech"]);
    },
    "evenChecker": function () {
        console.log("went in evenChecker function");
        console.log("this.event.request.intent.slots.number.value: " + this.event.request.intent.slots.number.value);
        var number = 1;
        if(this.event.request.intent.slots.number.value != undefined) {
            number = this.event.request.intent.slots.number.value;
            if(number == undefined) {
              this.emit("Unhandled");
            }
            else{
              if(number == 0) {
                this.emit(":tell", "0 is neither an even nor an odd number.");
              }
              else {
                var isEven = number % 2 == 0;
                if(isEven) {
                  this.emit(":tell", number + " is an even number.");
                }
                else {
                  this.emit(":tell", number + " is not an even number, it is an odd number.");
                }
              }
            }
        }
        else if(this.event.request.intent.slots.number.value == undefined){
                console.log("numbers details undefined logic");
                this.emit("Unhandled");
        }
        else if(this.event.request.intent.slots.number.value == "help" || this.event.request.intent.slots.stateQ.value == "help"){
                console.log("help if logic");
                this.attributes["speechOutput"] = "Welcome to " + SKILL_NAME + ". You can say: is 45 even? Please tell me a number you would like to check the even status of";
                this.attributes["repromptSpeech"] = "To find the even status of a number, say something like: is 122 even?";
                this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptSpeech"]);
        }
        else{
          // If the user either does not reply to the welcome message or says something that is not
          // understood, they will be prompted again with this text.
          this.attributes["speechOutput"] = "Welcome to " + SKILL_NAME + ". You can say: is 7890 even? Please tell me a number you would like to check the parity of.";
          this.attributes["repromptSpeech"] = "To get an octopus recipe, say something like: is 6 even?";
          this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptSpeech"]);
        }
    },
    "AMAZON.HelpIntent": function() {
        console.log("went in Amazon.HelpIntent");
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes["speechOutput"] = "Welcome to " + SKILL_NAME + ". You can say: is 7890 even or odd? Please tell me a number you would like to check the parity of.";
        this.attributes["repromptSpeech"] = "To get an octopus recipe, say something like: is 6 even or odd?";
        this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptSpeech"]);
    },
    "AMAZON.StopIntent": function () {
        this.emit("SessionEndedRequest");
    },
    "AMAZON.CancelIntent": function () {
        this.emit("SessionEndedRequest");
    },
    "SessionEndedRequest":function () {
        this.emit(":tell", "Goodbye!");
    },
    "Unhandled": function() {
        this.emit(":tell", "Sorry, I was unable to understand and process your request. Please try again.");
        this.emit("SessionEndedRequest");
    }
};

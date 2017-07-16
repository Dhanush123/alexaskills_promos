"use strict";

var Alexa = require("alexa-sdk");

var APP_ID = "amzn1.ask.skill.e65f6718-573d-415a-b76e-6d7625f09e7a"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = "Exponents Calculator";

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    "LaunchRequest": function () {
        console.log("went in LaunchRequest function");
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes["speechOutput"] = "Welcome to " + SKILL_NAME + ". You can ask a question like, what is " + "2 to the power of 5? Please tell me two numbers you would like to find the product of.";

        this.attributes["repromptSpeech"] = "To find a product, say something like: what is 12 to the power of 3?";
        this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptSpeech"])
    },
    "exponentsCalculator": function () {
        console.log("went in powerCalculator function");

        if(this.event.request.intent.slots.base.value!=undefined && this.event.request.intent.slots.exp.value!=undefined){
            var base = this.event.request.intent.slots.base.value;
            var exp = this.event.request.intent.slots.exp.value;
            if(base == undefined || exp == undefined){
                this.emit("Unhandled")
            }
            else{
                console.log(base+"^"+exp);
                this.emit(":tell", base + " to the power of " + exp + " is " + Math.pow(base, exp) + ".");
            }
        }
        else if((this.event.request.intent.slots.base.value==undefined && this.event.request.intent.slots.exp.value!=undefined) || (this.event.request.intent.slots.base.value!=undefined && this.event.request.intent.slots.exp.value==undefined)){
                console.log("only one of two numbers defined logic");
                this.emit("Unhandled");
        }
        else if(this.event.request.intent.slots.base.value =="help" || this.event.request.intent.slots.exp.value =="help"){
                console.log("help if logic");
                this.emit("HelpMe");
        }
        else{
          this.attributes["speechOutput"] = "Welcome to " + SKILL_NAME + ". You can ask a question like, what is " + "2 to the power of 5? Please tell me two numbers you would like to find the product of.";
          this.attributes["repromptSpeech"] = "To find a product, say something like: what is 12 to the power of 3?";
          this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptSpeech"])
        }
    },
    "AMAZON.HelpIntent": function() {
        console.log("went in Amazon.HelpIntent");
        this.attributes["speechOutput"] = "You can ask a question like, what is " + "6 to the power of 4? Please tell me two numbers you would like to find the product of.";
        this.attributes["repromptSpeech"] = "To find a product, say something like: what is 11 to the power of 12?";
        this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptSpeech"])
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
    },
    "HelpMe": function() {
        console.log("went in HelpMe");
        this.attributes["speechOutput"] = "You can ask a question like, what is " + "5 to the power of 3? Please tell me two numbers you would like to find the product of.";
        this.attributes["repromptSpeech"] = "To find a product, say something like: what is 10 to the power of 4?";
        this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptSpeech"])
    }
};

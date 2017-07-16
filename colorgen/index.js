"use strict";

var Alexa = require("alexa-sdk");
var random = require("random-js")(); // uses the nativeMath engine

var APP_ID = "amzn1.ask.skill.7f291af7-2aa0-4b97-a864-af669abb4eea"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = "Color Gen";

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
        this.attributes["speechOutput"] = "Welcome to " + SKILL_NAME + ". You can say something like give me a RGB color.";
        this.attributes["repromptSpeech"] = "To get a random RGB color code, say something like, give me a RGB color.";
        this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptSpeech"])
    },
    "getRGB": function () {
        console.log("went in getRGB function");
        var red = random.integer(0, 255);
        var green = random.integer(0, 255);
        var blue = random.integer(0, 255);
        this.emit(":tell","A random RGB color is: " + red + " comma " + green + " comma " + blue);
    },
    "AMAZON.HelpIntent": function() {
      console.log("went in Amazon.HelpIntent");
      // If the user either does not reply to the welcome message or says something that is not
      // understood, they will be prompted again with this text.
      this.attributes["speechOutput"] = "You can say something like, tell me a random color."
      this.attributes["repromptSpeech"] = "You can say something like, tell me a random color."
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
};

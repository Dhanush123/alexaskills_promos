"use strict";

const Alexa = require("alexa-sdk");

var APP_ID = "amzn1.ask.skill.929913d2-e693-44e2-aff7-b0ada65a8268";
var SKILL_NAME = "Octopus Recipes";

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
    //hope
};

var handlers = {
    "LaunchRequest": function () {
        console.log("went in newsession function");
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes["speechOutput"] = "Welcome to " + SKILL_NAME + ". You can say: give me an octopus recipe? Please tell me if you would like an octopus recipe.";
        this.attributes["repromptSpeech"] = "To get an octopus recipe, say something like: give me an octopus recipe.";
        this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptSpeech"]);
    },
    "recipesGet": function () {
        console.log("went in recipesGet function");
        var recipes = [
          "You can boil octopus over low-heat and slightly salted water.",
          "You can put octopus bits in a spicey cake mix for a delicious treat.",
          "Octopus soup is a great option for the cold weather! Just mix it in boiling water with soy sauce.",
          "Grilled octopus tastes great. Sprinkle bread crumbs on it and grill it on your stove for 10 minutes at medium heat."
        ];
        this.emit(":tell",recipes[Math.floor(Math.random() * 4)]); //Math.floor(Math.random() * (max - min + 1)) + min
    },
    "AMAZON.HelpIntent": function() {
        console.log("went in Amazon.HelpIntent");
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes["speechOutput"] = "Welcome to " + SKILL_NAME + ". You can say: tell me an octopus recipe? Please tell me if you would like an octopus recipe.";
        this.attributes["repromptSpeech"] = "To get an octopus recipe, say something like: tell me an octopus recipe.";
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

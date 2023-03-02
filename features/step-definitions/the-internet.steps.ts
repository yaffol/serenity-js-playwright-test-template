import { Given, Then, When } from '@cucumber/cucumber';
import { Actor, actorInTheSpotlight, Log, notes } from '@serenity-js/core';
import { Navigate } from '@serenity-js/web';

import { MyNotes } from '../../test/Actors'
import { Authenticate, VerifyAuthentication } from '../../test/authentication';
import { PickExample } from '../../test/examples';

/**
 * Below step definitions use Cucumber Expressions
 * see: https://cucumber.io/docs/cucumber/cucumber-expressions/
 *
 * {actor} and {pronoun} are custom expressions defined under support/parameters.ts
 */
Given('{actor} starts with the {string} example', async (actor: Actor, exampleName: string) =>
    actor.attemptsTo(
        Navigate.to('/'),
        PickExample.called(exampleName),
    )
);

Given('{actor} starts on the keymanager landing page', async (actor: Actor) =>
    actor.attemptsTo(
        Navigate.to('/keymanager'),
    )
);

When('{pronoun} log(s) in using {string}', async (actor: Actor, credentials: string) => {
    switch (credentials) {
        case 'valid': {
            return actor.attemptsTo(
                Log.the(credentials),
                Log.the(notes<MyNotes>().has('auth')),
                Log.the(notes<MyNotes>().get('auth')),
                Authenticate.using(notes<MyNotes>().get('auth').username, notes<MyNotes>().get('auth').password),
            )
        }
        case 'invalid': {
            return actor.attemptsTo(
                Authenticate.using('bad', 'creds')
            )
        }
    }
    return 
}
);

/**
 * If you need to use a RegExp instead of Cucumber Expressions like {actor} and {pronoun}
 * you can use actorCalled(name) and actorInTheSpotlight() instead
 *
 *  see: https://serenity-js.org/modules/core/function/index.html#static-function-actorCalled
 *  see: https://serenity-js.org/modules/core/function/index.html#static-function-actorInTheSpotlight
 */
Then(/.* should see that authentication for {string} has (succeeded|failed)/, async (username: string, expectedOutcome: string) =>
    actorInTheSpotlight().attemptsTo(
        VerifyAuthentication[expectedOutcome](username),
    )
);

Then('{pronoun} should see that authentication for {string} has {string}', async (actor: Actor, username: string, expectedOutcome: string) =>
    actorInTheSpotlight().attemptsTo(
        VerifyAuthentication[expectedOutcome](notes<MyNotes>().get('auth').username),
    )
);


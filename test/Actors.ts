import { Actor, Cast, Notepad, TakeNotes } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright, PlaywrightOptions } from '@serenity-js/playwright';
import * as playwright from 'playwright';

import { AuthenticateViaUI } from './abilities/AuthenticateViaUI';

interface AuthCredentials {
    username?: string;
    password?: string;
}

export interface MyNotes {
    auth: AuthCredentials;
}
export class Actors implements Cast {
    constructor(
        private readonly browser: playwright.Browser,
        private readonly options: PlaywrightOptions,
    ) {
    }

    prepare(actor: Actor): Actor {
        switch (actor.name) {
            case 'Alice': {
                return actor.whoCan(
                    BrowseTheWebWithPlaywright.using(this.browser, this.options),
                    AuthenticateViaUI.using({ username: 'test@user.com', password: 'pwdPWD1!' }),
                    TakeNotes.using(
                        Notepad.with<MyNotes>({
                            auth: {
                                username: 'test@user.com',
                                password: 'pwdPWD1!'
                            }
                        })
                    )
                )
                break;
            }
        }
        return actor.whoCan(
            BrowseTheWebWithPlaywright.using(this.browser, this.options)
        );
    }
}

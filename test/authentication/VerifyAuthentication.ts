import { Ensure, equals, includes } from '@serenity-js/assertions';
import { Log, Task } from '@serenity-js/core';
import { By, isVisible, PageElement, Text } from '@serenity-js/web';

/**
 * VerifyAuthentication aggregates several tasks to make them easier to find:
 * - VerifyAuthentication.succeeded()
 * - VerifyAuthentication.failed()
 *
 * Note how both those tasks reuse VerifyAuthentication.hasFlashAlert()
 * to avoid code duplication.
 */
export class VerifyAuthentication {
    private static hasFlashAlert = () =>
        Task.where(`#actor verifies that flash alert is present`,
            Ensure.that(FlashMessages.flashAlert(), isVisible()),
        )

    private static hasUserMenu = () => {
        return  Task.where(`#actor verifies that user menu is present`,
            Ensure.that(UserMenu.userMail(), isVisible())
        )
    }

    private static hasErrorMessage = () => {
        return Task.where(`#actor verifies that error message is present`,
            Ensure.that(LoginPage.errorMessage(), isVisible())
        )
    }

    static succeeded = (username: string) =>
        Task.where(`#actor verifies that authentication has succeeded`,
            VerifyAuthentication.hasUserMenu(),
            Ensure.that(Text.of(UserMenu.userMail()), equals(username)),
        )

    static failed = () =>
        Task.where(`#actor verifies that authentication has failed`,
            VerifyAuthentication.hasErrorMessage(),
            Ensure.that(Text.of(LoginPage.errorMessage()), includes('Invalid username or password.')),
        )
}

/**
 * A tiny Lean Page Object, representing the flash messages
 * that show up when the user logs submits the authentication form.
 */
const FlashMessages = {
    flashAlert: () =>
        PageElement.located(By.id('flash')).describedAs('flash message'),
}

const UserMenu = {
    userMail: () =>
        PageElement.located(By.id('user-menu')).describedAs('user menu')
}

const LoginPage = {
    errorMessage: () =>
        PageElement.located(By.id('input-error')).describedAs('login error message')
}
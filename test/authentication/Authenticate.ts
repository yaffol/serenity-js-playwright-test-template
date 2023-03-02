import { Answerable, Task } from '@serenity-js/core';
import { By, Click, Enter, PageElement } from '@serenity-js/web';

/**
 * This is called a "Task".
 * Use tasks to compose a sequence of one or more activities and give them domain meaning.
 *
 * Here, the actor performs three activities:
 * - enter username
 * - enter password
 * - click on the login button
 *
 * This sequence of activities together means to "log in"
 */
export const Authenticate = {
    using: (username: Answerable<string>, password: Answerable<string>) =>
        Task.where(`#actor logs in as ${ username }`,
            Enter.theValue(username).into(LoginForm.usernameField()),
            Enter.theValue(password).into(LoginForm.passwordField()),
            Click.on(LoginForm.loginButton()),
        ),
}

/**
 * This is called a "Lean Page Object".
 * Lean Page Objects describe interactive elements of a widget.
 * In this case, the login form widget at https://the-internet.herokuapp.com/login
 */
const LoginForm = {
    usernameField: () =>
        PageElement.located(By.css('[name="username"]')).describedAs('username field'),

    passwordField: () =>
        PageElement.located(By.css('[name="password"]')).describedAs('password field'),

    loginButton: () =>
        PageElement.located(By.css('[name="login"]')).describedAs('login button'),
}

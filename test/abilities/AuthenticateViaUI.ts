import { Ability, actorCalled, actorInTheSpotlight, Interaction } from '@serenity-js/core'
import { Authenticate } from '../authentication/Authenticate'

type Credentials = { username?: string, password?: string}

export class AuthenticateViaUI extends Ability {
  static using(credentials: Credentials) {
    return new AuthenticateViaUI(credentials)
  }

  protected constructor(private readonly credentials: Credentials) {
    super()
  }

  login(): Promise<void> {
    return actorInTheSpotlight().attemptsTo(Authenticate.using(this.credentials.username, this.credentials.password))
  }
}
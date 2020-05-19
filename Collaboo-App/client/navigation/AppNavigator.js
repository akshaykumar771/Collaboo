import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AuthNavigator from './AuthNavigator'
import AppNavigation from './CollabooNavigator'
import CustomerNavigation from './CustomerNavigator'
import AgentNavigation from './AgentNavigator'

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    App: AppNavigation,
    Customer: CustomerNavigation,
    Agent: AgentNavigation
  },
  {
    initialRouteName: 'Auth'
  }
)

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer
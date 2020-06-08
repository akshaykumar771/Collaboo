import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AuthNavigator from './AuthNavigator'
import AppNavigation from './CollabooNavigator'
import CustomerNavigation from './CustomerNavigator'
import AgentNavigation from './AgentNavigator'
import StartUpNavigation from '../screens/StartUpScreen'
const SwitchNavigator = createSwitchNavigator(
  {
    StartUp: StartUpNavigation,
    Auth: AuthNavigator,
    App: AppNavigation,
    Customer: CustomerNavigation,
    Agent: AgentNavigation
  },
  {
    initialRouteName: 'StartUp'
  }
)



const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer
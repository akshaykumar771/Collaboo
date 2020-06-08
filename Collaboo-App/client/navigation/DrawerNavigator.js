
import { createDrawerNavigator } from "react-navigation";
import Colors from "../constants/Colors";
import CustomerDetailScreen from "../screens/CustomerDetailScreen";
const DrawerNavigator = createDrawerNavigator(
  { 
    CustomerDetails: CustomerDetailScreen,
  },
//   {
//     //here you gonna have all the customization for your custom drawer and other things like width of side drawer etc
//     //remove contentComponent: SideMenu and observe the changes
//     drawerType: "slide",
//     drawerWidth: 250,
//     drawerType: "slide",
//   }
{
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      //const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                //dispatch(authActions.logout());
                // props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

export default DrawerNavigator;

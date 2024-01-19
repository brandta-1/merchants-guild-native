import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { pages } from './pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './utils/styles';
import { HeaderNav } from './components/HeaderNav';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (__DEV__) {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}
const Stack = createNativeStackNavigator();

const setAuthLink = setContext((request, previousContext) => ({
  headers: {
    ...previousContext.headers,
    authorization: localStorage.getItem('id_token')
  }
}));

const httpLink = new HttpLink({
  uri: '/graphql',
});


//init GQL client, attach the client's jwt to their requests
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: setAuthLink.concat(httpLink)
  // headers: {
  //   //this needs some kind of useEffect, or dont use localStorage at all for security reasons
  //   authorization: localStorage.getItem('id_token')
  // }
});

export default function App() {

  //managing header buttons at top level means they dont have direct access to the navigation prop
  const navRef = useNavigationContainerRef();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer ref={navRef}>
        <Stack.Navigator initialRouteName='Home' screenOptions={styles.main}>
          
            {pages.map((i, j) => {

              //pull the names of all pages other than the current one
              const others = pages.filter((k) => k.name != i.name).map((l) => l.name);
              return (
                <Stack.Screen
                  key={j}
                  name={i.name}
                  component={i.component}
                  options={{
                    contentStyle: {backgroundColor: "#252525", minHeight: 'auto'},
                    title: i.name,
                    headerLeft: () => null,
                    //the buttons use the ref to wait for the navigators to finish mounting
                    headerRight: () => (<HeaderNav others={others} navRef={navRef} />)
                  }}
                />
              )
            })}
      
        </Stack.Navigator>

        {/* <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/listing' element={<Listing />} />
          </Routes>
        </Router> */}
      </NavigationContainer>
    </ApolloProvider>
  );
}


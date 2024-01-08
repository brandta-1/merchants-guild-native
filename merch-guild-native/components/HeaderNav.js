import { Text, Pressable, View } from 'react-native';
import styles from '../utils/styles';
import Auth from '../utils/auth';

export const HeaderNav = ({ others, navRef }) => {
  
    //array of all pages other than current and Login
    const pages = others.filter((i) => i != 'Login');

    return (
        <>
            <View style={styles.headerButtonsView}>
                {/* change the header buttons if the user logs in */}
                {Auth.loggedIn() ? (
                    <>
                        {
                            pages.map((k, l) => {
                                return (
                                    <Pressable
                                        style={styles.headerButtons}
                                        key={l}
                                        onPress={() => navRef.navigate(k)}
                                    ><Text style={[styles.text, { fontSize: 12 }]}>{k}</Text></Pressable>
                                )
                            })
                        }
                        <Pressable style={styles.headerButtons} onPress={() => {
                            Auth.logout();
                            navRef.navigate('Home')
                        }}><Text style={[styles.text, { fontSize: 12 }]}>Logout</Text></Pressable>
                    </>) : (<>
                      
                        <Pressable style={styles.headerButtons} onPress={() => navRef.navigate('Login')}><Text style={[styles.text, { fontSize: 12 }]}>Login</Text></Pressable>

                    </>)}

            </View>
        </>
    )
}



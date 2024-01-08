import { Text, Pressable, View } from 'react-native';
import styles from '../utils/styles';
import Auth from '../utils/auth';

export const HeaderNav = ({ others, navRef }) => {
   let test = Auth.loggedIn();

   console.log('this is test?', test);
    return (
        <>

            <View style={styles.headerButtonsView}>

                {Auth.loggedIn() ? (
                    <>
                        {
                            others.map((k, l) => {
                                return (
                                    <Pressable
                                        style={styles.headerButtons}
                                        key={l}
                                        onPress={() => navRef.navigate(k)}
                                    ><Text style={[styles.text, { fontSize: 12 }]}>{k}</Text></Pressable>
                                )
                            })
                        }
                    </>) : (<>

                        <Pressable style={styles.headerButtons} onPress={() => navRef.navigate('Login')}><Text style={[styles.text, { fontSize: 12 }]}>Login</Text></Pressable>

                    </>)}

            </View>
        </>
    )
}



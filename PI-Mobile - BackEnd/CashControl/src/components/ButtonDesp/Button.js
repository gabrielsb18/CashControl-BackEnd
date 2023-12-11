import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

export default function Button_Desp_e_Rec () {

    const navigation = useNavigation()

    const [fontsLoaded] = useFonts({
    InterMedium:require('../../../assets/Fonts/InterMedium.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.viewreceitas}>
            <TouchableOpacity onPress= {() => navigation.navigate('ListagemDespEResp') }>
                <View style={styles.receitas}>
                    <Text style = {{fontSize: 20, alignItems:'center',fontFamily: 'InterMedium'}}>Despesas e Receitas</Text>
                    <Image
                    source = {require('../../../assets/Images/seta.png')} style = {styles.imgSeta}/>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    
    viewreceitas:{
        flex: 1,
        width: '100%',
        height: '16%',
        //marginTop: -20, /*margin do topo*/
        //backgroundColor: 'red',
        padding: '5%'
    },

    receitas: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 94,
        backgroundColor: '#75B700',
        borderRadius: 46,
        flexDirection: 'row',
    },
    
    imgSeta: {
        marginLeft: 20
    }
});
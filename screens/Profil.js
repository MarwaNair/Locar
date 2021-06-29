import React, { useEffect, useState } from 'react';
import { StyleSheet,View,Image, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useUser} from '../components/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Profil = ({navigation}) => {

    const { user , setUser } = useUser();

    const [data , setData] = useState( {
        nom: '',
        prenom: '',
        email: '',
        num: '',
        password: ''
      },);
      useEffect(()=>{
        setData( {
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            num: user.num,
            password: user.password,
          },);
      },
      []);
      const handleNomChange =   (val) =>{
        setData({
          ...data,
          nom: val,
        })
      };
  
      const handlePrenomChange =   (val) =>{
        setData({
          ...data,
          prenom: val,
        });
    
      };
      const handleNumChange =   (val) =>{
        setData({
          ...data,
          num: val,
        })
      };
  
  
      const handleEmailChange =   (val) =>{
        setData({
          ...data,
          email: val,
        })
      };

    const handleUpdate = async () => {
        
        setUser(data);
        await AsyncStorage.setItem('user',JSON.stringify(data));

        navigation.goBack();
    };

    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image 
            source={require('../assets/avatar.png')}
            style={styles.avatar} />

            <Text style={{marginTop:hp('-13%'),
                    marginStart:wp('33.5%'),
                    fontSize : wp('8.5%'),
                    fontFamily:'Montserrat-Bold',
                    color: '#FFFFFF',}}> {user.prenom}
            </Text>

            <Image 
            source={require('../assets/profile.png')}
            style={styles.profile}
            resizeMode='contain' />

            <Text style={styles.proText}> Profil</Text>
        </View>



        
      
            <View style={styles.footer}>
             <View style={{flex:4   }}>
                <Image 
                source={require('../assets/avatar.png')}
                style={{marginTop : hp('-5%'),
                        alignSelf : 'center',
                        height: hp('30%'),
                        width: wp('45%')
                        }}
                 />

                 <Text style={{marginTop:hp('-8%'),
                 marginBottom: hp('7%'),
                    fontSize : wp('6%'),
                    fontFamily:'Montserrat',
                    alignSelf: 'center',
                    color: '#000',}}>Modifiez votre profil</Text>
           </View>

                <View style={{bottom:hp('10%'),flex:5}}>
                    <View style={[styles.line, {position: 'absolute' ,bottom: hp("70%") , marginVertical:  hp("2%")}]}></View>
                    <KeyboardAwareScrollView enableOnAndroid={true} style={{ flexGrow: 1 }}>
                    <Text style={styles.Modif}>Nom</Text>
                    <TextInput placeholder='Nom' enablesReturnKeyAutomatically={false} style={styles.Modif2}
                     value={data.nom} onChangeText ={(val) => handleNomChange(val)}/>

                    <View style={styles.sline}></View>

                    <Text style={styles.Modif}>Prenom</Text>
                    <TextInput placeholder='Prénom' style={styles.Modif2}
                     value={data.prenom} onChangeText ={(val) => handlePrenomChange(val)}/>

                    <View style={styles.sline}></View>

                    <Text style={styles.Modif}>E-mail</Text>
                    <TextInput placeholder='E-mail' keyboardType='email-address' autoCompleteType='email' style={styles.Modif2}
                     value={data.email} onChangeText ={(val) => handleEmailChange(val)}/>

                    <View style={styles.sline}></View>

                    <Text style={styles.Modif}>N° de téléphone</Text>
                    <TextInput placeholder='N° de téléphone' keyboardType='phone-pad' autoCompleteType='tel' style={styles.Modif2}
                     value={data.num} onChangeText ={(val) => handleNumChange(val)}/>
                   
                    <View style={styles.line }></View>
                    </KeyboardAwareScrollView>
                </View>

                <View style={{flew:2}} >
                    <TouchableOpacity style={{alignSelf:'center',position:'absolute' , bottom:hp('8%')}}
                    onPress={handleUpdate}>
                        <Image 
                        source={require('../assets/sauvegarder.png')}
                        style={{width:150,height:70,marginTop:hp('2%'),alignSelf:'center',}} 
                        resizeMode='contain'
                        />
                    </TouchableOpacity>


                    <View style={{position:'absolute' ,  bottom:hp('3%')}}>
                        <View style={{borderBottomColor: '#EBEBEB',
                                borderBottomWidth: 2,
                                width: wp('100%'),
                                }}></View>
                        <TouchableOpacity style={{width:wp('10%'), justifyContent:'center' , flexDirection:'column' , alignItems:'center'}} onPress= {() => navigation.goBack()}>
                        <Image 
                        source={require('../assets/ret.png')}
                        style={{alignSelf: 'flex-start',
                        marginTop:hp('2%'),
                        marginStart:wp('4%'),
                        height:hp('2%'),
                        width:wp('8%') ,
                        bottom : hp('0.5%'),  
                        
                        }} 
                        resizeMode='contain'
                        />
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
       
        
    </View>
  );
}

export default Profil;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor:'#ffffff',
       
       
      },  

    header:{ 
        height:hp('20%'),
        width : wp('100%'),
        backgroundColor:'#407CEE',
        borderBottomLeftRadius:45,
        borderBottomRightRadius: 45,
        justifyContent:'flex-start',
        shadowColor:'#000',
        shadowOffset:{
            height:20,
            width:0,
        },
        shadowOpacity:1,
        shadowRadius:20,
        },

    footer:
        {
          height:hp('80%'),
          width:wp('100%'),
          
          
        },

  
  avatar:{
    marginTop:hp('3%'),
    marginStart:wp('-3%'),
    height:hp('14.5%'),
    width:wp('40%') ,},

  text : {
    marginTop:hp('-13%'),
    marginStart:wp('33.5%'),
    fontSize : wp('8.5%'),
    fontFamily:'Montserrat-Bold',
 color: '#FFFFFF',
  },

  proText : {
    marginTop:hp('-3%'),
    marginStart:wp('45%'),
    fontSize : wp('5%'),
    fontFamily:'Montserrat-Bold',
 color: '#FFFFFF',
  },
  profile:{
    marginTop:hp('1.8%'),
    marginStart:wp('36%'),
    height:hp('3%'),
    width:wp('9%') ,
    justifyContent: 'flex-start', 
    },

 Modif:{
     color: '#407CEE',
     fontSize : wp('4%'),
     marginLeft : wp('6%'),
     marginTop: hp('-0.5%'),
     fontFamily:'Montserrat',
 },

 Modif2:{
    color: '#000',
    fontSize : wp('4%'),
    marginLeft : wp('53%'),
    marginBottom: hp('0.5%'),
    marginTop: hp('-1%'),
    top: hp('-3.5%'),
    fontFamily:'Montserrat',
},
line:{
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 2,
    width: wp('100%'),
    top: hp('-3.5%'),
},
sline:{
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 2,
    width: wp('40%'),
    height:hp('-1%'),
    alignSelf:'flex-end',
    right: wp('6%'),
    top: hp('-3.5%'),
}
  
});

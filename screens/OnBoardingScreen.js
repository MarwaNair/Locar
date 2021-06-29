import React from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground,
  } from 'react-native';
  import Onboarding from 'react-native-onboarding-swiper';
  import {windowHeight , windowWidth} from '../constants/size'
  import LinearGradient from 'react-native-linear-gradient';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

   
   
   const skip = ({...props}) => (
  
    <TouchableOpacity style={
      {   flexDirection: 'row', position:'absolute',bottom: hp("92%"), right:wp("4%") }}
      {...props}
      >
  
      <Text style = {
      {
        marginRight:5,
        "fontFamily": "Montserrat-SemiBold",
        "fontSize": 16,
        "textAlign": "center",
        "color": "rgba(66, 121, 239, 255)"
      }
    } > Ignorer </Text>
   
    <Image source={require('../assets/arrow.png')} style={{marginTop: 6}} />
    </TouchableOpacity>
  ); 
  const next = ({...props}) => (
 
   
    <TouchableOpacity style={
      { position:'absolute' , bottom: hp("6%") , paddingHorizontal: wp("12%") ,   alignSelf:'center',}}{...props} > 
    
    <LinearGradient
      
      colors={['#407CEE', '#69ADFA']}
      style={{
        width: wp("64%"),
        height: hp("6%") ,
      borderRadius: 23.5,
      marginTop: 9,
      justifyContent: 'center',
      alignItems:'center',
    
      flexDirection: 'row',
  
      }}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      {...props}
    >
      
      <Text style = {
      {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 20,
        color: "#fff",
        alignSelf:"center",
      
      }
    } > Continuer </Text>
     <View style={{
       alignContent:'flex-end',
       justifyContent:'center'
     }}>
      <Image source={require('../assets/arrow1.png')} style = {
      {
        left:wp("12%"),
        width : 25,
        height : 25,
       
      }
    } />
    </View>
      
    </LinearGradient>
     </TouchableOpacity> 
     

  
  
  ); 

  const OnBoardingScreen = ({navigation}) => {
  

    return (
      <Onboarding
    
      bottomBarHighlight={false}

      titleStyles={ 
        { 
          marginTop : hp('2%'),
          bottom: hp('15%') ,
          "fontFamily": "Montserrat-Bold",
          "fontSize": wp("8%"),
          "color": "rgba(0, 0, 0, 255)"
        }}
        subTitleStyles={
          {
            bottom:hp('15%') ,
            "fontFamily":"Montserrat-Medium",
            "fontSize": wp("5.5%"),
            "color":"rgba(0, 0, 0, 255)",
            marginHorizontal: wp("2%")
          }}
          SkipButtonComponent={skip} 
          NextButtonComponent={next}
          DoneButtonComponent={next}
        onSkip ={() => navigation.replace("LoginScreen")}
        onDone ={() => navigation.replace("LoginScreen")}
      pages={[
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/onboard1.png')} style = {
        { bottom : hp("5%"),
          alignSelf:"flex-start",
          width: wp("100%"),
          height: hp("50%")
        } } />,
      title: 'Localisez',
      subtitle: 'Votre voiture facilement avec  \n LOCAR',
    },
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/onboard2.png')}  style = {
        {bottom :hp("5%"),
          alignSelf:"flex-start",
          width: wp("85%"),
          height: hp("50%")
        } }/>,
      title: 'Récupèrez via SMS',
      subtitle: 'la position GPS de votre voiture',
    },
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/onboard3.png')} style = {
        { bottom : hp("5%"),
          alignSelf:"flex-start",
          width: wp("90%"),
          height: hp("50%")
        } }/>,
      title: 'Visualisez la position',
      subtitle: 'récupérée par SMS sur une Map offline',
    },
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/onboard4.png')}  style = {
        { 
          bottom : hp("5%"),
          alignSelf:"flex-start",
          width: wp("85%"),
          height: hp("50%")
        } }/>,
      title: 'Visitez notre site',
      subtitle: 'web pour afficher le trajet de votre voiture',
    },
  ]}
/>
     );
  };
  export default OnBoardingScreen;

  const styles = StyleSheet.create({
    slide: {
        flex:1 , 
        alignItems:'center', 
        justifyContent:'center'},
    
  });
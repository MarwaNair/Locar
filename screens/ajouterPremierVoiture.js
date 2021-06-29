import * as React from 'react';
import { StatusBar, TextInput, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView ,} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
const SPACING = 20;
const AVATAR_SIZE = 70;



export default function First( { navigation }) {
 
    return (<View style={styles.container}>
      <View style={styles.header}>
      
      <Image 
      source={require('../assets/avatar.png')}
      style={styles.avatar} />
      <Text style={styles.text}> User Prenom
      </Text>
      
      <Text style={styles.voiture}> Utilisateur@gmail.com
      </Text>
      </View>
      <ScrollView >
    < View style={{height:'100%', backgroundColor: '#fff' ,alignItems:'center' }} >
    <Text style={{color:'#000', fontSize:wp('6%'),marginTop: '9%',marginBottom: '7%',}}> Ajouter une voiture
      </Text>
      
    <View style={{ 
        height:hp('40%'),
        width :wp('90%'),
            marginBottom:SPACING,
           backgroundColor:'#fff', borderRadius:55, shadowColor:'#000',borderColor:'#EBEBEB', borderWidth:2,
           shadowOffset:
           {width:0 , 
            height : 10,
          },
          shadowOpacity :.3,
          shadowRadius:20,
           marginLeft:10,
           marginRight:10,
            }}> 
           
             <Text style={{color:'#000', fontSize:wp('4%'),marginLeft:40,marginTop:10}}> Nouvelle voiture
      </Text>
            <View style={{height:1.5,
            width:'100%',
           backgroundColor:'#EBEBEB', 
           marginTop:'2%',
           marginBottom:'1%' }}></View>
           <View style={{flexDirection:'row'}}>
              <Text style={{  color:'#4F8EF2', fontSize:16 , marginTop:10 , marginRight:wp('5%'), marginLeft:20}}> Maison          </Text>
              <TextInput
               style={{ 
                height: 40, 
                borderColor: '#EBEBEB', 
                borderBottomWidth: 1,
                placeholderTextColor: '#EBEBEB',
                fontSize:15,
              }}
              
            placeholder="Maison                     "
                
              />
             
             </View>
             <View style={{flexDirection:'row'}}>
              <Text style={{  color:'#4F8EF2', fontSize:16 , marginTop:10 , marginRight:60, marginLeft:20}}> Modèle </Text>
              <TextInput
               style={{ 
                height: 40, 
                borderColor: '#EBEBEB', 
                borderBottomWidth: 1,
                placeholderTextColor: '#EBEBEB',
                fontSize:15,
              }}
              
            placeholder="Modèle                     "
                
              />
             
             </View>
             <View style={{flexDirection:'row'}}>
              <Text style={{  color:'#4F8EF2', fontSize:16 , marginTop:10 , marginRight:57, marginLeft:20}}> Couleur </Text>
              <TextInput
               style={{ 
                height: 40, 
                borderColor: '#EBEBEB', 
                borderBottomWidth: 1,
                placeholderTextColor: '#EBEBEB',
                fontSize:15,
              }}
              
            placeholder="Couleur                     "
                
              />
             
             </View>
             <View style={{flexDirection:'row'}}>
              <Text style={{  color:'#4F8EF2', fontSize:16 , marginTop:10 , marginRight:45, marginLeft:20}}> Matricule </Text>
              <TextInput
               style={{ 
                height: 40, 
                borderColor: '#EBEBEB', 
                borderBottomWidth: 1,
                placeholderTextColor: '#EBEBEB',
                fontSize:15,
              }}
              
            placeholder="XXXX-XXX-XX          "
                
              />
             
             </View>
             <View style={{flexDirection:'row'}}>
              <Text style={{  color:'#4F8EF2', fontSize:16 , marginTop:10 , marginRight:35, marginLeft:20}}> N°telphone</Text>
              <TextInput
               style={{ 
                height: 40, 
                borderColor: '#EBEBEB', 
                borderBottomWidth: 1,
                placeholderTextColor: '#EBEBEB',
                fontSize:15,
              }}
              
            placeholder="+213000000000     "
                
              />
             
             </View>
           
            
            </View>
          
            <Image
          source={require('../assets/tesla.png')}
          style={{width:130,height:80,marginLeft:wp('70%') ,  marginTop: hp('-12%'),}}
          />
      <View style={{alignItems:'center'}}>
      
      <TouchableOpacity onPress={() => navigation.navigate('VoituresScreen')}> 
          <Image
          source={require('../assets/confimer2.png')}
          style={{width:155,height:75, marginTop:hp('5%') }}
           />
      </TouchableOpacity>
         </View>
         </View>
         </ScrollView>
         
         </View>
         
  
    );}
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'flex-start',
       backgroundColor:'#FFF',
       
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
          width:0,
          height:6,
          
        },
        shadowOpacity:0.3,
        shadowRadius:3.84,
        elevation:3,
      },
      avatar:{
        marginTop:hp('2%'),
        marginStart:wp('-3%'),
        height:hp('15%'),
        width:wp('45%')  ,},
      text : {
        marginTop:hp('-13%'),
        marginStart:wp('33.5%'),
        fontSize : wp('8.5%'),
        
        fontFamily:'Montserrat-Bold',
     color: '#FFFFFF',
      },
      voiture : {
        marginTop:hp('1%'),
        marginStart:wp('37%'),
        fontSize : wp('4%'),
        fontFamily:'Montserrat-Bold',
     color: '#FFFFFF',
      },
      
      footer:
      {
      height:2,
      width:wp('100%'),
        backgroundColor:'#EBEBEB',
        
      },
      back:{
        marginTop:hp('2%'),
        marginBottom:hp('2%'),
        marginStart:wp('4%'),
        height:hp('2%'),
        width:wp('7.5%') ,
      },
      
    });
    
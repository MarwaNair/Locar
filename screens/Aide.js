// Example of Collapsible/Accordion/Expandable List View in React Native
// https://aboutreact.com/collapsible-accordion-expandable-view/

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';

//import for the collapsible/Expandable view
import Collapsible from 'react-native-collapsible';

//import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';

//Dummy content to show
//You can also use dynamic data by calling web service
const CONTENT = [
  {
    title: ' ►  Comment accéder à mes informations personnelles ?',
    content:
      'Vous pouvez accèder à vos informations à partir de vos paramètres en appuyant sur la section "Profil".',
  },
  {
    title: ' ►  Comment modifier mes informations personnelles ?',
    content:
      'Vous pouvez modifier vos informations à partir de vos paramètres en appuyant sur la section "Profil" puis sur le bouton "éditer".',
  },
  {
    title: ' ►  Comment modifier mon mot de passe ?',
    content:
      'Vous pouvez modifier votre mot de passe à partir de vos paramètres en appuyant sur la section "Sécurité".',
  },
  {
    title: ' ►  Comment ajouter une voiture ?',
    content:
      'Vous pouvez ajouter une voiture à partir de vos paramètres en appuyant sur la section "Voitures" puis sur le bouton "+" en bas à droite.',
  },
  {
    title: ' ►  Comment supprimer une voiture ?',
    content:
      'Vous pouvez supprimer une voiture à partir de vos paramètres en appuyant sur la section "Voitures" puis sur le bouton "modifier" en bas à gauche.',
  },
  {
    title: ' ►  Comment tracker une voiture ?',
    content:
      'Vous pouvez tracker une voiture à partir de vos paramètres en appuyant sur le bouton "Commencer a tracker!" , il vous suffira ensuite de sélectionner la voiture souhaitée en clickant sur la flèche en haut à droite.',
  },
];

const Aide = ({navigation}) => {
  // Ddefault active selector
  const [activeSections, setActiveSections] = useState([]);
  // Collapsed condition for the single collapsible
  const [collapsed, setCollapsed] = useState(true);

  const toggleExpanded = () => {
    //Toggling the state of single Collapsible
    setCollapsed(!collapsed);
  };

  const setSections = sections => {
    //setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    //Accordion Header view
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    //Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Animatable.Text
          animation={isActive ? 'fadeInDown' : undefined}
          style={{
            textAlign: 'left',
            fontFamily: 'Montserrat-Regular',
            fontSize: wp('3.8%'),
          }}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.selectTitle}>Centre d'aide</Text>

          <Accordion
            activeSections={activeSections}
            //for any default active section
            sections={CONTENT}
            //title and content of accordion
            touchableComponent={TouchableOpacity}
            //which type of touchable component you want
            //It can be the following Touchables
            //TouchableHighlight, TouchableNativeFeedback
            //TouchableOpacity , TouchableWithoutFeedback
            expandMultiple={true}
            //Do you want to expand mutiple at a time or single at a time
            renderHeader={renderHeader}
            //Header Component(View) to render
            renderContent={renderContent}
            //Content Component(View) to render
            duration={400}
            //Duration for Collapse and expand
            onChange={setSections}
            //setting the state of active sections
          />
        </ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.back} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Aide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: hp('3%'),
  },

  header: {
    backgroundColor: '#FFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'left',
    fontSize: wp('4.2%'),
    fontFamily: 'Montserrat-SemiBold',
  },
  content: {
    padding: 10,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: hp('4%'),
    color: '#407CEE',
    padding: 10,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  back: {
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
    marginStart: wp('4%'),
    height: hp('1.5%'),
    width: wp('6%'),
  },
});

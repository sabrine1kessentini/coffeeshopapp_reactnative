import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

interface SplashProps {
  navigation: any;
}

const Splash: React.FC<SplashProps> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Background Pattern Image */}
        <Image
          source={require('../../background.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        
        {/* Splash Image Overlay */}
        <Image
          source={require('../../splash (1).png')}
          style={styles.splashImage}
          resizeMode="contain"
        />
        
        {/* Overlay Content */}
        <View style={styles.overlay}>
          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.headline}>
              Coffee so good, {'\n'}your taste buds{'\n'}will love it
            </Text>
            <Text style={styles.subheadline}>
              The best grain, the finest roas, the{'\n'}most powerful flavor.
            </Text>
          </View>

          {/* Get Started Button */}
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}>
            <Text style={styles.getStartedText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4A574', // Caramel background color
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  splashImage: {
    position: 'absolute',
    width: '100%',
    height: '60%',
    top: '10%',
    left: 0,
    right: 0,
    zIndex: 1,
    alignSelf: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 60,
    paddingHorizontal: 40,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  headline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 36,
    letterSpacing: 0,
  },
  subheadline: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 1,
    lineHeight: 20,
    paddingHorizontal: 0,
  },
  getStartedButton: {
    backgroundColor: '#2D5016',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 50,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default Splash;


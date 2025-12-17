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
              Coffee so good, your taste buds will love it
            </Text>
            <Text style={styles.subheadline}>
              The best grain, the finest roast, the most powerful flavor.
            </Text>
          </View>

          {/* Decorative Element */}
          <View style={styles.decorativeLine} />

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
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
    paddingHorizontal: 30,
    paddingTop: 100,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  headline: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 42,
    letterSpacing: 0.5,
  },
  subheadline: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.95,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  decorativeLine: {
    width: 50,
    height: 3,
    backgroundColor: '#2D5016', // Dark green
    borderRadius: 2,
    marginBottom: 35,
  },
  getStartedButton: {
    backgroundColor: '#2D5016', // Dark green
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 70,
    minWidth: 220,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default Splash;


import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import AccountSidebar from './components/account/AccountSidebar';

const App = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const handleBack = () => {
    setShowSidebar(false);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout clicked");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {showSidebar && (
          <AccountSidebar
            onBack={handleBack}
            onLogout={handleLogout}
            username="Thenusha"
            avatarUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/409f7d693f4ba67b8f3fb14ebd8810cb43e4ffd5"
          />
        )}
        {!showSidebar && (
          <View style={styles.mainContent}>
            <Text style={styles.mainText}>Main Content Area</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 24,
    color: '#333',
  }
});

export default App;
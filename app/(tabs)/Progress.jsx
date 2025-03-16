import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { DateDisplay } from '../components/progress/DateDisplay';
import { TabSelector } from '../components/progress/TabSelector';
import { CircularProgress } from '../components/progress/CircularProgress';
import { ReportButton } from '../components/progress/ReportButton';
import { StatsCard } from '../components/progress/StatsCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProgressBar = () => {
  return (
    
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.dateContainer}>
            <DateDisplay />
          </View>
          <View style={styles.tabSection}>
            <TabSelector />
          </View>
          <View style={styles.progressSection}>
            <CircularProgress />
          </View>
          <View style={styles.reportSection}>
            <ReportButton />
          </View>
          <View style={styles.statsSection}>
            <StatsCard />
          </View>
        </ScrollView>
        <View style={styles.navSection}>
          
        </View>
      </View>
   
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    maxWidth: 480,
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: 7,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
  },
  dateContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 38,
    marginLeft: 100,
    alignSelf: 'flex-start',
  },
  tabSection: {
    marginTop: 24,
    width: '100%',
    paddingHorizontal: 16,
  },
  progressSection: {
    marginTop: 29,
    alignItems: 'center',
  },
  reportSection: {
    marginTop: 62,
    alignItems: 'center',
  },
  statsSection: {
    marginTop: 22,
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  navSection: {
    marginTop: 29,
    width: '100%',
  },
});

export default ProgressBar;
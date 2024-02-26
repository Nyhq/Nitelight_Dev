import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Card, Title, Paragraph, FAB, Portal, Dialog, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getVenues, fetchVenueDetails } from '../api';

const VenueScreen = ({ navigation }) => {
  
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [visibleFilterDialog, setVisibleFilterDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [isFABVisible, setIsFABVisible] = useState(true);

  const [allVenues, setAllVenues] = useState([]); // Stores all venues

  useEffect(() => {
   
    getVenues().then(data => {
      if (data) {
        setAllVenues(data);
      }
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // On focus, set FAB visibility to true
      setIsFABVisible(true);

      // On blur, set FAB visibility to false
      return () => setIsFABVisible(false);
    }, [])
  );

  const showDialog = (venue) => {
    setSelectedVenue(venue);
    setVisibleDialog(true);
  };

  const hideDialog = () => {
    setVisibleDialog(false);
  };

  const showFilterDialog = () => setVisibleFilterDialog(true);

  const hideFilterDialog = () => setVisibleFilterDialog(false);

  const handleSearch = () => {
    // Add logic to filter by searchQuery
    hideFilterDialog();
  };

  const handleDistanceChange = (value) => {
    // Add logic to handle distance filter
    setSelectedDistance(value);
  };

  const showTypeFilterDialog = () => {
    // Add logic for Type filter dialog
  };

  const showDistanceFilterDialog = () => {
    // Add logic for Distance filter dialog
  };

  const showSearchFilterDialog = () => {
    // Add logic for Search filter dialog
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Venues" />
      </Appbar.Header>

      <ScrollView>
        {venues.map((venue) => (
          <Card
            key={venue.id}
            onPress={() => showDialog(venue)}
            style={styles.card}
          >
            <Card.Cover source={{ uri: venue.imageUrl }} />
            <Card.Content>
              <Title>{venue.name}</Title>
              <Paragraph>{venue.location}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {/* Filtering FAB */}
      <Portal>
        {isFABVisible && (
          <FAB.Group
            open={visibleFilterDialog}
            icon={visibleFilterDialog ? 'close' : 'filter'}
            actions={[
              { icon: 'label', label: 'Filter by Type', onPress: () => showTypeFilterDialog() },
              { icon: 'map-marker-radius', label: 'Filter by Distance', onPress: () => showDistanceFilterDialog() },
              { icon: 'magnify', label: 'Filter by Search', onPress: () => showSearchFilterDialog() },
            ]}
            onStateChange={({ open }) => open ? showFilterDialog() : hideFilterDialog()}
            onPress={() => {
              if (visibleFilterDialog) {
                hideFilterDialog();
              }
            }}
            style={styles.fabGroup}
          />
        )}
      </Portal>

      {/* Dialog Portal */}
      <Portal>
        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
          <Dialog.Title>{selectedVenue?.name}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Location: {selectedVenue?.location}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
  },
  fabGroup: {
    position: 'absolute',
    bottom: 80,
    right: 16,
  },
});

export default VenueScreen;
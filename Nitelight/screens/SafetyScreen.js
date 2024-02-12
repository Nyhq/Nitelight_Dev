import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph, Portal, Dialog } from 'react-native-paper';

const SafetyScreen = () => {
  // Sample safety resources data
  const safetyResources = [
    { id: 1, title: 'Resource 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, title: 'Resource 2', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: 3, title: 'Resource 3', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
  ];

  const [visibleDialog, setVisibleDialog] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const showDialog = (resource) => {
    setSelectedResource(resource);
    setVisibleDialog(true);
  };

  const hideDialog = () => {
    setVisibleDialog(false);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Safety Resources" />
      </Appbar.Header>

      <ScrollView>
        {safetyResources.map((resource) => (
          <Button
            key={resource.id}
            mode="contained"
            style={styles.button}
            onPress={() => showDialog(resource)}
          >
            {resource.title}
          </Button>
        ))}
      </ScrollView>

      <Portal>
        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
          <Dialog.Title>{selectedResource?.title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{selectedResource?.content}</Paragraph>
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
  button: {
    margin: 16,
  },
});

export default SafetyScreen;

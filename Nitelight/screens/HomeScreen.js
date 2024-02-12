import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BleManager from 'react-native-ble-manager';

import { PermissionsAndroid } from 'react-native';
import { Circle } from 'react-native-progress';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [rssi, setRSSI] = useState(null);
  const targetDeviceId = '38:FB:14:0D:0B:7F'; 
  useEffect(() => {
    // Request Bluetooth permissions (from your previous implementation)
    requestBluetoothPermissions();
    console.log('Requesting Bluetooth permissions...');
    BleManager.start({ showAlert: false }).then(() => {
      // Success code
      console.log("Module initialized");
      startRSSIUpdates();
    });

    // Cleanup function
    return () => {
      BleManager.stopScan();
    };
  }, []);

  const requestBluetoothPermissions = async () => {
    try {
      const grantedLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Bluetooth Scanning Permission',
          message: 'App needs access to your location for Bluetooth scanning.',
        }
      );
      const grantedScan = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: 'Bluetooth Scanning Permission',
          message: 'App needs Bluetooth scanning permission for BLE functionality.',
        }
      );
      const grantedConnect = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: 'Bluetooth Connection Permission',
          message: 'App needs Bluetooth connection permission to interact with BLE devices.',
        }
      );

      if (grantedLocation && grantedScan && grantedConnect) {
        console.log('All necessary permissions granted.');
        // Proceed with further Bluetooth-related operations
      } else {
        console.warn('Insufficient permissions granted.');
      }
    } catch (err) {
      console.error('Error requesting permissions:', err);
    }
  };

  const startRSSIUpdates = () => {
    const intervalId = setInterval(() => {
        BleManager.scan([], 3, true) // Adjust scan duration as needed
            .then(() => {
                console.log('Scan started');
            })
            .catch((err) => {
                console.error(err);
            });
    }, 2000); // 2-second scanning interval (adjust accordingly)    
    
    // On discovery, listen for the target device 
    const subscription = BleManager.addListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral
    );

    // Don't forget cleanup.  You'll need to stop both the scan and listener during a component unmount. 
    return () => {
        clearInterval(intervalId);
        subscription.remove();
    };
  };

  const handleDiscoverPeripheral = (peripheral) => {
    if (peripheral.id === targetDeviceId) { 
      console.log('Found target device:', peripheral);
      const normalizedRSSI = normalizeRSSI(peripheral.rssi, -100, -40);
      setRSSI(normalizedRSSI);
    }
  };

  const normalizeRSSI = (rssi, minRSSI, maxRSSI) => {
    const range = maxRSSI  - minRSSI;
    return Math.max(0, Math.min(1, (rssi - minRSSI) / range));
};

  
 

  
return (
  <View style={styles.container}>
    <Circle
      size={120} 
      progress={rssi} 
      color="purple" 
      thickness={8}
      showsText={true} 
      formatText={() => `${Math.round(rssi * 100)}%`} 
    />
    <Text style={styles.rssiText}>RSSI: {Math.round(rssi * 100)}%</Text> 
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'  
  },
  rssiText: {
    marginTop: 10,
    fontSize: 18
  }
});

export default App;
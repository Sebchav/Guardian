import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TextInput,
  Platform,
} from 'react-native';

interface ParameterToggleProps {
  icon: React.ReactNode;
  title: string;
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
  showInputField?: boolean;
  inputPlaceholder?: string;
}

export default function ParameterToggle({
  icon,
  title,
  isEnabled,
  onToggle,
  showInputField = false,
  inputPlaceholder = '',
}: ParameterToggleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <Text style={styles.title}>{title}</Text>
        <Switch
          value={isEnabled}
          onValueChange={onToggle}
          trackColor={{ false: '#D1D1D6', true: '#7C78FF' }}
          thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : isEnabled ? '#FFFFFF' : '#f4f3f4'}
        />
      </View>
      
      {showInputField && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{inputPlaceholder}</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el valor"
            keyboardType="numeric"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  inputContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  inputLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333333',
  },
}); 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTodos } from '@/contexts/TodoContext';
import { router } from 'expo-router';
import { Calendar, Tag, CircleAlert as AlertCircle, FileText } from 'lucide-react-native';

const CATEGORIES = ['Personal', 'Work', 'Shopping', 'Health', 'Education', 'Other'];
const PRIORITIES = [
  { value: 'low', label: 'Low', color: '#10b981' },
  { value: 'medium', label: 'Medium', color: '#f59e0b' },
  { value: 'high', label: 'High', color: '#ef4444' },
];

export default function AddTodoScreen() {
  const { addTodo } = useTodos();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Personal');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [loading, setLoading] = useState(false);

  const handleAddTodo = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    setLoading(true);
    try {
      await addTodo({
        title: title.trim(),
        description: description.trim() || undefined,
        category,
        priority,
        completed: false,
      });

      Alert.alert('Success', 'Task added successfully!', [
        { text: 'Add Another', onPress: resetForm },
        { text: 'View Tasks', onPress: () => router.push('/(tabs)/todos') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('Personal');
    setPriority('medium');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Add New Task</Text>
          <Text style={styles.subtitle}>Create a new task to stay organized</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.section}>
            <Text style={styles.label}>
              <FileText size={16} color="#374151" /> Task Title
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task title..."
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>
              <FileText size={16} color="#374151" /> Description (Optional)
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add more details about your task..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>
              <Tag size={16} color="#374151" /> Category
            </Text>
            <View style={styles.optionsContainer}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.optionButton,
                    category === cat && styles.selectedOption
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[
                    styles.optionText,
                    category === cat && styles.selectedOptionText
                  ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>
              <AlertCircle size={16} color="#374151" /> Priority
            </Text>
            <View style={styles.priorityContainer}>
              {PRIORITIES.map((p) => (
                <TouchableOpacity
                  key={p.value}
                  style={[
                    styles.priorityButton,
                    priority === p.value && { 
                      backgroundColor: p.color,
                      borderColor: p.color 
                    }
                  ]}
                  onPress={() => setPriority(p.value as 'low' | 'medium' | 'high')}
                >
                  <View style={[
                    styles.priorityDot,
                    { backgroundColor: p.color }
                  ]} />
                  <Text style={[
                    styles.priorityText,
                    priority === p.value && styles.selectedPriorityText
                  ]}>
                    {p.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.addButton, loading && styles.disabledButton]}
            onPress={handleAddTodo}
            disabled={loading}
          >
            <Text style={styles.addButtonText}>
              {loading ? 'Adding Task...' : 'Add Task'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    color: '#111827',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedOption: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  optionText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#ffffff',
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  selectedPriorityText: {
    color: '#ffffff',
  },
  addButton: {
    backgroundColor: '#059669',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
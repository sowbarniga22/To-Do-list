import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Plus, X } from 'lucide-react-native';

interface TaskInputProps {
  onAddTask: (title: string, category: 'today' | 'pending', time?: string) => void;
  visible: boolean;
  onClose: () => void;
}

export default function TaskInput({ onAddTask, visible, onClose }: TaskInputProps) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState<'today' | 'pending'>('today');

  const handleSubmit = () => {
    if (title.trim()) {
      onAddTask(title.trim(), category, time.trim() || undefined);
      setTitle('');
      setTime('');
      setCategory('today');
      onClose();
    }
  };

  const handleClose = () => {
    setTitle('');
    setTime('');
    setCategory('today');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Add New Task</Text>
            <TouchableOpacity onPress={handleClose}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="What needs to be done?"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />

          <TextInput
            style={styles.input}
            placeholder="Time (optional)"
            value={time}
            onChangeText={setTime}
          />

          <View style={styles.categorySection}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryButtons}>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  category === 'today' && styles.activeCategoryButton
                ]}
                onPress={() => setCategory('today')}
              >
                <Text style={[
                  styles.categoryButtonText,
                  category === 'today' && styles.activeCategoryButtonText
                ]}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  category === 'pending' && styles.activeCategoryButton
                ]}
                onPress={() => setCategory('pending')}
              >
                <Text style={[
                  styles.categoryButtonText,
                  category === 'pending' && styles.activeCategoryButtonText
                ]}>Pending</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    color: '#1F2937',
  },
  categorySection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  activeCategoryButton: {
    backgroundColor: '#FF9AA2',
    borderColor: '#FF9AA2',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeCategoryButtonText: {
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#FF9AA2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
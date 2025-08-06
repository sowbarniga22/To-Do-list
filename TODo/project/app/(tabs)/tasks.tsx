import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, CircleCheck as CheckCircle2, Circle, Trash2 } from 'lucide-react-native';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  time?: string;
  category: 'today' | 'pending';
  priority: 'high' | 'medium' | 'low';
}

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Master plan', completed: false, time: '10:00-11:00', category: 'today', priority: 'high' },
    { id: '2', title: 'Project Zenith', completed: false, time: '11:30-11:45', category: 'today', priority: 'medium' },
    { id: '3', title: 'Client Meeting', completed: false, time: '14:00-15:00', category: 'today', priority: 'high' },
    { id: '4', title: 'Review documents', completed: false, category: 'pending', priority: 'low' },
    { id: '5', title: 'Prepare presentation', completed: false, category: 'pending', priority: 'medium' },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'today' | 'pending'>('today');
  const [selectedPriority, setSelectedPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        completed: false,
        category: selectedCategory,
        priority: selectedPriority,
        time: newTaskTime.trim() || undefined,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskTime('');
      setShowAddTask(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <View style={[styles.taskCard, task.completed && styles.completedTask]}>
      <TouchableOpacity
        style={styles.taskMain}
        onPress={() => toggleTask(task.id)}
      >
        <View style={styles.taskContent}>
          {task.completed ? (
            <CheckCircle2 size={20} color="#FF9AA2" />
          ) : (
            <Circle size={20} color="#9CA3AF" />
          )}
          <View style={styles.taskInfo}>
            <Text style={[styles.taskText, task.completed && styles.completedText]}>
              {task.title}
            </Text>
            {task.time && (
              <Text style={styles.taskTime}>{task.time}</Text>
            )}
          </View>
          <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(task.id)}
      >
        <Trash2 size={16} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Tasks</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddTask(true)}
        >
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today ({todayTasks.length})</Text>
          {todayTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending ({pendingTasks.length})</Text>
          {pendingTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </View>
      </ScrollView>

      {showAddTask && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Task</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Task title"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              autoFocus
            />
            
            <TextInput
              style={styles.input}
              placeholder="Time (optional)"
              value={newTaskTime}
              onChangeText={setNewTaskTime}
            />

            <View style={styles.categorySelector}>
              <Text style={styles.selectorLabel}>Category:</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[
                    styles.selectorButton,
                    selectedCategory === 'today' && styles.selectedButton
                  ]}
                  onPress={() => setSelectedCategory('today')}
                >
                  <Text style={[
                    styles.selectorButtonText,
                    selectedCategory === 'today' && styles.selectedButtonText
                  ]}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.selectorButton,
                    selectedCategory === 'pending' && styles.selectedButton
                  ]}
                  onPress={() => setSelectedCategory('pending')}
                >
                  <Text style={[
                    styles.selectorButtonText,
                    selectedCategory === 'pending' && styles.selectedButtonText
                  ]}>Pending</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.prioritySelector}>
              <Text style={styles.selectorLabel}>Priority:</Text>
              <View style={styles.buttonGroup}>
                {(['high', 'medium', 'low'] as const).map((priority) => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.priorityButton,
                      selectedPriority === priority && styles.selectedPriorityButton,
                      { borderColor: getPriorityColor(priority) }
                    ]}
                    onPress={() => setSelectedPriority(priority)}
                  >
                    <Text style={[
                      styles.priorityButtonText,
                      selectedPriority === priority && { color: getPriorityColor(priority) }
                    ]}>{priority}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={addTask}
              >
                <Text style={styles.primaryButtonText}>Add Task</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setShowAddTask(false)}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  addButton: {
    backgroundColor: '#FF9AA2',
    padding: 10,
    borderRadius: 20,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskMain: {
    flex: 1,
    padding: 16,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskInfo: {
    flex: 1,
    marginLeft: 12,
  },
  taskText: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 2,
  },
  completedTask: {
    opacity: 0.6,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  taskTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  deleteButton: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  categorySelector: {
    marginBottom: 16,
  },
  prioritySelector: {
    marginBottom: 24,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  selectorButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#FF9AA2',
    borderColor: '#FF9AA2',
  },
  selectorButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedButtonText: {
    color: '#FFFFFF',
  },
  priorityButton: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
  },
  selectedPriorityButton: {
    backgroundColor: '#F3F4F6',
  },
  priorityButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textTransform: 'capitalize',
  },
  modalButtons: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#FF9AA2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
});
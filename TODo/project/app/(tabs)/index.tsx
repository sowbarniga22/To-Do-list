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
import { Plus, CircleCheck as CheckCircle2, Circle } from 'lucide-react-native';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  time?: string;
  category: 'today' | 'pending';
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Master plan', completed: false, time: '10:00-11:00', category: 'today' },
    { id: '2', title: 'Project Zenith', completed: false, time: '11:30-11:45', category: 'today' },
    { id: '3', title: 'Client Meeting', completed: false, time: '14:00-15:00', category: 'today' },
    { id: '4', title: 'Dinner with friends', completed: false, time: '19:00-20:30', category: 'today' },
    { id: '5', title: 'Review documents', completed: false, category: 'pending' },
    { id: '6', title: 'Prepare presentation', completed: false, category: 'pending' },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = (category: 'today' | 'pending') => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        completed: false,
        category,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setShowAddTask(false);
    }
  };

  const todayTasks = tasks.filter(task => task.category === 'today');
  const pendingTasks = tasks.filter(task => task.category === 'pending');

  const TaskCard = ({ task }: { task: Task }) => (
    <TouchableOpacity
      style={[styles.taskCard, task.completed && styles.completedTask]}
      onPress={() => toggleTask(task.id)}
    >
      <View style={styles.taskContent}>
        {task.completed ? (
          <CheckCircle2 size={20} color="#FF9AA2" />
        ) : (
          <Circle size={20} color="#9CA3AF" />
        )}
        <Text style={[styles.taskText, task.completed && styles.completedText]}>
          {task.title}
        </Text>
      </View>
      {task.time && (
        <Text style={styles.taskTime}>{task.time}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>DOBEE 🐝</Text>
          <Text style={styles.subtitle}>stay focused with widgets</Text>
        </View>

        <View style={styles.motivationCard}>
          <Text style={styles.motivationText}>
            Your goals are closer than you think.{'\n'}
            One task at a time, one day at a time.{'\n'}
            Consistency beats motivation.
          </Text>
          <TouchableOpacity style={styles.beginButton}>
            <Text style={styles.beginButtonText}>Let's begin</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TODAY TASK</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowAddTask(true)}
            >
              <Plus size={20} color="#FF9AA2" />
            </TouchableOpacity>
          </View>
          {todayTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>PENDING TASK</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowAddTask(true)}
            >
              <Plus size={20} color="#FF9AA2" />
            </TouchableOpacity>
          </View>
          {pendingTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </View>

        {showAddTask && (
          <View style={styles.addTaskModal}>
            <TextInput
              style={styles.taskInput}
              placeholder="Enter new task..."
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              autoFocus
            />
            <View style={styles.addTaskButtons}>
              <TouchableOpacity
                style={[styles.addTaskButton, styles.todayButton]}
                onPress={() => addTask('today')}
              >
                <Text style={styles.addTaskButtonText}>Add to Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.addTaskButton, styles.pendingButton]}
                onPress={() => addTask('pending')}
              >
                <Text style={styles.addTaskButtonText}>Add to Pending</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddTask(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  motivationCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  motivationText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  beginButton: {
    backgroundColor: '#FF9AA2',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
  },
  beginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    letterSpacing: 0.5,
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completedTask: {
    opacity: 0.6,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  taskText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  taskTime: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 32,
  },
  addTaskModal: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  taskInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  addTaskButtons: {
    gap: 8,
  },
  addTaskButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  todayButton: {
    backgroundColor: '#FF9AA2',
  },
  pendingButton: {
    backgroundColor: '#A78BFA',
  },
  addTaskButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
});
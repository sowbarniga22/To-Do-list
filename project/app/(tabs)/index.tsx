import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTodos } from '@/contexts/TodoContext';
import { router } from 'expo-router';
import { Plus, CircleCheck as CheckCircle, Clock, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function HomeScreen() {
  const { user } = useAuth();
  const { todos, getPendingTodos, getCompletedTodos } = useTodos();

  useEffect(() => {
    if (!user) {
      router.replace('/auth');
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const pendingTodos = getPendingTodos();
  const completedTodos = getCompletedTodos();
  const highPriorityTodos = pendingTodos.filter(todo => todo.priority === 'high');

  const stats = [
    {
      label: 'Total Tasks',
      value: todos.length,
      icon: <CheckCircle size={24} color="#059669" />,
      color: '#059669',
    },
    {
      label: 'Pending',
      value: pendingTodos.length,
      icon: <Clock size={24} color="#f59e0b" />,
      color: '#f59e0b',
    },
    {
      label: 'Completed',
      value: completedTodos.length,
      icon: <CheckCircle size={24} color="#10b981" />,
      color: '#10b981',
    },
    {
      label: 'High Priority',
      value: highPriorityTodos.length,
      icon: <AlertCircle size={24} color="#ef4444" />,
      color: '#ef4444',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning, {user.name}!</Text>
        <Text style={styles.subtitle}>Let's get things done today</Text>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={styles.statIcon}>
              {stat.icon}
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => router.push('/(tabs)/add-todo')}
        >
          <Plus size={24} color="#ffffff" />
          <Text style={styles.quickActionText}>Add New Task</Text>
        </TouchableOpacity>
      </View>

      {pendingTodos.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Tasks</Text>
          {pendingTodos.slice(0, 3).map((todo) => (
            <View key={todo.id} style={styles.todoPreview}>
              <View style={styles.todoPreviewContent}>
                <Text style={styles.todoPreviewTitle}>{todo.title}</Text>
                <Text style={styles.todoPreviewCategory}>{todo.category}</Text>
              </View>
              <View style={[
                styles.priorityIndicator,
                { backgroundColor: getPriorityColor(todo.priority) }
              ]} />
            </View>
          ))}
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push('/(tabs)/todos')}
          >
            <Text style={styles.viewAllText}>View All Tasks</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return '#ef4444';
    case 'medium': return '#f59e0b';
    case 'low': return '#10b981';
    default: return '#6b7280';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '47%',
    marginRight: '3%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statIcon: {
    marginBottom: 12,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  quickActionButton: {
    backgroundColor: '#059669',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  todoPreview: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  todoPreviewContent: {
    flex: 1,
  },
  todoPreviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  todoPreviewCategory: {
    fontSize: 14,
    color: '#6b7280',
  },
  priorityIndicator: {
    width: 8,
    height: 40,
    borderRadius: 4,
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  viewAllText: {
    color: '#059669',
    fontSize: 16,
    fontWeight: '600',
  },
});
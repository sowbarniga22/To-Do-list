import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useTodos, Todo } from '@/contexts/TodoContext';
import { Search, Filter, Trash2, CreditCard as Edit3, CircleCheck as CheckCircle, Circle } from 'lucide-react-native';

export default function TodosScreen() {
  const { todos, toggleTodo, deleteTodo } = useTodos();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         todo.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterBy === 'pending') return !todo.completed && matchesSearch;
    if (filterBy === 'completed') return todo.completed && matchesSearch;
    return matchesSearch;
  });

  const handleDeleteTodo = (id: string, title: string) => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteTodo(id) },
      ]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={[styles.todoItem, item.completed && styles.completedTodo]}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => toggleTodo(item.id)}
      >
        <View style={styles.todoHeader}>
          {item.completed ? (
            <CheckCircle size={24} color="#10b981" />
          ) : (
            <Circle size={24} color="#6b7280" />
          )}
          <View style={styles.todoInfo}>
            <Text style={[
              styles.todoTitle,
              item.completed && styles.completedText
            ]}>
              {item.title}
            </Text>
            {item.description && (
              <Text style={[
                styles.todoDescription,
                item.completed && styles.completedText
              ]}>
                {item.description}
              </Text>
            )}
            <View style={styles.todoMeta}>
              <Text style={styles.todoCategory}>{item.category}</Text>
              <View style={[
                styles.priorityBadge,
                { backgroundColor: getPriorityColor(item.priority) }
              ]}>
                <Text style={styles.priorityText}>{item.priority}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      
      <View style={styles.todoActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteTodo(item.id, item.title)}
        >
          <Trash2 size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>{filteredTodos.length} tasks</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search tasks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filterContainer}>
        {(['all', 'pending', 'completed'] as const).map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              filterBy === filter && styles.activeFilter
            ]}
            onPress={() => setFilterBy(filter)}
          >
            <Text style={[
              styles.filterText,
              filterBy === filter && styles.activeFilterText
            ]}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTodos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.todoList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No tasks found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery ? 'Try adjusting your search' : 'Add your first task to get started'}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
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
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeFilter: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  filterText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#ffffff',
  },
  todoList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  todoItem: {
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
  completedTodo: {
    opacity: 0.7,
  },
  todoContent: {
    flex: 1,
  },
  todoHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  todoInfo: {
    flex: 1,
    marginLeft: 12,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  todoDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  todoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoCategory: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 12,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  todoActions: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, Calendar, ChevronRight } from 'lucide-react-native';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  duration: string;
  color: string;
  completed: boolean;
}

export default function ScheduleScreen() {
  const scheduleItems: ScheduleItem[] = [
    { id: '1', title: 'Master plan', time: '10:00', duration: '1h', color: '#FF9AA2', completed: false },
    { id: '2', title: 'Project Zenith', time: '11:30', duration: '15m', color: '#A78BFA', completed: false },
    { id: '3', title: 'Client Meeting', time: '14:00', duration: '1h', color: '#34D399', completed: false },
    { id: '4', title: 'Dinner with friends', time: '19:00', duration: '1h 30m', color: '#60A5FA', completed: false },
  ];

  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const ScheduleCard = ({ item }: { item: ScheduleItem }) => {
    const itemHour = parseInt(item.time.split(':')[0]);
    const isPast = itemHour < currentHour;
    const isCurrent = itemHour === currentHour;

    return (
      <TouchableOpacity style={[
        styles.scheduleCard,
        isPast && styles.pastCard,
        isCurrent && styles.currentCard
      ]}>
        <View style={styles.timeColumn}>
          <Text style={[styles.timeText, isPast && styles.pastText]}>{item.time}</Text>
          <Text style={[styles.durationText, isPast && styles.pastText]}>{item.duration}</Text>
        </View>
        
        <View style={[styles.colorBar, { backgroundColor: item.color }]} />
        
        <View style={styles.taskDetails}>
          <Text style={[styles.taskTitle, isPast && styles.pastText]}>{item.title}</Text>
          <View style={styles.taskMeta}>
            <Clock size={12} color={isPast ? '#9CA3AF' : '#6B7280'} />
            <Text style={[styles.metaText, isPast && styles.pastText]}>
              {item.time} - {item.duration}
            </Text>
          </View>
        </View>

        <ChevronRight size={16} color={isPast ? '#9CA3AF' : '#6B7280'} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Schedule</Text>
        <View style={styles.dateInfo}>
          <Calendar size={16} color="#6B7280" />
          <Text style={styles.dateText}>
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'short',
              day: 'numeric'
            })}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.timelineContainer}>
          {scheduleItems.map((item) => (
            <ScheduleCard key={item.id} item={item} />
          ))}
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Today's Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>{scheduleItems.length}</Text>
              <Text style={styles.summaryLabel}>Total Tasks</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>
                {scheduleItems.filter(item => !item.completed).length}
              </Text>
              <Text style={styles.summaryLabel}>Remaining</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>6h 45m</Text>
              <Text style={styles.summaryLabel}>Total Time</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>85%</Text>
              <Text style={styles.summaryLabel}>Efficiency</Text>
            </View>
          </View>
        </View>
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
    marginBottom: 8,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  timelineContainer: {
    padding: 20,
  },
  scheduleCard: {
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
    overflow: 'hidden',
  },
  pastCard: {
    opacity: 0.6,
  },
  currentCard: {
    borderWidth: 2,
    borderColor: '#FF9AA2',
  },
  timeColumn: {
    padding: 16,
    alignItems: 'center',
    minWidth: 80,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  durationText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  pastText: {
    color: '#9CA3AF',
  },
  colorBar: {
    width: 4,
    height: 60,
  },
  taskDetails: {
    flex: 1,
    padding: 16,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  summary: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9AA2',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});
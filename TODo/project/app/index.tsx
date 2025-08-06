import { Redirect } from 'expo-router';

export default function Index() {
  // For demo purposes, redirect to welcome screen
  // In production, check authentication state here
  return <Redirect href="/auth/welcome" />;
}
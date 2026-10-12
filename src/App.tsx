import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, Pressable, View, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

const STUDENT = 'Shyaka Peter Guy';
const REGISTRATION = '24/26559';
const VERIFY = 'MOB-A2-6559';
const APP_NAME = 'PeterPortfolio';
const STORAGE_KEY = 'peter-portfolio-profile-v1';

type Profile = {
  headline: string;
  bio: string;
  primarySkill: string;
  available: boolean;
  imageUri: string | null;
};
const defaultProfile: Profile = {
  headline: 'Software Engineering Student',
  bio: 'I am a Software Engineering student interested in building useful, accessible mobile and web applications. I enjoy learning by creating practical projects and improving my problem-solving skills.',
  primarySkill: 'TypeScript',
  available: true,
  imageUri: null,
};

type Project = { id: string; title: string; problem: string; contribution: string; technology: string; outcome: string };
const projects: Project[] = [
  {
    id: 'milk',
    title: 'Milk Delivery Management System',
    problem: 'Milk collection workflows can be difficult to track when delivery details are kept in separate or paper records.',
    contribution: 'Student project concept: design a simple workflow to record deliveries, review delivery information and make records easier to inspect. Replace this description with the exact work you personally completed.',
    technology: 'Python, TypeScript, React Native (adapt to the technologies actually used)',
    outcome: 'A portfolio example demonstrating data handling and user-interface planning. Add verified results only after testing the actual project.',
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio App',
    problem: 'A student needs a convenient way to introduce their skills, education and projects to internship reviewers.',
    contribution: 'Build this assignment as a mobile portfolio with reusable screens, editable profile information, local persistence and project detail navigation.',
    technology: 'React Native, Expo, TypeScript, React Navigation, AsyncStorage',
    outcome: 'An offline-first portfolio intended to be packaged as a standalone Android APK after a successful build and device test.',
  },
];

type RootStackParamList = { MainTabs: undefined; ProjectDetails: { projectId: string } };
type TabParamList = { Home: undefined; Skills: undefined; Projects: undefined; Profile: undefined; About: undefined };
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const C = { ink: '#172033', muted: '#596579', primary: '#275DAD', pale: '#EEF4FF', bg: '#F6F8FC', card: '#FFFFFF', border: '#DCE3EE', green: '#177245', red: '#B42318', gold: '#9A6700' };

function Button({ title, onPress, secondary = false }: { title: string; onPress: () => void; secondary?: boolean }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, secondary && styles.secondaryButton, pressed && { opacity: 0.75 }]}><Text style={[styles.buttonText, secondary && styles.secondaryButtonText]}>{title}</Text></Pressable>;
}
function SectionTitle({ children }: { children: string }) { return <Text style={styles.sectionTitle}>{children}</Text>; }
function Card({ children }: { children: React.ReactNode }) { return <View style={styles.card}>{children}</View>; }
function Tag({ children }: { children: string }) { return <View style={styles.tag}><Text style={styles.tagText}>{children}</Text></View>; }
function Field({ label, value, onChangeText, placeholder, multiline = false, error, maxLength }: { label: string; value: string; onChangeText: (v: string) => void; placeholder: string; multiline?: boolean; error?: string; maxLength?: number }) {
  return <View style={styles.fieldWrap}><Text style={styles.label}>{label}</Text><TextInput accessibilityLabel={label} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#7A8597" multiline={multiline} maxLength={maxLength} style={[styles.input, multiline && styles.multiline, !!error && styles.inputError]} textAlignVertical={multiline ? 'top' : 'center'} /><Text accessibilityLiveRegion="polite" style={[styles.error, !error && styles.hidden]}>{error || ' '}</Text></View>;
}
function Screen({ children }: { children: React.ReactNode }) { return <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">{children}</ScrollView>; }

function HomeScreen({ profile, setProfile }: { profile: Profile; setProfile: (p: Profile) => void }) {
  const [mediaMessage, setMediaMessage] = useState('');
  async function chooseImage(camera: boolean) {
    try {
      const permission = camera ? await ImagePicker.requestCameraPermissionsAsync() : await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) { setMediaMessage('Permission was not granted. You can continue using the portfolio without a profile image.'); return; }
      const result = camera
        ? await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.75 })
        : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.75 });
      if (result.canceled || !result.assets?.[0]?.uri) { setMediaMessage('Image selection was cancelled. Your current profile remains unchanged.'); return; }
      setProfile({ ...profile, imageUri: result.assets[0].uri });
      setMediaMessage('Profile image selected. Save the profile on the Profile tab to persist this change.');
    } catch { setMediaMessage('The image could not be opened on this device. Please try again or continue without a picture.'); }
  }
  return <Screen>
    <View style={styles.hero}>
      <View style={styles.avatarWrap}>{profile.imageUri ? <Image source={{ uri: profile.imageUri }} style={styles.avatar} accessibilityLabel="Selected profile picture" /> : <View style={styles.avatarFallback}><Text style={styles.avatarInitials}>SP</Text></View>}</View>
      <Text style={styles.eyebrow}>PERSONAL PORTFOLIO</Text>
      <Text style={styles.heroTitle}>My name is Shyaka Peter Guy.</Text>
      <Text style={styles.headline}>{profile.headline}</Text>
      <Text style={styles.body}>{profile.bio}</Text>
      <View style={styles.tagsRow}><Tag>{profile.primarySkill}</Tag><Tag>{profile.available ? 'Open to opportunities' : 'Not currently available'}</Tag></View>
      <Text style={styles.verify}>{VERIFY}</Text>
    </View>
    <Card><SectionTitle>Profile photo</SectionTitle><Text style={styles.body}>Choose a gallery image or take a picture. Image access is optional.</Text><View style={styles.buttonRow}><View style={styles.buttonFlex}><Button title="Choose image" onPress={() => chooseImage(false)} /></View><View style={styles.buttonFlex}><Button title="Take photo" secondary onPress={() => chooseImage(true)} /></View></View>{!!profile.imageUri && <Button title="Remove image" secondary onPress={() => { setProfile({ ...profile, imageUri: null }); setMediaMessage('Profile image removed. Save the profile on the Profile tab to persist this change.'); }} />}{!!mediaMessage && <Text style={styles.notice}>{mediaMessage}</Text>}</Card>
    <Card><SectionTitle>At a glance</SectionTitle><Text style={styles.body}>Software Engineering student building practical mobile and web solutions.</Text><Text style={styles.small}>Registration: {REGISTRATION}</Text></Card>
  </Screen>;
}

function SkillsScreen() {
  const skills = ['Python', 'JavaScript', 'TypeScript', 'React Native', 'HTML and CSS'];
  const education = [
    { period: 'Current', title: 'Software Engineering', detail: 'Institut d’Enseignement Supérieur de Ruhengeri (INES) — confirm your programme dates and award details.' },
    { period: 'Training', title: 'Mobile Application Development', detail: 'React Native, Expo, TypeScript, navigation, local storage and Android packaging through coursework.' },
  ];
  return <Screen><Text style={styles.pageTitle}>Skills & Education</Text><Text style={styles.body}>Edit this content so it accurately reflects skills you can demonstrate.</Text><SectionTitle>Technical skills</SectionTitle>{skills.map((skill, i) => <Card key={skill}><View style={styles.skillRow}><View style={styles.skillNumber}><Text style={styles.skillNumberText}>{i + 1}</Text></View><View style={{ flex: 1 }}><Text style={styles.cardTitle}>{skill}</Text><Text style={styles.small}>Include a short example of how you have used this skill in your own work.</Text></View></View></Card>)}<SectionTitle>Education & training</SectionTitle>{education.map(item => <Card key={item.title}><Text style={styles.timelinePeriod}>{item.period}</Text><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.body}>{item.detail}</Text></Card>)}</Screen>;
}

function ProjectsScreen({ openProject }: { openProject: (id: string) => void }) {
  return <Screen><Text style={styles.pageTitle}>Projects</Text><Text style={styles.body}>These entries are editable examples. Make sure every claimed contribution matches your real work.</Text>{projects.map((p, i) => <Card key={p.id}><Text style={styles.projectIndex}>PROJECT 0{i + 1}</Text><Text style={styles.cardTitle}>{p.title}</Text><Text style={styles.body}>{p.problem}</Text><Text style={styles.label}>Technology</Text><Text style={styles.small}>{p.technology}</Text><Button title="View project details" onPress={() => openProject(p.id)} /></Card>)}</Screen>;
}

function ProjectDetailsScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'ProjectDetails'>) {
  const project = projects.find(p => p.id === route.params.projectId);
  if (!project) return <Screen><Text style={styles.pageTitle}>Project not found</Text><Button title="Go back" onPress={() => navigation.goBack()} /></Screen>;
  return <Screen><Text style={styles.eyebrow}>PROJECT DETAILS</Text><Text style={styles.pageTitle}>{project.title}</Text><Card><SectionTitle>Problem</SectionTitle><Text style={styles.body}>{project.problem}</Text></Card><Card><SectionTitle>My contribution</SectionTitle><Text style={styles.body}>{project.contribution}</Text></Card><Card><SectionTitle>Technology used</SectionTitle><Text style={styles.body}>{project.technology}</Text></Card><Card><SectionTitle>Outcome / evidence</SectionTitle><Text style={styles.body}>{project.outcome}</Text></Card><Button title="Back to portfolio" onPress={() => navigation.goBack()} /></Screen>;
}

function ProfileScreen({ profile, setProfile, saveProfile, resetProfile, saving }: { profile: Profile; setProfile: (p: Profile) => void; saveProfile: () => Promise<boolean>; resetProfile: () => Promise<void>; saving: boolean }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  function validate() {
    const e: Record<string, string> = {};
    if (profile.headline.trim().length < 5) e.headline = 'Headline must contain at least 5 characters.';
    if (profile.bio.trim().length < 30) e.bio = 'Biography must contain at least 30 characters.';
    if (profile.primarySkill.trim().length < 2) e.primarySkill = 'Enter a primary skill with at least 2 characters.';
    setErrors(e); return Object.keys(e).length === 0;
  }
  async function onSave() {
    if (!validate()) { setMessage('Please correct the highlighted fields before saving.'); return; }
    const saved = await saveProfile(); setMessage(saved ? 'Profile saved on this device.' : 'Save failed. Please try again and check device storage.');
  }
  return <Screen><Text style={styles.pageTitle}>Edit Profile</Text><Text style={styles.body}>Update your portfolio details. Your changes are stored locally on this device.</Text><Card>
    <Field label="Professional headline" value={profile.headline} onChangeText={v => setProfile({ ...profile, headline: v })} placeholder="e.g. Software Engineering Student" error={errors.headline} maxLength={70} />
    <Field label="Short biography" value={profile.bio} onChangeText={v => setProfile({ ...profile, bio: v })} placeholder="Write a short introduction" multiline error={errors.bio} maxLength={500} />
    <Field label="Primary skill" value={profile.primarySkill} onChangeText={v => setProfile({ ...profile, primarySkill: v })} placeholder="e.g. TypeScript" error={errors.primarySkill} maxLength={40} />
    <View style={styles.switchRow}><View style={{ flex: 1 }}><Text style={styles.label}>Available for opportunities</Text><Text style={styles.small}>This status is shown on the Home screen.</Text></View><Switch value={profile.available} onValueChange={v => setProfile({ ...profile, available: v })} accessibilityLabel="Available for opportunities" /></View>
    <Button title={saving ? 'Saving…' : 'Validate and save'} onPress={onSave} />
    <Button title="Reset to default profile" secondary onPress={() => Alert.alert('Reset profile?', 'This restores the example profile stored in this app.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Reset', style: 'destructive', onPress: async () => { await resetProfile(); setErrors({}); setMessage('Profile reset to the example values.'); } }])} />
    {!!message && <Text style={styles.notice}>{message}</Text>}
  </Card></Screen>;
}

function AboutScreen() {
  return <Screen><Text style={styles.pageTitle}>About</Text><Card><SectionTitle>{APP_NAME}</SectionTitle><Text style={styles.body}>A personal portfolio app for introducing a Software Engineering student to internship reviewers and other professional opportunities.</Text><Text style={styles.label}>Student</Text><Text style={styles.body}>{STUDENT}</Text><Text style={styles.label}>Registration number</Text><Text style={styles.body}>{REGISTRATION}</Text><Text style={styles.label}>Verification code</Text><Text style={styles.verify}>{VERIFY}</Text><Text style={styles.label}>Version</Text><Text style={styles.body}>1.0.0 (verify after release build)</Text><Text style={styles.label}>Data use</Text><Text style={styles.body}>Editable profile text and the selected image reference are stored locally on this device using AsyncStorage. The app does not intentionally send this profile data to a server. Do not enter passwords or sensitive personal information.</Text><Text style={styles.label}>Offline behavior</Text><Text style={styles.body}>Core portfolio screens and saved text work offline. Camera and gallery behavior depends on device permissions. Build and download links require an internet connection.</Text></Card></Screen>;
}

function MainTabs({ profile, setProfile, saveProfile, resetProfile, saving }: { profile: Profile; setProfile: (p: Profile) => void; saveProfile: () => Promise<boolean>; resetProfile: () => Promise<void>; saving: boolean }) {
  const navigation = useNavigation<any>();
  return <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: C.primary, tabBarInactiveTintColor: C.muted, tabBarStyle: { height: 62, paddingBottom: 7, paddingTop: 6, backgroundColor: '#FFFFFF' }, tabBarLabelStyle: { fontSize: 11, fontWeight: '600' } }}>
    <Tab.Screen name="Home">{() => <HomeScreen profile={profile} setProfile={setProfile} />}</Tab.Screen>
    <Tab.Screen name="Skills" component={SkillsScreen} />
    <Tab.Screen name="Projects">{() => <ProjectsScreen openProject={(id) => navigation.navigate('ProjectDetails', { projectId: id })} />}</Tab.Screen>
    <Tab.Screen name="Profile">{() => <ProfileScreen profile={profile} setProfile={setProfile} saveProfile={saveProfile} resetProfile={resetProfile} saving={saving} />}</Tab.Screen>
    <Tab.Screen name="About" component={AboutScreen} />
  </Tab.Navigator>;
}

export default function App() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as Partial<Profile>;
          setProfile({ ...defaultProfile, ...parsed });
        }
      } catch { Alert.alert('Saved profile unavailable', 'The stored profile could not be read. The example profile is shown instead.'); }
      finally { setLoading(false); }
    })();
  }, []);
  async function saveProfile(): Promise<boolean> {
    setSaving(true);
    try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile)); return true; }
    catch { Alert.alert('Save failed', 'The profile could not be saved on this device. Check available storage and try again.'); return false; }
    finally { setSaving(false); }
  }
  async function resetProfile() {
    setProfile(defaultProfile);
    try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfile)); }
    catch { Alert.alert('Reset failed', 'The default profile is visible but could not be saved.'); }
  }
  if (loading) return <View style={styles.loading}><ActivityIndicator size="large" color={C.primary} /><Text style={styles.body}>Loading saved profile…</Text></View>;
  return <NavigationContainer><StatusBar style="dark" /><Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: C.bg }, headerTintColor: C.ink, headerTitleStyle: { fontWeight: '700' }, contentStyle: { backgroundColor: C.bg } }}>
    <Stack.Screen name="MainTabs" options={{ title: APP_NAME, headerShown: false }}>{() => <MainTabs profile={profile} setProfile={setProfile} saveProfile={saveProfile} resetProfile={resetProfile} saving={saving} />}</Stack.Screen>
    <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} options={{ title: 'Project Details' }} />
  </Stack.Navigator></NavigationContainer>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg }, content: { padding: 16, paddingBottom: 32, gap: 14 },
  hero: { backgroundColor: C.pale, borderRadius: 22, padding: 20, alignItems: 'flex-start', gap: 10, borderWidth: 1, borderColor: '#D8E5FF' },
  avatarWrap: { alignSelf: 'center', marginBottom: 4 }, avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#DCE3EE' },
  avatarFallback: { width: 100, height: 100, borderRadius: 50, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center' },
  avatarInitials: { color: '#FFFFFF', fontSize: 30, fontWeight: '800' }, eyebrow: { color: C.primary, fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  heroTitle: { color: C.ink, fontSize: 26, fontWeight: '800', lineHeight: 33 }, headline: { color: C.primary, fontSize: 16, fontWeight: '700' },
  body: { color: C.muted, fontSize: 14, lineHeight: 21 }, small: { color: C.muted, fontSize: 12, lineHeight: 18 },
  verify: { color: C.primary, fontWeight: '800', fontSize: 13, letterSpacing: 0.5, marginTop: 2 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 }, tag: { backgroundColor: '#DCE8FF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 }, tagText: { color: '#214E91', fontSize: 11, fontWeight: '700' },
  card: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 16, gap: 10 },
  sectionTitle: { color: C.ink, fontSize: 17, fontWeight: '800' }, pageTitle: { color: C.ink, fontSize: 26, fontWeight: '800', lineHeight: 32 },
  cardTitle: { color: C.ink, fontSize: 16, fontWeight: '800' }, label: { color: C.ink, fontSize: 13, fontWeight: '700', marginBottom: 5 },
  fieldWrap: { marginBottom: 3 }, input: { borderWidth: 1, borderColor: C.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 15, color: C.ink, backgroundColor: '#FFFFFF', minHeight: 46 },
  multiline: { minHeight: 110, paddingTop: 12 }, inputError: { borderColor: C.red, borderWidth: 1.5 }, error: { color: C.red, fontSize: 12, minHeight: 16, marginTop: 3 }, hidden: { color: 'transparent' },
  button: { backgroundColor: C.primary, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, alignItems: 'center', justifyContent: 'center', minHeight: 44, marginTop: 2 },
  buttonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 13 }, secondaryButton: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: C.border }, secondaryButtonText: { color: C.primary },
  buttonRow: { flexDirection: 'row', gap: 8 }, buttonFlex: { flex: 1 }, notice: { color: C.green, fontSize: 12, lineHeight: 18 }, skillRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  skillNumber: { width: 34, height: 34, borderRadius: 17, backgroundColor: C.pale, alignItems: 'center', justifyContent: 'center' }, skillNumberText: { color: C.primary, fontWeight: '800' },
  timelinePeriod: { color: C.primary, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' }, projectIndex: { color: C.primary, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 5 }, loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: C.bg }
});


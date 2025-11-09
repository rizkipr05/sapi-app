import { useNavigation, useRoute } from '@react-navigation/native';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import colors from '../theme/colors';
import sp from '../theme/spacing';

export default function DetailScreen() {
  const route = useRoute();
  const nav = useNavigation();
  const item = route.params?.item ?? {
    title: 'Untitled',
    subtitle: 'No description',
    image: 'https://picsum.photos/seed/untitled/800/400',
  };

  return (
    <View style={styles.page}>
      <Header title={item.title} rightLabel="Back" onRightPress={() => nav.goBack()} />
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: item.image }} style={styles.banner} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.subtitle}</Text>

        <View style={styles.ctaRow}>
          <Pressable style={styles.cta}>
            <Text style={styles.ctaText}>Primary Action</Text>
          </Pressable>
          <Pressable style={[styles.cta, styles.ctaGhost]}>
            <Text style={styles.ctaGhostText}>Secondary</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  body: { padding: sp.lg, gap: sp.md },
  banner: { width: '100%', height: 200, borderRadius: 16 },
  title: { color: colors.text, fontSize: 20, fontWeight: '800' },
  desc: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  ctaRow: { flexDirection: 'row', gap: sp.md, marginTop: sp.md },
  cta: {
    backgroundColor: colors.primary,
    paddingVertical: sp.sm,
    paddingHorizontal: sp.lg,
    borderRadius: 12,
  },
  ctaText: { color: colors.white, fontWeight: '700' },
  ctaGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  ctaGhostText: { color: colors.primary, fontWeight: '700' },
});

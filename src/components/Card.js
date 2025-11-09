import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import colors from '../theme/colors';
import sp from '../theme/spacing';

export default function Card({ title, subtitle, image, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.thumb}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.thumb, styles.thumbPlaceholder]} />
      )}
      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: sp.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  thumb: { width: '100%', height: 140 },
  thumbPlaceholder: { backgroundColor: '#1f2937' },
  meta: { padding: sp.md, gap: 6 },
  title: { color: colors.text, fontSize: 16, fontWeight: '700' },
  subtitle: { color: colors.muted, fontSize: 13, lineHeight: 18 },
});

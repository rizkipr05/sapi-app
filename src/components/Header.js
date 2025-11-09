import { Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../theme/colors';
import sp from '../theme/spacing';

export default function Header({ title = 'RN UI', rightLabel, onRightPress }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {rightLabel ? (
        <Pressable onPress={onRightPress} style={styles.btn}>
          <Text style={styles.btnText}>{rightLabel}</Text>
        </Pressable>
      ) : <View style={{ width: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 52,
    paddingHorizontal: sp.lg,
    paddingBottom: sp.md,
    backgroundColor: colors.bg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: { color: colors.white, fontSize: 22, fontWeight: '700' },
  btn: {
    paddingHorizontal: sp.md,
    paddingVertical: sp.xs,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  btnText: { color: colors.white, fontWeight: '600' },
});

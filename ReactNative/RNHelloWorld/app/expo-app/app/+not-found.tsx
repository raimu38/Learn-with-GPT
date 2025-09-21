import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function NotFoundScreeen() {
  return (
    <>
      <Stack.Screen
        options={{ title: "Oops! Not Found 残念でしたー ないよん" }}
      />
      <View style={styles.container}>
        <Link href="/" style={styles.button}>
          Go back to Home Screen!
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});

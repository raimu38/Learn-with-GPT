// app/about.tsx
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen(){
  return(
    <View style={styles.container}>
      <Text style={styles.text}>
        About Screen
      </Text>
      <Link href="/" style={styles.button}>
      Home
</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent:"center"
  },
  text:{
    color:'#44f',
    fontSize: 20,
    fontWeight: '500'
  },
  button:{
    fontSize:20,
    fontWeight: "500",
    color:"#fff",
    backgroundColor: "#0da",
    padding:12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius:20,
  }

});
import { View, Text, StyleSheet , TouchableOpacity} from 'react-native'
import React from 'react'

const Permission = ({requestPermission}) => {
  return (
    <View style={styles.container}>
    <Text style={{ textAlign: "center" }}>
      Permission requise
    </Text>
    <TouchableOpacity onPress={requestPermission} title="Autoriser" />
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
})
export default Permission
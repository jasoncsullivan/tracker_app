import React, { useContext } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { ListItem } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { Context as TrackContext } from "../context/TrackContext";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);

  return (
    <View>
      <NavigationEvents onWillFocus={fetchTracks} />

      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", { _id: item._id })
              }
            >
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

TrackListScreen.navigationOptions = { title: "Tracks" };

const styles = StyleSheet.create({});

export default TrackListScreen;

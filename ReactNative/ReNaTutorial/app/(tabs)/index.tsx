import { useState } from "react";
import { Button, Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type CatProps = {
  name: string;
};

const Cat = (props: CatProps) => {
  const [isHungry, setIsHungry] = useState(true);
  return (
    <View>
      <Text>
        Iam {props.name} , and Iam {isHungry ? " お腹空きすぎました" : "お腹いっぱいです"}
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? "ご飯をくださいな" : "あなたは命の恩人です"}
      />
    </View>
  );
};

const PizzaTranslator = () => {
  const [text, setText] = useState("");
  return (
    <View style={{}}>
      <TextInput
        onChangeText={(newText) => {
          setText(newText);
        }}
        defaultValue={text}
        placeholder="Type here Tranlate"
        style={{ height: 20, width: 100, padding: 2 }}
      />
      <Text style={{ padding: 10, fontSize: 30 }}>
        {text
          .split("あ")
          .map((word) => {
            return word && "ああ";
          })
          .join("合体")}
      </Text>
      <Text>{text.split(" ")}</Text>
    </View>
  );
};

const logo = {
  uri: "https://reactnative.dev/img/tiny_logo.png",
  width: 64,
  height: 64,
};

const Scroll = () => {
  const array100 = [100];
  return array100.map(() => <Image source={logo} />);
};

const Cafe = () => {
  return (
    <>
      <Cat name="Kuro" />
      <Cat name="Siro" />
      <PizzaTranslator />

      <Scroll />
    </>
  );
};

export default Cafe;

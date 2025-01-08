import { useState } from "react";
import { Button, Text, View } from "react-native";

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

const Cafe = () => {
  return (
    <>
      <Cat name="Kuro" />
      <Cat name="Siro" />
    </>
  );
};

export default Cafe;

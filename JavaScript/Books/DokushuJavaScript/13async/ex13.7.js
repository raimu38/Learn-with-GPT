function action(actionName, duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${actionName}`);
      resolve();
    }, duration);
  });
}

async function makeAction() {
  await action("散歩", 500);
  await action("朝食", 200);
  await Promise.all([action("昼食", 500), action("おしゃべり", 100)]);
  await action("夕食", 600);
  await action("趣味", 400);
}
makeAction();

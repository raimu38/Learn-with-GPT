export const test = ()  => {
  const name:string = "raimu";
  const parts: string[] = [];
  const gender: "man" | "woman" = "man"
  const values: string | number = "thankyo"
  const notDefifined: undefined = undefined;


}

type User = {
  id: number;
  name: string;
  email?: string; // email は省略されてるかも
};

const users: User[] = [
  { id: 1, name: "Raimu", email: "raimu@example.com" },
  { id: 2, name: "Taro" },
  { id: 3, name: "Mika", email: "mika@example.com" },
  { id: 4, name: "Yuki" },
];

const checkMail = (users: User[]) : User[] => {
  const hasEmailUsers = users.filter(user => user.email !== undefined)
  console.log(hasEmailUsers)
  return hasEmailUsers; 
}

checkMail(users);


type Address ={
  city: string;
  zip?: string ;
}

type UserA = {
  id: number;
  name: string;
  address?: Address //  It is same mean between ? &  ** | undefined
}

const userAs: UserA[] = [
  { id: 1, name: "Raimu", address: { city: "Tokyo", zip: "123-4567" } },
  { id: 2, name: "Taro" },
  { id: 3, name: "Mika", address: { city: "Osaka" } },
];

const checkAddressZip = (users: UserA[]) : UserA[] => {
  const hasAddressZipUsers = users.filter(
(user):user is Required<UserA> => user.address?.zip !== undefined
);
  console.log(hasAddressZipUsers)
  return hasAddressZipUsers
}

checkAddressZip(userAs)

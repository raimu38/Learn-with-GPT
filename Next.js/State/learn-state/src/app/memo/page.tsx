"use client";

import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const MyButton = () => {
  return <button>I'm button</button>;
};

const items = [
  { href: "/setting", label: "Setting" },
  { href: "/support", label: "Support" },
  { href: "/license", label: "License" },
];

function Example() {
  return (
    <Menu>
      <MenuButton
        className={
          "bg-sky-500 hover:bg-sky-700 px-4 py-1 rounded-full text-white font-bold border-none animate-pulse "
        }
      >
        My account
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="bg-gray-900 border-4 border-white rounded-2xl "
      >
        {items.map(({ href, label }, index, array) => {
          const isLast = index === array.length - 1;
          label = label[1].toUpperCase() + label.slice(0, 4);
          return (
            <MenuItem key={index}>
              <a
                className={`block px-4 py-2 ${
                  isLast ? "data-[focus]:bg-white/10" : "data-[focus]:bg-"
                }`}
                href={href}
              >
                {index}
                {label}
              </a>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}

const user = {
  name: "Raimu Miwa",
  imageUrl: "https://i.imgur.com/yXOvdOSs.jpg",
  imageSize: 90,
};

const MyApp = () => {
  return (
    <div>
      <h1> Hello ! Button World!</h1>
      <MyButton />
      <Profile />
      <Example />
      <SkeltonExample />
    </div>
  );
};

function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={"Photo of" + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
        }}
      ></img>
    </>
  );
}

import { useState } from "react";
import { Switch } from "@headlessui/react";

export function SkeltonExample() {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div
      className={`p-6 max-w-lg mx-auto space-y-4
       rounded-2xl border-2 border-amber-400/40`}
    >
      <Switch
        checked={loading}
        onChange={setLoading}
        className={`${
          loading ? "bg-blue-600" : "bg-gray-300"
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
      >
        <span
          className={`${loading ? "translate-x-6" : "translate-x-1"}

inline-block h-4 w-4 transform rounded-full bg-white transition-colors`}
        />
      </Switch>
      <p className="text-sm text-gray-600">
        Loading : {loading ? "ON" : "OFF"}
      </p>
      <div className="space-y-4">
        {loading ? (
          // Skeleton UI
          <>
            <div className="h-8 bg-gray-300 rounded-xs animate-pulse w-1/3" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          </>
        ) : (
          // 実際のコンテンツ
          <>
            <h2 className="text-xl font-bold text-indigo-600">Loaded Title</h2>
            <p className="text-gray-800">
              This is the loaded content. It's now ready!
            </p>
            <p className="text-gray-500">You can customize this area freely.</p>
          </>
        )}
      </div>
    </div>
  );
}
export default MyApp;

import { Redirect, Slot } from "expo-router";
import React from "react";

export default function _Layout() {
  const isAuhtenticated = false;

  if (!isAuhtenticated) return <Redirect href="/sign-in" />;

  return <Slot />;
}

import React from "react";
import {
  Layout,
  Page,
  InlineGrid,
} from "@shopify/polaris";
import { AccountConnect } from "../components/AccountConnect"

export default function () {
  return (
    <Page title="App">
      <Layout>
        <Layout.Section>
          <AccountConnect />
        </Layout.Section>
      </Layout>
    </Page>
  );
}

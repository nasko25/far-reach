import {
  Layout,
  Page,
  InlineGrid,
} from "@shopify/polaris";
import { AccountConnect } from "../components/AccountConnect"
import RegisterProduct from "../components/RegisterProduct";
import Counter from "../components/Counter";

export default function () {
  return (
    <Page title="App">
      <Layout>
        <Layout.Section>
          <AccountConnect />
        </Layout.Section>
        <Layout.Section>
          <InlineGrid gap="400" columns={2}>
            <RegisterProduct />
            <Counter />
          </InlineGrid>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

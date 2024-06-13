import { useFindFirst, useQuery } from "@gadgetinc/react";
import {
  Card,
  Banner,
  FooterHelp,
  InlineStack,
  Icon,
  Layout,
  Link,
  Page,
  Spinner,
  Text,
  BlockStack,
  InlineGrid,
} from "@shopify/polaris";
import { StoreIcon } from "@shopify/polaris-icons";
import { api } from "../api";
import { AccountConnect } from "../components/AccountConnect"
import RegisterProduct from "../components/RegisterProduct";
import Counter from "../components/Counter";

const gadgetMetaQuery = `
  query {
    gadgetMeta {
      slug
      editURL
    }
  }
`;

export default function () {
  const [{ data, fetching, error }] = useFindFirst(api.shopifyShop);
  const [{ data: metaData, fetching: fetchingGadgetMeta }] = useQuery({
    query: gadgetMetaQuery,
  });

  if (error) {
    return (
      <Page title="Error">
        <Text variant="bodyMd" as="p">
          Error: {error.toString()}
        </Text>
      </Page>
    );
  }

  if (fetching || fetchingGadgetMeta) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Spinner accessibilityLabel="Spinner example" size="large" />
      </div>
    );
  }

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

import { Form, FormLayout, TextField, Text, Button, Card, InlineStack, Thumbnail, BlockStack, Label, InlineGrid } from '@shopify/polaris';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useFindFirst } from "@gadgetinc/react";
import { useAccount, usePrepareTransactionRequest, useWriteContract } from 'wagmi';
import { contractAbi } from '../abi';
import { ImageIcon, ResetIcon } from '@shopify/polaris-icons';
import { api } from '../api';
import { useCapabilities, useWriteContracts } from 'wagmi/experimental';
import { contractAddress } from '../config';

export default function CreateCampaign() {
  const { address, chainId } = useAccount();
  const [formState, setFormState] = useState({
    productId: '',
    productTitle: '',
    productImage: '',
    productPrice: '',
    productStock: 0,
  });
  const [comission, setComission] = useState(1);
  const [campaignName, setCampaignName] = useState('');
  const [maxFID, setMaxFID] = useState(0n);
  const [minFollowers, setMinFollowers] = useState(0n);
  const [minPostsLastWeek, setMinPostsLastWeek] = useState(0n);
  const [permalink, setPermalink] = useState('');
  const [price, setPrice] = useState(0n);
  const { writeContracts } = useWriteContracts();
  const { writeContract } = useWriteContract();

  // get the current shop id (shop tenancy applied automatically, only one shop available)
  const [{ data }] = useFindFirst(api.shopifyShop);

  async function selectProduct() {
    const products = await window.shopify.resourcePicker({
      type: "product",
      action: "select",
    });

    if (products) {
      const { images, title, variants } = products[0];
      setFormState({
        productId: variants[0].id?.split('/')[4] ?? '',
        productTitle: title,
        productImage: images[0]?.originalSrc,
        productPrice: variants[0].price ?? '',
        productStock: variants[0].inventoryQuantity ?? 0,
      });
    }
  }

  useEffect(() => {
    if (formState.productId && data) {
      const link = `https://${data.domain}/cart/${formState.productId}:1`;
      setPermalink(link);
      console.log('permalink', link);
    }
  }, [formState.productId]);

  useEffect(() => {
    if (formState.productPrice) {
      setPrice(BigInt(Number(formState.productPrice) * 1000000));
    }
  }, [formState.productPrice]);

  const { data: availableCapabilities } = useCapabilities({
    account: address,
  });
  const capabilities = useMemo(() => {
    if (!availableCapabilities || !chainId) return;
    const capabilitiesForChain = availableCapabilities[chainId];
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) {
      return {
        paymasterService: {
          url: process.env.GADGET_PUBLIC_PAYMASTER_PROXY_SERVER_URL || `${document.location.origin}/api/paymaster`,
        },
      };
    }
  }, [availableCapabilities]);



  const handleSubmit = useCallback(() => {
    writeContracts({
      contracts: [{
        abi: contractAbi,
        functionName: 'createCampaign',
        args: [
          campaignName,
          formState.productTitle,
          BigInt(formState.productId),
          // price,
          100000n,
          comission,
          formState.productStock,
          maxFID,
          minFollowers,
          minPostsLastWeek,
          permalink,
          formState.productImage
        ],
        address: contractAddress,
      }],
      capabilities,
    })
  }, [
    formState,
    price,
    comission,
    maxFID,
    minFollowers,
    minPostsLastWeek,
    permalink,
  ]);

  const handleReset = useCallback(() => {
    setFormState({
      productId: '',
      productTitle: '',
      productImage: '',
      productPrice: '',
      productStock: 0,
    });
    setComission(1);
    setCampaignName('');
    setMaxFID(0n);
    setMinFollowers(0n);
    setMinPostsLastWeek(0n);
    setPermalink('');
    setPrice(0n);
  }, []);


  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <InlineGrid columns="1fr auto">
            <Text variant="headingXl" as="h2">
              Create a new Campaign
            </Text>
            <Button
              onClick={handleReset}
              accessibilityLabel="Reset"
              icon={ResetIcon}
              tone='critical'
              variant='primary'
            >
              Reset
            </Button>
          </InlineGrid>
          <TextField
            label="Campaign Name"
            type="text"
            value={campaignName}
            onChange={(value) => setCampaignName(value)}
            autoComplete="off"
          />
          <Text variant="bodyMd" as="p">
            Choose a product
          </Text>
          {formState.productId ? (
            <InlineStack blockAlign="center" gap="500">
              <Thumbnail
                source={formState.productImage || ImageIcon}
                alt={'Product Image'}
              />
              <Text as="span" variant="headingMd" fontWeight="semibold">
                {formState.productTitle}
              </Text>
              <Text as="span" variant="headingMd" fontWeight="semibold">
                ${formState.productPrice}
              </Text>
            </InlineStack>
          ) : (
            <BlockStack gap="200">
              <Button onClick={selectProduct} id="select-product">
                Select product
              </Button>
            </BlockStack>
          )}
          <TextField
            label="Comission"
            type="number"
            value={comission.toString()}
            onChange={(value: string) => setComission(Number(value))}
            autoComplete="off"
          />
          <TextField
            label="Maximum FID"
            type="number"
            value={maxFID.toString()}
            onChange={(value) => setMaxFID(BigInt(value))}
            autoComplete="off"
          />
          <TextField
            label="Minimum number of followers"
            type="number"
            value={minFollowers.toString()}
            onChange={(value) => setMinFollowers(BigInt(value))}
            autoComplete="off"
          />
          <TextField
            label="Number of active posts last week"
            type="number"
            value={minPostsLastWeek.toString()}
            onChange={(value) => setMinPostsLastWeek(BigInt(value))}
            autoComplete="off"
          />
          <Button submit>Submit</Button>
        </FormLayout>
      </Form>
    </Card>
  );
}
import { Text, Card, Layout, Spinner, InlineGrid, BlockStack } from '@shopify/polaris';
import React, { useMemo } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { contractAbi } from '../abi';
import { contractAddress } from '../config';
import { zeroAddress } from 'viem';

export default function OnchainPayouts() {
    const { address } = useAccount();

    const { data: merchantData, isLoading } = useReadContract({
        abi: contractAbi,
        address: contractAddress,
        functionName: 'merchants',
        args: [address ?? zeroAddress],
    });

    const formattedRevenue = useMemo(() => {
        console.log('merchantData', merchantData)
        if (merchantData) {
            return (merchantData[4] / 1000000n).toString();
        }
        return '0'
    }, [merchantData]);


    return (
        <Layout>
            <Layout.Section>
                <InlineGrid gap="400" columns={2}>
                    <Card>
                        <BlockStack gap="1000" align='space-evenly'>
                            <Text alignment='center' variant="headingLg" as="h2">
                                Number of Sales
                            </Text>
                            {
                                isLoading
                                    ? <Spinner accessibilityLabel="Spinner example" size="large" />
                                    : merchantData && (
                                        <Text alignment='center' variant="heading3xl" as="h2">
                                            {merchantData[3].toString()}
                                        </Text>
                                    )
                            }
                        </BlockStack>
                    </Card>
                    <Card>
                        <BlockStack gap="1000" align='space-evenly'>
                            <Text alignment='center' variant="headingLg" as="h2">
                                Total Earned
                            </Text>
                            {
                                isLoading
                                    ? <Spinner accessibilityLabel="Spinner example" size="large" />
                                    : merchantData && (
                                        <Text alignment='center' variant="heading3xl" as="h2">
                                            {formattedRevenue} USDC
                                        </Text>
                                    )
                            }
                            <div
                                style={{
                                    padding: '14px var(--p-space-200)',
                                    height: '20px',
                                }}
                            />
                        </BlockStack>
                    </Card>
                </InlineGrid>
            </Layout.Section>
            <Layout.Section>
                <InlineGrid gap="400" columns={2}>
                    <Card>
                        <BlockStack gap="1000" align='space-evenly'>
                            <Text alignment='center' variant="headingLg" as="h2">
                                Number of Campaigns to Date
                            </Text>
                            {
                                isLoading
                                    ? <Spinner accessibilityLabel="Spinner example" size="large" />
                                    : merchantData && (
                                        <Text alignment='center' variant="headingSm" as="h2">
                                            Coming soon...
                                        </Text>
                                    )
                            }
                        </BlockStack>
                    </Card>
                    <Card>
                        <BlockStack gap="1000" align='space-evenly'>
                            <Text alignment='center' variant="headingLg" as="h2">
                                Affiliate Payout
                            </Text>
                            {
                                isLoading
                                    ? <Spinner accessibilityLabel="Spinner example" size="large" />
                                    : merchantData && (
                                        <Text alignment='center' variant="headingSm" as="h2">
                                            Coming soon...
                                        </Text>
                                    )
                            }
                            <div
                                style={{
                                    padding: '14px var(--p-space-200)',
                                    height: '20px',
                                }}
                            />
                        </BlockStack>
                    </Card>
                </InlineGrid>
            </Layout.Section>
        </Layout >
    );
}
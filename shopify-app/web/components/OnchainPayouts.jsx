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

    const { data: campaigns, isLoading: isCampaignsLoading } = useReadContract({
        abi: contractAbi,
        address: contractAddress,
        functionName: 'getCampaignsForMerchant',
        args: [address ?? zeroAddress],
    });

    const formattedRevenue = useMemo(() => {
        console.log('merchantData', merchantData)
        if (merchantData) {
            return (Number(merchantData[4]) / 1000000).toString();
        }
        return '0'
    }, [merchantData]);

    const formattedAffiliateEarnings = useMemo(() => {
        if (merchantData) {
            return (Number(merchantData[5]) / 1000000).toString();
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
                                        <Text alignment='center' variant="heading2xl" as="h2">
                                            {merchantData[3].toString()} Sales
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
                                        <Text alignment='center' variant="heading2xl" as="h2">
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
                                isCampaignsLoading
                                    ? <Spinner accessibilityLabel="Spinner example" size="large" />
                                    : campaigns && (
                                        <Text alignment='center' variant="heading2xl" as="h2">
                                            {campaigns.length.toString()} Campaigns
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
                                        <Text alignment='center' variant="heading2xl" as="h2">
                                            {formattedAffiliateEarnings} USDC
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
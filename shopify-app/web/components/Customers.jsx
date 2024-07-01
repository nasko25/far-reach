import { Text, Card, Layout, Spinner, InlineGrid, BlockStack, Select } from '@shopify/polaris';
import React, { useState, useEffect, useCallback } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { contractAbi } from '../abi';
import { contractAddress } from '../config';
import { zeroAddress } from 'viem';

export default function Customers() {
    const { address } = useAccount();
    const [selected, setSelected] = useState();
    const [options, setOptions] = useState([]);
    const [campaignAnalytics, setCampaignAnalytics] = useState({
        customersAlsoBought: [],
        networths: [],
        userConversion: 0,
    });
    const [averageNetworth, setAverageNetworth] = useState(0);

    const { data: campaigns, isLoading: isCampaignsLoading } = useReadContract({
        abi: contractAbi,
        address: contractAddress,
        functionName: 'getCampaignsForMerchant',
        args: [address ?? zeroAddress],
    });


    useEffect(() => {
        if (campaigns) {
            const options = campaigns.map((campaign) => {
                return {
                    value: campaign.id.toString(),
                    label: campaign.name,
                };
            });

            setOptions(options);
        }
    }, [campaigns]);

    useEffect(() => {
        if (selected) {
            console.log('selected', selected)
            const fetchAnalytics = async () => {
                const result = await fetch(`https://far-reach.vercel.app/api/analytics/${selected}`);
                const data = await result.json();
                setCampaignAnalytics({
                    customersAlsoBought: data.customersAlsoBought,
                    networths: data.networths,
                    userConversion: data.userConversion,
                });
            }
            fetchAnalytics();
        }
    }, [selected]);

    useEffect(() => {
        if (campaignAnalytics.networths.length > 0) {
            const totalNetworth = campaignAnalytics.networths.reduce((acc, networth) => acc + networth, 0);
            setAverageNetworth(totalNetworth / campaignAnalytics.networths.length);
        }
    }, [campaignAnalytics]);

    const handleSelectChange = useCallback(
        (value) => {
            setSelected(value)
        },
        [],
    );


    return (
        <Layout>
            <Layout.Section>
                <Text alignment='center' variant="headingLg" as="h2">
                    {selected ? selected.label : 'Select a campaign'}
                </Text>
            </Layout.Section>
            <Layout.Section>
                <Select
                    label="Campaign"
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                />
            </Layout.Section>
            {
                selected && campaignAnalytics ? (
                    <Layout.Section>
                        <InlineGrid gap="400" columns={2}>
                            <Card>
                                <BlockStack gap="1000" align='space-evenly'>
                                    <Text alignment='center' variant="headingLg" as="h2">
                                        User Conversion
                                    </Text>
                                    <Text alignment='center' variant="heading2xl" as="h2">
                                        {campaignAnalytics.userConversion ? (campaignAnalytics.userConversion * 100).toString() : '0'}%
                                    </Text>
                                    <div
                                        style={{
                                            padding: '14px var(--p-space-200)',
                                            height: '20px',
                                        }}
                                    />
                                </BlockStack>
                            </Card>
                            <div />
                        </InlineGrid>
                    </Layout.Section>
                ) : <div />
            }
        </Layout >
    );
}
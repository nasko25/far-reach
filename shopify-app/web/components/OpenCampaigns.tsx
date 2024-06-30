import { Text, Card, Layout, Spinner, MediaCard, Thumbnail, InlineGrid, BlockStack, Button, List } from '@shopify/polaris';
import React, { useCallback, useMemo } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { contractAbi } from '../abi';
import { useCapabilities, useWriteContracts } from 'wagmi/experimental';
import { contractAddress } from '../config';
import { zeroAddress } from 'viem';
import { DeleteIcon, ShareIcon } from '@shopify/polaris-icons';

export default function OpenCampaigns() {
    const { address, chainId } = useAccount();
    const { writeContracts } = useWriteContracts();


    const { data: openCampaigns, isLoading } = useReadContract({
        abi: contractAbi,
        address: contractAddress,
        functionName: 'getCampaignsForMerchant',
        args: [address ?? zeroAddress],
    });

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

    const handleSubmit = useCallback((campaignId: bigint) => {
        writeContracts({
            contracts: [{
                abi: contractAbi,
                functionName: 'endCampaign',
                args: [
                    campaignId,
                ],
                address: contractAddress,
            }],
            capabilities
        },)
    }, []);


    return (
        <Layout>
            {
                isLoading
                    ? (
                        <Spinner />
                    )
                    :
                    openCampaigns && openCampaigns.length > 0 ? openCampaigns.filter((campaign) => campaign.status === 0).map((campaign) => (
                        <Layout.Section >
                            <Card>
                                <InlineGrid columns="1fr 8fr">
                                    <Thumbnail
                                        alt={campaign.productName}
                                        source={campaign.productImage}
                                        size='large'
                                    />
                                    <BlockStack gap="200">
                                        <InlineGrid columns="1fr auto auto" gap="200">
                                            <Text as="h2" variant="headingLg">
                                                {campaign.name}
                                            </Text>
                                            <Button
                                                onClick={() => { }}
                                                accessibilityLabel="Promote Campaign"
                                                icon={ShareIcon}
                                                disabled
                                            >
                                                Boost Campaign
                                            </Button>
                                            <Button
                                                onClick={() => handleSubmit(campaign.id)}
                                                accessibilityLabel="Delete Campaign"
                                                icon={DeleteIcon}
                                            >
                                                Delete Campaign
                                            </Button>
                                        </InlineGrid>
                                        <List type="bullet">
                                            <List.Item>Campaign ID: {campaign.id.toString()}</List.Item>
                                            <List.Item>Product Name: {campaign.productName}</List.Item>
                                            <List.Item>Product ID: {campaign.productId.toString()}</List.Item>
                                            <List.Item>Price: {campaign.price.toString()}</List.Item>
                                            <List.Item>Stock: {campaign.stock.toString()}</List.Item>
                                            <List.Item>Max FID: {campaign.maxFID.toString()}</List.Item>
                                            <List.Item>Min Followers: {campaign.minFollowers.toString()}</List.Item>
                                            <List.Item>Min Posts Last Week: {campaign.minPostsLastWeek.toString()}</List.Item>
                                        </List>
                                    </BlockStack>
                                </InlineGrid>
                            </Card>
                        </Layout.Section>
                    )) : (
                        <Layout.Section>
                            <Card>
                                <Text variant='bodyMd' as='h5'>
                                    No open campaigns
                                </Text>
                            </Card>
                        </Layout.Section>
                    )
            }

        </Layout >
    );
}
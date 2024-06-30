import React, { useCallback, useState } from "react";
import { Layout, LegacyCard, Page, Tabs, Text } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import CreateCampaign from "../components/CreateCampaign";
import OpenCampaigns from "../components/OpenCampaigns";
import { useAccount, useReadContract } from "wagmi";
import { contractAbi } from "../abi";
import { contractAddress } from "../config";
import { zeroAddress } from "viem";

export default function () {
    const navigate = useNavigate();
    const { address, isConnected } = useAccount();

    const { data: openCampaigns } = useReadContract({
        abi: contractAbi,
        address: contractAddress,
        functionName: 'getCampaignsForMerchant',
        args: [address ?? zeroAddress],
    });

    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex: number) => setSelected(selectedTabIndex),
        [],
    );

    const content = {
        0: <CreateCampaign />,
        1: <OpenCampaigns />,
    }

    const tabs = [
        {
            id: 'create-campaign',
            title: 'Create Campaign',
            content: 'Create Campaign',
            badge: '',
        },
        {
            id: 'open-campaigns',
            title: 'Open Campaigns',
            content: 'Open Campaigns',
            badge: openCampaigns?.length.toString() ?? '0',
        },
    ];


    return (
        <Page
            title="Campaigns"
            backAction={{
                content: "Dashboard",
                onAction: () => navigate("/"),
            }}
        >
            {
                isConnected ? (
                    <Layout>
                        <Layout.Section>
                            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
                                {content[selected]}
                            </Tabs>
                        </Layout.Section>
                    </Layout>
                ) : (
                    <Text variant="bodyMd" as="p">Connect your account to create a campaign</Text>
                )
            }

        </Page>
    );
}

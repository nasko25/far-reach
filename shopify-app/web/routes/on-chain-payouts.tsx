import React from "react";
import { Page, Text } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import OnchainPayouts from "../components/OnchainPayouts";

export default function () {
    const navigate = useNavigate();

    return (
        <Page
            title="Onchain Payouts"
            backAction={{
                content: "Dashboard",
                onAction: () => navigate("/"),
            }}
        >
            <OnchainPayouts />
        </Page>
    );
}

import React from "react";
import { Page, Text } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate();

    return (
        <Page
            title="Dashboard"
            backAction={{
                content: "Dashboard",
                onAction: () => navigate("/"),
            }}
        >
            Coming soon....
        </Page>
    );
}

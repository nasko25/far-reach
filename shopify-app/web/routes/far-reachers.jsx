import React from "react";
import { Page, Text } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate();

    return (
        <Page
            title="Far Reachers"
            backAction={{
                content: "Dashboard",
                onAction: () => navigate("/"),
            }}
        >
            <Text variant="bodyMd" as="p">
                Coming soon.
            </Text>
        </Page>
    );
}

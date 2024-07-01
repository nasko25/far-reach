import React from "react";
import { Page, Text } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import Customers from "../components/Customers";

export default function () {
    const navigate = useNavigate();

    return (
        <Page
            title="Customers Analytics"
            backAction={{
                content: "Dashboard",
                onAction: () => navigate("/"),
            }}
        >
            <Customers />
        </Page>
    );
}

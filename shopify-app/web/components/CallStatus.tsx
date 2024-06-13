import { Text } from "@shopify/polaris";
import { useCallsStatus } from "wagmi/experimental";

export function CallStatus({ id }: { id: string }) {
    const { data: callsStatus } = useCallsStatus({
        id,
        query: {
            refetchInterval: (data) =>
                data.state.data?.status === "CONFIRMED" ? false : 1000,
        },
    });

    return <Text as="p"> Status: {callsStatus?.status || "loading"}</Text>;
}
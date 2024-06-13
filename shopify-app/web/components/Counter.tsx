import { Text, Button, Card, InlineGrid, BlockStack, Spinner } from '@shopify/polaris';
import { useState, useCallback, useMemo } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { contractAbi } from '../abi';
import { MinusIcon, PlusIcon } from '@shopify/polaris-icons';
import { useCapabilities, useWriteContracts } from 'wagmi/experimental';
import { CallStatus } from './CallStatus';

const counterAddress = '0x9F6EdfCEed8F168D90b3DEed6270291a4c4c2b2f';


export default function Counter() {
    const account = useAccount();
    const [id, setId] = useState<string | undefined>(undefined);
    const { writeContracts } = useWriteContracts({
        mutation: { onSuccess: (id) => setId(id) },
    });

    const { data: availableCapabilities } = useCapabilities({
        account: account.address,
    });
    const capabilities = useMemo(() => {
        if (!availableCapabilities || !account.chainId) return;
        const capabilitiesForChain = availableCapabilities[account.chainId];
        if (
            capabilitiesForChain["paymasterService"] &&
            capabilitiesForChain["paymasterService"].supported
        ) {
            return {
                paymasterService: {
                    url: process.env.PAYMASTER_PROXY_SERVER_URL || `${document.location.origin}/api/paymaster`,
                },
            };
        }
    }, [availableCapabilities]);

    const {
        data,
        isError,
        isLoading
    } = useReadContract({
        abi: contractAbi,
        address: counterAddress,
        functionName: 'number',
    })

    console.log('data', data);

    const increment = useCallback(() => {
        writeContracts({
            contracts: [
                {
                    address: counterAddress,
                    abi: contractAbi,
                    functionName: "increment",
                },
            ],
            capabilities,
        });
    }, []);

    const decrement = useCallback(() => {
        writeContracts({
            contracts: [
                {
                    address: counterAddress,
                    abi: contractAbi,
                    functionName: "decrement",
                },
            ],
            capabilities,
        });
    }, []);

    return (
        <Card>
            <BlockStack gap="2000" align='space-evenly'>
                <Text alignment='center' variant="headingLg" as="h2">
                    Just a Counter
                </Text>
                {
                    isLoading
                        ? <Spinner accessibilityLabel="Spinner example" size="large" />
                        : (
                            <Text alignment='center' variant="heading3xl" as="h2">
                                {data?.toString()}
                            </Text>
                        )
                }
                <InlineGrid gap="400" columns={2}>
                    <Button onClick={increment} icon={PlusIcon}>Increment</Button>
                    <Button onClick={decrement} variant="primary" icon={MinusIcon}>Decrement</Button>
                </InlineGrid>
                {id && <CallStatus id={id} />}
            </BlockStack>
        </Card>
    );
}
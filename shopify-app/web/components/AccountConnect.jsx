import React, { useCallback, useMemo } from 'react';
import { InlineGrid, Button, Text, Card, BlockStack, List } from '@shopify/polaris';
import { useAccount, useDisconnect, useConnect, useReadContract } from 'wagmi';
import {
  ExitIcon,
  EnterIcon,
} from '@shopify/polaris-icons';
import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';
import { useCapabilities, useWriteContracts } from 'wagmi/experimental';
import { contractAddress, paymasterUrl } from '../config';
import { useFindFirst } from '@gadgetinc/react';
import { api } from '../api';
import { zeroAddress } from 'viem';
import { contractAbi } from '../abi';

export function AccountConnect() {
  const { address, isConnected, chainId } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const { writeContracts } = useWriteContracts();

  const [{ data }] = useFindFirst(api.shopifyShop);

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
          url: paymasterUrl,
        },
      };
    }
  }, [availableCapabilities]);

  const createWallet = useCallback(() => {
    connect({ connector: connectors[1] });
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === 'coinbaseWalletSDK'
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }

  }, [connectors, connect]);

  const handleRegister = useCallback(() => {
    writeContracts({
      contracts: [
        {
          address: contractAddress,
          abi: contractAbi,
          functionName: "createMerchant",
          args: ["Shopify Merchant"],
        },
      ],
      capabilities,
    });
  }, []);

  const {
    data: isRegistered,
  } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: 'isRegisteredMerchant',
    args: [address ?? zeroAddress],
  })

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Smart Account
          </Text>
          {
            isConnected ? (
              !isRegistered ? (
                <Button
                  onClick={handleRegister}
                  accessibilityLabel='Register as a merchant'
                  icon={EnterIcon}
                >
                  Register
                </Button>
              ) : (
                <Button
                  onClick={() => disconnect()}
                  accessibilityLabel='Disconnect from wallet'
                  icon={ExitIcon}
                >
                  Disconnect
                </Button>
              )) : (
              <Button
                variant='primary'
                onClick={createWallet}
                icon={CoinbaseWalletLogo({ size: 16 })}
              >
                Connect
              </Button>
            )
          }
        </InlineGrid>
        {
          isConnected && isRegistered ? address : (
            <List type='number'>
              <List.Item>
                Connect or Create your wallet.
              </List.Item>
              <List.Item>
                Register as a merchant on FarReach.
              </List.Item>
              <List.Item >
                This will allow you to register products and sell them on the platform.
              </List.Item>
            </List>
          )
        }
      </BlockStack>
    </Card>
  );
}
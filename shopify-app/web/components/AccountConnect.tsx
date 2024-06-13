import React, { useCallback, useMemo } from 'react';
import { InlineGrid, Button, Text, Card, BlockStack, List } from '@shopify/polaris';
import { useAccount, useDisconnect, useConnect, useReadContract } from 'wagmi';
import { shortenEthereumAddress } from '../helpers/shorten-ethereum-address';
import {
  EnterIcon,
  ExitIcon
} from '@shopify/polaris-icons';
import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';
import { contractAbi } from '../abi';
import { zeroAddress } from 'viem';
import { useCapabilities, useWriteContracts } from 'wagmi/experimental';

const counterAddress = '0x9F6EdfCEed8F168D90b3DEed6270291a4c4c2b2f';

export function AccountConnect() {
  const { address, isConnected, chainId } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const { writeContracts } = useWriteContracts();

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

  console.log('capabilities', capabilities);

  const createWallet = useCallback(() => {
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
          address: counterAddress,
          abi: contractAbi,
          functionName: "createMerchant",
          args: ['Merchant'],
        },
      ],
      capabilities,
    });
  }, []);


  const {
    data: isRegistered,
    isError,
    isLoading
  } = useReadContract({
    abi: contractAbi,
    address: counterAddress,
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
              )
            ) : (
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
        <Text as="p" variant="bodyMd">
          {
            isConnected && isRegistered ? shortenEthereumAddress(address) : (
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
        </Text>
      </BlockStack>
    </Card>
  );
}
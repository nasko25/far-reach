import { Form, FormLayout, TextField, Text, Button, Card } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { useWriteContract } from 'wagmi';
import { contractAbi } from '../abi';

export default function RegisterProduct() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('1');
  const [comission, setComission] = useState('1');
  const { writeContract } = useWriteContract()

  const handleSubmit = useCallback(() => {
    writeContract({
      abi: contractAbi,
      functionName: 'registerProduct',
      args: [productName, BigInt(price), Number(comission)],
      address: '0x9F6EdfCEed8F168D90b3DEed6270291a4c4c2b2f',
    })
  }, [
    productName,
    price,
    comission,
  ]);

  const handleEmailChange = useCallback((value: string) => setProductName(value), []);
  const handlePriceChange = useCallback((value: string) => setPrice(value), []);
  const handleComissionChange = useCallback((value: string) => setComission(value), []);

  return (
    <Card>
      <Text variant="headingXl" as="h2">
        Register a Product
      </Text>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            value={productName}
            onChange={handleEmailChange}
            label="Product Name"
            type="text"
            autoComplete="off"
            helpText={
              <span>
                Choose the name of the product you want to register.
              </span>
            }
          />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={handlePriceChange}
            autoComplete="off"
          />
          <TextField
            label="Comission"
            type="number"
            value={comission}
            onChange={handleComissionChange}
            autoComplete="off"
          />

          <Button submit>Submit</Button>
        </FormLayout>
      </Form>
    </Card>
  );
}
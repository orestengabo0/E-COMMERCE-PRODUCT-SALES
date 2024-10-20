import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAddressStore } from "../stores/address";

interface Address {
  id: string;
  Name: string;
  Street: string;
  City: string;
  ZipCode: string;
  Country: string;
  isDefault: boolean;
}

const AddressBook = () => {
  const { addresses, fetchAddresses } = useAddressStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAddresses = async () => {
      const result = await fetchAddresses();
      if (!result.success) {
        setError(result.message);
      } else if (result.address && Array.isArray(result.address)) {
        console.log("Addresses:", result.address);
      } else {
        console.error("Unexpected address format:", result.address);
      }
      setLoading(false);
    };

    loadAddresses();
  }, [fetchAddresses]);

  return (
    <Box w={"full"} flex={1} marginLeft={{ base: 0, md: 5 }}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={4}>
            Address Book
          </Heading>

          <Button leftIcon={<AddIcon />} colorScheme="teal" mb={4}>
            Add New Address
          </Button>

          {loading ? (
            <Spinner size="xl" />
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : addresses.length === 0 ? (
            <Text>No addresses found. Please add a new address.</Text>
          ) : (
            Array.isArray(addresses) && addresses.length > 0 && (
              <Table variant={"simple"}>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Street</Th>
                    <Th>City</Th>
                    <Th>Zip Code</Th>
                    <Th>Country</Th>
                    <Th>Default</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {addresses.map((address) => (
                    <Tr key={address.id}>
                      <Td>{address.Name}</Td>
                      <Td>{address.Street}</Td>
                      <Td>{address.City}</Td>
                      <Td>{address.ZipCode}</Td>
                      <Td>{address.Country}</Td>
                      <Td>
                        <Checkbox isChecked={address.isDefault}></Checkbox>
                      </Td>
                      <Td>
                        <IconButton aria-label={"Edit address"} icon={<EditIcon />} mr={2} />
                        <IconButton aria-label="Delete address" icon={<DeleteIcon />} colorScheme="red" />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default AddressBook;

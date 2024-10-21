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
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAddressStore } from "../stores/address";

interface Address {
  id: string;
  Street: string;
  City: string;
  ZipCode: string;
  Country: string;
  isDefault: boolean;
}

const AddressBook = () => {
  const [newAddress, setNewAddress] = useState({
    Street: "",
    City: "",
    ZipCode: "",
    Country: "",
    isDefault: false,
  });
  const { addresses, fetchAddresses, createAddress, deleteAddress } =
    useAddressStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    isOpen: isAddressOpen,
    onOpen: onAddressOpen,
    onClose: onAddressClose,
  } = useDisclosure();

  const openAddressModal = (address: Address | null) => {
    onAddressOpen();
  };

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

  const toast = useToast();
  const handleCreateAddress = async () => {
    const { success, message } = await createAddress(newAddress);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    // setNewAddress({
    //   Street: "",
    //   City: "",
    //   Country: "",
    //   ZipCode: "",
    //   isDefault: false,
    // });
  };

  const handleDeleteAddress = async (addressId: string) => {
    const { success, message } = await deleteAddress(addressId);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w={"full"} flex={1} marginLeft={{ base: 0, md: 5 }}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={4}>
            Address Book
          </Heading>

          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            mb={4}
            onClick={() => openAddressModal(null)}
          >
            Add New Address
          </Button>

          {loading ? (
            <Spinner size="xl" />
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : addresses.length === 0 ? (
            <Text>No addresses found. Please add a new address.</Text>
          ) : (
            Array.isArray(addresses) &&
            addresses.length > 0 && (
              <Table variant={"simple"}>
                <Thead>
                  <Tr>
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
                    <Tr key={address._id}>
                      <Td>{address.Street}</Td>
                      <Td>{address.City}</Td>
                      <Td>{address.ZipCode}</Td>
                      <Td>{address.Country}</Td>
                      <Td>
                        <Checkbox isChecked={address.isDefault}></Checkbox>
                      </Td>
                      <Td display={"flex"}>
                        <IconButton
                          aria-label={"Edit address"}
                          icon={<EditIcon />}
                          mr={2}
                        />
                        <IconButton
                          aria-label="Delete address"
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          onClick={() => {
                            console.log("Deleting address with ID:", address._id); 
                            handleDeleteAddress(address._id)
                          }}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )
          )}

          <Modal isOpen={isAddressOpen} onClose={onAddressClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create your address</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4}>
                  <Input
                    name="street"
                    placeholder="Street"
                    value={newAddress.Street}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, Street: e.target.value })
                    }
                  />
                  <Input
                    name="city"
                    placeholder="City"
                    value={newAddress.City}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, City: e.target.value })
                    }
                  />
                  <Input
                    name="zipCode"
                    placeholder="ZipCode"
                    value={newAddress.ZipCode}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, ZipCode: e.target.value })
                    }
                  />
                  <Input
                    name="country"
                    placeholder="Country"
                    value={newAddress.Country}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, Country: e.target.value })
                    }
                  />
                  <FormControl>
                    <Checkbox
                      name="isDefault"
                      isChecked={newAddress.isDefault}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          isDefault: e.target.checked,
                        })
                      }
                    >
                      Set as default address
                    </Checkbox>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleCreateAddress}>
                  Create
                </Button>
                <Button variant="ghost" onClick={onAddressClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </VStack>
    </Box>
  );
};

export default AddressBook;

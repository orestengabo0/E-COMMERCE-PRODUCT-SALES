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
import { create } from "domain";

interface Address {
  _id: string;
  Street: string;
  City: string;
  ZipCode: string;
  Country: string;
  isDefault: boolean;
}

const AddressBook = () => {
  const [newAddress, setNewAddress] = useState({
    _id: "",
    Street: "",
    City: "",
    ZipCode: "",
    Country: "",
    isDefault: false,
  });
  const { addresses, fetchAddresses, createAddress, deleteAddress, updateAddress } =
    useAddressStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    isOpen: isAddressOpen,
    onOpen: onAddressOpen,
    onClose: onAddressClose,
  } = useDisclosure();

  const openAddressModal = (address: Address | null) => {
    if (address) {
      setIsEditMode(true);
      setNewAddress(address);
    } else {
      setIsEditMode(false);
      setNewAddress({
        _id: "",
        Street: "",
        City: "",
        ZipCode: "",
        Country: "",
        isDefault: false,
      });
    }
    onAddressOpen();
  };

  useEffect(() => {
  const loadAddresses = async () => {
    const result = await fetchAddresses();
    if (!result.success) {
      setError(result.message);
    }
    setLoading(false);
  };

  loadAddresses();
}, [addresses]);


  const toast = useToast();
  const handleCreateAddress = async () => {
    const {_id, ...addressData} = newAddress
    const { success, message } = await createAddress(addressData);
    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onAddressClose();
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    fetchAddresses();
  };
  
  const handleUpdateAddress = async () => {
    const { success, message } = await updateAddress(newAddress._id, newAddress);
    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onAddressClose();
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    fetchAddresses();
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
                          onClick={() => openAddressModal(address)}
                        />
                        <IconButton
                          aria-label="Delete address"
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          onClick={() => {
                            handleDeleteAddress(address._id);
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
              <ModalHeader>{isEditMode ? "Edit Address" : "Create Address"}</ModalHeader>
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
                <Button colorScheme="blue" mr={3} onClick={isEditMode ? handleUpdateAddress : handleCreateAddress}>
                {isEditMode ? "Update" : "Create"}
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

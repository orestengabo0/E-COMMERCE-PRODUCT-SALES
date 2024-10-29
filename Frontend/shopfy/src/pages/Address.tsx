import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  VStack,
  HStack,
  useDisclosure,
  useToast,
  useBreakpointValue,
  Show,
  Hide,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAddressStore } from "../stores/address";
import { SearchBar } from "../components/SearchBar";
import AddressCards from "../components/AddressCards";
import { AddressModal } from "../components/AddressModal";
import { Address } from "../types/address";
import AddressTable from "../components/AddressBookTable";

const Addresses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newAddress, setNewAddress] = useState<Address>({
    _id: "",
    Street: "",
    City: "",
    ZipCode: "",
    Country: "",
    isDefault: false,
  });
  
  const { addresses, fetchAddresses, createAddress, deleteAddress, updateAddress, setDefaultAddress } = useAddressStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const stackSpacing = useBreakpointValue({ base: 4, md: 6 });
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  
  const toast = useToast();

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
    onOpen();
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
  }, []);

  const handleCreateAddress = async () => {
    const { _id, ...addressData } = newAddress;
    const { success, message } = await createAddress(addressData);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    if (success) onClose();
    fetchAddresses();
  };

  const handleUpdateAddress = async () => {
    const { success, message } = await updateAddress(newAddress._id, newAddress);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    if (success) onClose();
    fetchAddresses();
  };

  const handleDeleteAddress = async (addressId: string) => {
    const { success, message } = await deleteAddress(addressId);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    if (success) fetchAddresses();
  };

  const handleSetAsDefault = async (addressId: string) => {
    const { success, message } = await setDefaultAddress(addressId);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    if (success) fetchAddresses();
  };

  const filteredAddresses = addresses.filter(address =>
    [address.Street, address.City, address.ZipCode, address.Country]
      .some(field => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Box maxWidth="1200px" margin="auto" py={8}>
      <VStack spacing={stackSpacing} align="stretch">
        <Heading size="lg">Address Book</Heading>
        <Flex justifyContent={"space-between"} wrap="wrap">
          <Button 
            leftIcon={<AddIcon />} 
            colorScheme="green" 
            onClick={() => openAddressModal(null)}
            size={buttonSize}
          >
            Add New Address
          </Button>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </Flex>
        <Hide below="md">
          <Box overflowX="auto">
            <AddressTable
              addresses={filteredAddresses}
              onEdit={openAddressModal}
              onDelete={handleDeleteAddress}
              onDefaultChange={handleSetAsDefault}
            />
          </Box>
        </Hide>
        <Show below="md">
          <AddressCards
            addresses={filteredAddresses}
            onEdit={openAddressModal}
            onDelete={handleDeleteAddress}
            onDefaultChange={handleSetAsDefault}
          />
        </Show>
      </VStack>
      <AddressModal
        isOpen={isOpen}
        onClose={onClose}
        editAddress={newAddress}
        // isEditMode={isEditMode}
        //onChange={setNewAddress}
        onAddressSubmit={isEditMode ? handleUpdateAddress : handleCreateAddress}
      />
    </Box>
  );
};

export default Addresses;

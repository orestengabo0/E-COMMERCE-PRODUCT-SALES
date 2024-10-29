import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Address } from "../types/address";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  editAddress: Address | null;
  onAddressSubmit: (address: Address) => void;
}

export function AddressModal({
  isOpen,
  onClose,
  editAddress,
  onAddressSubmit,
}: AddressModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [addressData, setAddressData] = useState<Address>({
    _id: "",
    Street: "",
    City: "",
    ZipCode: "",
    Country: "",
    isDefault: false,
  });

  useEffect(() => {
    if (editAddress) {
      setAddressData(editAddress);
      setIsEditMode(true);
    } else {
      setAddressData({
        _id: "",
        Street: "",
        City: "",
        ZipCode: "",
        Country: "",
        isDefault: false,
      });
      setIsEditMode(false);
    }
  }, [editAddress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onAddressSubmit(addressData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader>
          {isEditMode ? "Edit Address" : "Add New Address"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align={"stretch"}>
            <Input
              placeholder="Street"
              name="Street"
              value={addressData.Street}
              onChange={handleChange}
            />
            <Input
              placeholder="City"
              name="City"
              value={addressData.City}
              onChange={handleChange}
            />
            <Input
              placeholder="Zip Code"
              name="ZipCode"
              value={addressData.ZipCode}
              onChange={handleChange}
            />
            <Input
              placeholder="Country"
              name="Country"
              value={addressData.Country}
              onChange={handleChange}
            />
            <Checkbox
              name="isDefault"
              isChecked={addressData.isDefault}
              onChange={handleChange}
              size={"md"}
            >
              Set as default address
            </Checkbox>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {isEditMode ? "Save Changes" : "Add Address"}
          </Button>
          <Button variant="ghost" colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

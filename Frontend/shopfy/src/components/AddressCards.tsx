// AddressCards.tsx
import React from "react";
import { VStack } from "@chakra-ui/react";
import { Address } from "../types/address";
import AddressCard from "./AddressCard";

interface AddressCardsProps {
  addresses: Address[]; // This should be an array
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onDefaultChange: (id: string) => void;
}

const AddressCards = ({
  addresses,
  onEdit,
  onDelete,
  onDefaultChange,
}: AddressCardsProps) => {
  return (
    <VStack spacing={4} align="stretch">
      {addresses.map((address) => (
        <AddressCard
          key={address._id}
          address={address}
          onEdit={onEdit}
          onDelete={onDelete}
          onDefaultChange={onDefaultChange}
        />
      ))}
    </VStack>
  );
};

export default AddressCards;

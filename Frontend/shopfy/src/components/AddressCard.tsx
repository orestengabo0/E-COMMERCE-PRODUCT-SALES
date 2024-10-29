// AddressCard.tsx
import { Box, HStack, VStack, Text, Badge, IconButton, Checkbox } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Address } from "../types/address";

interface AddressCardProps {
  address: Address; // Change this to singular
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onDefaultChange: (id: string) => void;
}

const AddressCard = ({
  address,
  onEdit,
  onDelete,
  onDefaultChange,
}: AddressCardProps) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      shadow="sm"
      _hover={{ shadow: "md" }}
      transition="all 0.2s"
    >
      <VStack align="stretch" spacing={2}>
        <HStack justify="space-between" align="flex-start">
          <VStack align="start" spacing={1}>
            {address.isDefault && (
              <Badge colorScheme="green" fontSize="xs">
                Default address
              </Badge>
            )}
            <Text fontSize="sm" color="gray.600">
              {address.Street}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {address.City}, {address.ZipCode}
            </Text>
            <Text fontSize="sm" color="gray.600">{address.Country}</Text>
          </VStack>
          <HStack>
            <IconButton
              aria-label="Edit address"
              icon={<EditIcon />}
              size="sm"
              onClick={() => onEdit(address)}
            />
            <IconButton
              aria-label="Delete address"
              icon={<DeleteIcon />}
              colorScheme="red"
              size="sm"
              onClick={() => onDelete(address._id)}
            />
          </HStack>
        </HStack>
        <Checkbox
          isChecked={address.isDefault}
          onChange={() => onDefaultChange(address._id)}
          size="sm"
          aria-label="Set as default address"
        >
          Set as default
        </Checkbox>
      </VStack>
    </Box>
  );
};

export default AddressCard;

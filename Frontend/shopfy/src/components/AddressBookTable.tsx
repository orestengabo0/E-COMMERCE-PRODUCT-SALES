import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Checkbox,
  HStack,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Address } from '../types/address'

interface AddressTableProps {
  addresses: Address[]
  onEdit: (address: Address) => void
  onDelete: (id: string) => void
  onDefaultChange: (id: string) => void
}

const AddressTable = ({ addresses, onEdit, onDelete, onDefaultChange }: AddressTableProps) => {
  return (
    <Table variant="simple">
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
        {addresses.map(address => (
          <Tr key={address._id}>
            <Td>{address.Street}</Td>
            <Td>{address.City}</Td>
            <Td>{address.ZipCode}</Td>
            <Td>{address.Country}</Td>
            <Td>
              <Checkbox
                isChecked={address.isDefault}
                onChange={() => onDefaultChange(address._id)}
              />
            </Td>
            <Td>
              <HStack spacing={2}>
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
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default AddressTable;
import {
    InputGroup,
    Input,
    InputRightElement,
    useBreakpointValue,
  } from '@chakra-ui/react'
  import { SearchIcon } from '@chakra-ui/icons'
  
  interface SearchBarProps {
    value: string
    onChange: (value: string) => void
  }
  
  export function SearchBar({ value, onChange }: SearchBarProps) {
    const width = useBreakpointValue({ base: "100%", md: "300px" })
  
    return (
      <InputGroup maxW={width} marginTop={{base: 3, md: 0, lg: 0}}>
        <Input
          placeholder="Search addresses..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <InputRightElement>
          <SearchIcon color="gray.500" />
        </InputRightElement>
      </InputGroup>
    )
  }
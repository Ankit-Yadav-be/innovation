import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  //  Debounce Logic
  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(value);
    }, 400);

    return () => clearTimeout(delay);
  }, [value]);

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <Box maxW="500px" mx="auto">
      <InputGroup>
        
        {/*  Search Icon */}
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>

        {/*  Input */}
        <Input
          placeholder="Search posts..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          borderRadius="full"
          bg="white"
          shadow="md"
          _focus={{
            borderColor: 'teal.400',
            boxShadow: '0 0 0 1px teal',
          }}
          _hover={{
            shadow: 'lg',
          }}
          pr="3rem"
        />

        {/*  Clear Button */}
        {value && (
          <InputRightElement>
            <IconButton
              size="sm"
              icon={<CloseIcon />}
              onClick={handleClear}
              variant="ghost"
            />
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
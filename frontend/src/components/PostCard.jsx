import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Image,
  Avatar,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Box
      borderRadius="2xl"
      overflow="hidden"
      bg="white"
      cursor="pointer"
      transition="all 0.4s ease"
      position="relative"
      _hover={{
        transform: 'translateY(-8px)',
        shadow: '2xl',
      }}
      onClick={() => navigate(`/post/${post._id}`)}
    >
      {/* IMAGE SECTION */}
      <Box overflow="hidden" position="relative">
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            height="200px"
            width="100%"
            objectFit="cover"
            transition="all 0.5s ease"
            _groupHover={{ transform: 'scale(1.1)' }}
          />
        )}

        {/*  Gradient Overlay */}
        <Box
          position="absolute"
          bottom="0"
          left="0"
          w="100%"
          h="60%"
          bgGradient="linear(to-t, blackAlpha.700, transparent)"
        />
      </Box>

      {/*  CONTENT */}
      <VStack align="start" spacing={4} p={5}>
        
        {/* 👤 Author */}
        <HStack spacing={3}>
          <Avatar size="sm" src={post.authorImage} name={post.authorName} />
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            {post.authorName}
          </Text>
        </HStack>

        {/*  Title */}
        <Text
          fontSize="xl"
          fontWeight="bold"
          noOfLines={2}
          lineHeight="short"
        >
          {post.title}
        </Text>

        {/*  Description */}
        <Text fontSize="sm" color="gray.600" noOfLines={3}>
          {post.description}
        </Text>

        {/*  Tags */}
        <HStack spacing={2} flexWrap="wrap">
          {post.tags?.slice(0, 3).map((tag, index) => (
            <Badge
              key={index}
              px={2}
              py={1}
              borderRadius="full"
              bg="gray.100"
              color="gray.700"
              fontSize="xs"
            >
              #{tag}
            </Badge>
          ))}
        </HStack>

        {/*  CTA BUTTON */}
        <Button
          size="sm"
          colorScheme="teal"
          variant="ghost"
          _hover={{ bg: 'teal.50' }}
          alignSelf="flex-start"
        >
          Read Article →
        </Button>
      </VStack>
    </Box>
  );
};

export default PostCard;
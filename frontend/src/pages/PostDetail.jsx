import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Text,
  Box,
  Button,
  Skeleton,
  SkeletonText,
  Flex,
  Avatar,
  HStack,
  Image,
  Badge,
  VStack,
} from '@chakra-ui/react';
import * as postApi from '../api/postApi';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPost = async () => {
    setLoading(true);
    try {
      const { data } = await postApi.fetchSinglePost(id);
      setPost(data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPost();
  }, [id]);

  return (
    <Box bg="gray.50" minH="100vh">

      {/* 🔙 Back Button */}
      <Container maxW="container.lg" py={6}>
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          _hover={{ bg: 'gray.200' }}
        >
          ← Back
        </Button>
      </Container>

      {/*  HERO (Bigger + Cinematic) */}
      <Box position="relative" height="380px" overflow="hidden">
        
        {/*  Image */}
        {post?.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            objectFit="cover"
            width="100%"
            height="100%"
            filter="brightness(0.8)"
          />
        )}
        {/*  Gradient Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bgGradient="linear(to-t, blackAlpha.800, transparent)"
        />

        {/*  Title + Author */}
        <Container
          maxW="container.lg"
          position="absolute"
          bottom="12"
          left="0"
          right="0"
          color="white"
        >
          {loading ? (
            <Skeleton height="30px" />
          ) : (
            <>
              <Text fontSize="4xl" fontWeight="extrabold" maxW="700px">
                {post?.title}
              </Text>

              <HStack mt={4} spacing={4}>
                <Avatar
                  size="md"
                  src={post?.authorImage}
                  name={post?.authorName}
                />
                <Box>
                  <Text fontSize="sm" fontWeight="medium">
                    {post?.authorName}
                  </Text>
                  <Text fontSize="xs" color="gray.300">
                    Published just now
                  </Text>
                </Box>
              </HStack>
            </>
          )}
        </Container>
      </Box>

      {/*  CONTENT */}
      <Container maxW="container.sm" mt={-20}>
        <Box
          bg="whiteAlpha.900"
          backdropFilter="blur(10px)"
          p={10}
          borderRadius="2xl"
          shadow="2xl"
        >
          {loading ? (
            <SkeletonText noOfLines={10} spacing="4" />
          ) : !post ? (
            <Flex justify="center" py={10}>
              <Text color="gray.500">Post not found 😕</Text>
            </Flex>
          ) : (
            <VStack align="start" spacing={8}>
              
              {/*  Tags */}
              <HStack flexWrap="wrap" spacing={3}>
                {post.tags?.map((tag, i) => (
                  <Badge
                    key={i}
                    px={3}
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

              {/*  Content */}
              <Text
                fontSize="lg"
                color="gray.700"
                lineHeight="tall"
                letterSpacing="0.2px"
              >
                {post.description}
              </Text>

              {/*  CTA */}
              <Button
                as="a"
                href={post.url}
                target="_blank"
                size="md"
                colorScheme="teal"
                borderRadius="full"
                px={6}
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'lg',
                }}
              >
                Read Full Article →
              </Button>

            </VStack>
          )}
        </Box>
      </Container>

    </Box>
  );
};

export default PostDetail;
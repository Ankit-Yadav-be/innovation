import {
  Container,
  SimpleGrid,
  Text,
  Box,
  Flex,
  Skeleton,
  SkeletonText,
  VStack,
  Button,
} from '@chakra-ui/react';
import { usePosts } from '../hooks/usePosts';
import SearchBar from '../components/SearchBar';
import PostCard from '../components/PostCard';

const Home = () => {
  const {
    posts,
    loading,
    search,
    page,
    totalPages,
    nextPage,
    prevPage,
  } = usePosts();

  return (
    <Box bg="gray.50" minH="100vh">

      {/*  HERO SECTION */}
      <Box
        bgGradient="linear(to-r, teal.500, blue.500)"
        color="white"
        py={16}
        textAlign="center"
      >
        <VStack spacing={4}>
          <Text fontSize="5xl" fontWeight="extrabold">
            Discover Amazing Stories
          </Text>
          <Text fontSize="lg" opacity={0.9}>
            Explore content, learn new things, and stay inspired every day
          </Text>
        </VStack>
      </Box>

      {/* 🔍 FLOATING SEARCH */}
      <Container maxW="container.md" mt={-10} mb={10}>
        <Box
          bg="whiteAlpha.900"
          backdropFilter="blur(10px)"
          p={4}
          borderRadius="2xl"
          shadow="xl"
        >
          <SearchBar onSearch={(val) => search(val, 1)} />
        </Box>
      </Container>

      {/*  CONTENT SECTION */}
      <Container maxW="container.xl" pb={10}>
        
        {/*  HEADER */}
        <Flex justify="space-between" align="center" mb={6}>
          <Text fontSize="2xl" fontWeight="bold">
            Latest Posts
          </Text>
          <Text fontSize="sm" color="gray.500">
            Page {page} of {totalPages}
          </Text>
        </Flex>

        {/*  LOADING */}
        {loading ? (
          <SimpleGrid columns={[1, 2, 3]} spacing={8}>
            {[...Array(6)].map((_, i) => (
              <Box
                key={i}
                borderRadius="2xl"
                overflow="hidden"
                bg="white"
                shadow="md"
              >
                <Skeleton height="180px" />
                <Box p={4}>
                  <Skeleton height="20px" mb={3} />
                  <SkeletonText noOfLines={3} spacing="3" />
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        ) : posts.length === 0 ? (

          /*  EMPTY STATE */
          <Flex
            direction="column"
            justify="center"
            align="center"
            mt={20}
            gap={3}
          >
            <Text fontSize="4xl">😕</Text>
            <Text fontSize="lg" color="gray.500">
              No posts found
            </Text>
            <Text fontSize="sm" color="gray.400">
              Try searching something else
            </Text>
          </Flex>

        ) : (

          <>
            {/*  POSTS GRID */}
            <SimpleGrid columns={[1, 2, 3]} spacing={8}>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </SimpleGrid>

            {/*  PAGINATION */}
            <Flex justify="center" mt={10} gap={4} align="center">
              
              <Button
                onClick={prevPage}
                isDisabled={page === 1}
                variant="outline"
                borderRadius="lg"
              >
                ← Prev
              </Button>

              <Text fontWeight="medium">
                {page} / {totalPages}
              </Text>

              <Button
                onClick={nextPage}
                isDisabled={page === totalPages}
                colorScheme="teal"
                borderRadius="lg"
              >
                Next →
              </Button>

            </Flex>
          </>
        )}
      </Container>

    </Box>
  );
};

export default Home;
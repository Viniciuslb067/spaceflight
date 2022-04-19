import {
  Box,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  HStack,
  Select,
  Text,
  Image,
  VStack,
  Button,
  Tag,
} from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import { IoIosRocket } from 'react-icons/io';
import { useQuery } from 'react-query';
import { getAllArticles } from './api';

import dayjs from 'dayjs';
import { CreateArticleModal } from './components/CreateArticleModal';

export const Home = () => {
  const { data } = useQuery('articles', async () => await getAllArticles());

  return (
    <Stack w="100%" alignItems="flex-end" p="6">
      <HStack alignItems="center">
        <Stack flex="1">
          <InputGroup size="sm">
            <Input placeholder="Search" />
            <InputRightElement>
              <Box>
                <BiSearch />
              </Box>
            </InputRightElement>
          </InputGroup>
        </Stack>
        <Stack flex="0.70">
          <Select size="sm">
            <option>Mais antigas</option>
            <option>Mais novas</option>
          </Select>
        </Stack>
        <CreateArticleModal />
      </HStack>
      <Stack
        alignItems="center"
        justifyContent="center"
        w="100%"
        spacing="6"
        py="6"
        borderBottom="2px solid gray"
      >
        <Box borderRadius="50%" border="1px solid gray" p="6">
          <IoIosRocket size="70" />
        </Box>
        <Text fontSize="2xl">Space Flight News</Text>
      </Stack>
      <Stack px="72" pt="12" w="100%" alignItems="center" justifyContent="center" spacing="16">
        {data?.map((article, index) => {
          return (
            <Stack
              w="100%"
              key={article.id}
              direction={index % 2 === 0 ? 'row-reverse' : 'row'}
              alignItems="flex-start"
              spacing="10"
            >
              <Box w="100%" maxH="180px" boxSize="lg" h="min-content">
                <Image
                  objectFit="cover"
                  minH="180px"
                  maxH="180px"
                  src={article.imageUrl}
                  fallbackSrc="https://149361159.v2.pressablecdn.com/wp-content/uploads/2021/01/placeholder.png"
                />
              </Box>
              <VStack w="100%" alignItems="flex-start">
                <Text fontSize="2xl" fontWeight="bold">
                  {article.title}
                </Text>
                <HStack w="100%" justifyContent="space-between">
                  <Text>{dayjs(article.publishedAt).format('DD/MM/YYYY')}</Text>
                  <Tag>{article.newsSite}</Tag>
                </HStack>
                <Text align="justify">{article.summary}</Text>
                <Button>Ver Mais</Button>
              </VStack>
            </Stack>
          );
        })}
      </Stack>
      <Stack w="100%" alignItems="center" justifyContent="center">
        <Button>Carregar mais</Button>
      </Stack>
    </Stack>
  );
};

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
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { IoIosRocket } from "react-icons/io";
import { useMutation, useQuery } from "react-query";
import { getAllArticles, getAllArticlesFiltered } from "./api";

import dayjs from "dayjs";
import { CreateArticleModal } from "./components/CreateArticleModal";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { queryClient } from "../../lib/react-query";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const debouncedFilter: string = useDebounce(searchTerm, 500);
  const [takeQuantity, setTakeQuantity] = useState<number | undefined>(10);

  const {
    mutateAsync,
    data: searchData,
    isLoading,
  } = useMutation(
    "articles-filtered",
    () =>
      getAllArticlesFiltered({
        searchTerms: {
          title: debouncedFilter,
          order_by: selectValue || "desc",
          take: takeQuantity,
        },
      }),
    {
      onSuccess: async () =>
        await queryClient.invalidateQueries("articles-filtered"),
    }
  );

  const { data: allData, isLoading: allDataIsLoading } = useQuery(
    "articles",
    () => getAllArticles(),
    {
      enabled: Boolean(searchData),
    }
  );

  useEffect(() => {
    if (debouncedFilter || selectValue || takeQuantity) {
      console.log(selectValue, takeQuantity);
      mutateAsync();
    }
  }, [debouncedFilter, mutateAsync, selectValue, takeQuantity]);

  return (
    <Stack w="100%" alignItems="flex-end" p="6">
      <HStack alignItems="center">
        <Stack flex="1">
          <InputGroup size="sm">
            <Input
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputRightElement>
              <Box>
                <BiSearch />
              </Box>
            </InputRightElement>
          </InputGroup>
        </Stack>
        <Stack flex="0.70">
          <Select size="sm" onChange={(e) => setSelectValue(e.target.value)}>
            <option value="asc">Mais antigas</option>
            <option value="desc">Mais novas</option>
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
      <Stack
        px="72"
        pt="12"
        w="100%"
        alignItems="center"
        justifyContent="center"
        spacing="16"
      >
        {debouncedFilter || selectValue || takeQuantity ? (
          isLoading ? (
            <Spinner />
          ) : searchData?.length ? (
            searchData?.map((article, index) => (
              <Stack
                w="100%"
                key={article.id}
                direction={index % 2 === 0 ? "row-reverse" : "row"}
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
                    <Text>
                      {dayjs(article.publishedAt).format("DD/MM/YYYY")}
                    </Text>
                    <Tag>{article.newsSite}</Tag>
                  </HStack>
                  <Text align="justify">{article.summary}</Text>
                  <Button>Ver Mais</Button>
                </VStack>
              </Stack>
            ))
          ) : (
            <Heading fontWeight="thin" fontSize="xl">
              Nenhum artigo foi encontrado
            </Heading>
          )
        ) : allDataIsLoading ? (
          <Spinner />
        ) : (
          allData?.map((article, index) => (
            <Stack
              w="100%"
              key={article.id}
              direction={index % 2 === 0 ? "row-reverse" : "row"}
              alignItems="flex-start"
              spacing="10"
            >
              <Box w="500px" h="250px">
                <Image
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  src={article.imageUrl}
                  fallbackSrc="https://149361159.v2.pressablecdn.com/wp-content/uploads/2021/01/placeholder.png"
                />
              </Box>
              <VStack w="100%" alignItems="flex-start">
                <Text fontSize="2xl" fontWeight="bold">
                  {article.title}
                </Text>
                <HStack w="100%" justifyContent="space-between">
                  <Text>{dayjs(article.publishedAt).format("DD/MM/YYYY")}</Text>
                  <Tag>{article.newsSite}</Tag>
                </HStack>
                <Text align="justify">{article.summary}</Text>
                <Button>Ver Mais</Button>
              </VStack>
            </Stack>
          ))
        )}
      </Stack>
      <Stack pt="6" w="100%" alignItems="center" justifyContent="center">
        <Button onClick={() => setTakeQuantity((count) => (count as any) + 1)}>
          Carregar mais
        </Button>
      </Stack>
    </Stack>
  );
};

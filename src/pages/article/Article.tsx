import {
  Box,
  Heading,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getArticleById } from "./api";

export const Article = () => {
  const { id } = useParams();
  const idNumber = Number(id);

  const { data, isLoading } = useQuery(
    ["article", id],
    async () => await getArticleById({ id: idNumber })
  );

  console.log(data);

  return (
    <Stack w="100%" px="16" py="10" alignItems="center" justifyContent="center">
      <HStack alignItems="flex-start">
        <VStack px="12">
          <Stack w="100%" px="12">
            <Heading w="100%">{data?.title}</Heading>

            <VStack alignItems="flex-start">
              <HStack w="100%" justifyContent="space-between">
                <Text>{dayjs(data?.publishedAt).format("DD/MM/YYYY")}</Text>
                <Tag>{data?.newsSite}</Tag>
              </HStack>
              <Box>
                <Text>{data?.summary}</Text>
              </Box>
            </VStack>
          </Stack>
        </VStack>

        <Box py={2}>
          <Image w="100%" objectFit="cover" src={data?.imageUrl} />
        </Box>
      </HStack>
    </Stack>
  );
};

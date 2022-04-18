import {
  ChakraProvider,
  Box,
  theme,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  HStack,
  Select,
  useColorMode,
  Divider,
  Text,
  Image,
  VStack,
  Button,
} from "@chakra-ui/react"
import { BiSearch } from "react-icons/bi"
import { IoIosRocket } from "react-icons/io"
import { ColorModeSwitcher } from "./ColorModeSwitcher"

export const App = () => {

  const { colorMode } = useColorMode();

  console.log(colorMode)

  return (
    <ChakraProvider theme={theme}>
    <Stack w="100%" alignItems="flex-end" p="6">
        <HStack alignItems="flex-end">
          <Stack flex="1">
          <InputGroup size='sm'>
              <Input placeholder='Search' />
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
        </HStack>
        <Stack alignItems="center" justifyContent="center" w="100%" spacing="6" py="6" borderBottom="2px solid gray">
          <Box borderRadius="50%" border="1px solid gray" p="6">
          <IoIosRocket size="70" />
          </Box>
          <Text fontSize="2xl">
            Space Flight News
          </Text>
        </Stack>
        <Stack px="60" pt="12" w="100%" alignItems="center" justifyContent="center" spacing="16">
        <HStack  alignItems="flex-start" spacing="10">
          <Box boxSize="lg" h="min-content">
            <Image  fallbackSrc="https://149361159.v2.pressablecdn.com/wp-content/uploads/2021/01/placeholder.png" />
          </Box>
          <VStack w="100%" alignItems="flex-start">
            <Text fontSize="2xl" fontWeight="bold">Bla bla</Text>
            <HStack w="100%" justifyContent="space-between">
            <Text>dd/mmm/yyyy</Text>
              <Button>
                newSite
              </Button>
            </HStack>
            <Text align="justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sint harum quod, obcaecati eaque similique. Molestias incidunt sit quo fuga nostrum corporis. Aliquam necessitatibus explicabo laborum recusandae voluptatibus deleniti quo.
              Alias earum totam ipsum eveniet repellat illo tempora minus culpa sunt temporibus voluptatibus perspiciatis consequuntur officiis dicta, vitae maiores! Consectetur facilis animi quos nam maxime porro magni, exercitationem nulla voluptas.
            </Text>
            <Button>
              Ver Mais
            </Button>
          </VStack>
          </HStack>
          <HStack alignItems="flex-start" spacing="10">
          <Box boxSize="lg">
            <Image  fallbackSrc="https://149361159.v2.pressablecdn.com/wp-content/uploads/2021/01/placeholder.png" />
          </Box>
          <VStack w="100%" alignItems="flex-start">
            <Text fontSize="2xl" fontWeight="bold">Bla bla</Text>
            <HStack w="100%" justifyContent="space-between">
            <Text>dd/mmm/yyyy</Text>
              <Button>
                newSite
              </Button>
            </HStack>
            <Text align="justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sint harum quod, obcaecati eaque similique. Molestias incidunt sit quo fuga nostrum corporis. Aliquam necessitatibus explicabo laborum recusandae voluptatibus deleniti quo.
              Alias earum totam ipsum eveniet repellat illo tempora minus culpa sunt temporibus voluptatibus perspiciatis consequuntur officiis dicta, vitae maiores! Consectetur facilis animi quos nam maxime porro magni, exercitationem nulla voluptas.
            </Text>
            <Button>
              Ver Mais
            </Button>
          </VStack>
          </HStack>
        </Stack>
        <Stack w="100%" alignItems="center" justifyContent="center">
        <Button>
          Carregar mais
        </Button>
        </Stack>
    </Stack>
  </ChakraProvider>
  )
}
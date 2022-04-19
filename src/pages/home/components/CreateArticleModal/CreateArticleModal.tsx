import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { QueryClient, useMutation } from "react-query";
import { createArticles } from "../../api";

type CreateArticleForm = {
  title: string;
  newsSite: string;
  summary: string;
  url: string;
  imageUrl: string;
};

export const CreateArticleModal = () => {
  const toast = useToast();
  const queryClient = new QueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutateAsync, isSuccess, isLoading } = useMutation("create-article", createArticles, {
    onError: (err: any) => {
      toast({
        title: err || "Ocorreu um erro",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries('articles');
      toast({
        title: "Artigo criado com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      reset();
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (values: CreateArticleForm) => {
    mutateAsync({ data: values });
    if (isSuccess) reset();
  };

  return (
    <>
      <Button onClick={onOpen} fontWeight="light" size="sm">
        Criar novo artigo
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar artigo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit as any)}>
              <FormControl isInvalid={errors.title}>
                <FormLabel htmlFor="title">Título</FormLabel>
                <Input
                  id="title"
                  {...register("title", {
                    required: "Campo obrigatório",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.newsSite} mt="2">
                <FormLabel htmlFor="newsSite">Site de notícias</FormLabel>
                <Input
                  id="newsSite"
                  {...register("newsSite", {
                    required: "Campo obrigatório",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.newsSite && errors.newsSite.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.summary} mt="2">
                <FormLabel htmlFor="summary">Sumário</FormLabel>
                <Textarea
                  id="summary"
                  {...register("summary", {
                    required: "Campo obrigatório",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.summary && errors.summary.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.url} mt="2">
                <FormLabel htmlFor="url">Url</FormLabel>
                <Input
                  id="url"
                  {...register("url", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.url && errors.url.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.imageUrl} mt="2">
                <FormLabel htmlFor="imageUrl">Url da imagem</FormLabel>
                <Input
                  id="imageUrl"
                  {...register("imageUrl", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.imageUrl && errors.imageUrl.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                bg="#302E53"
                color="white"
                isLoading={isLoading}
                type="submit"
              >
                Enviar
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

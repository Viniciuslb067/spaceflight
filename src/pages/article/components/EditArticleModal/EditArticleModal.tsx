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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { queryClient } from "../../../../lib/react-query";
import { updateArticle } from "../../api";

type EditArticleModalProps = {
  id?: number;
  data?: Articles;
};

type CreateArticleForm = {
  id: number;
  title: string;
  newsSite: string;
  summary: string;
  url: string;
  imageUrl: string;
};

export const EditArticleModal = ({ id, data }: EditArticleModalProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutateAsync, isSuccess, isLoading } = useMutation(
    ["article", id],
    updateArticle,
    {
      onMutate: async (newArticle) => {
        await queryClient.cancelQueries(["article", newArticle.id]);
        const previosArticle = queryClient.getQueryData([
          "article",
          newArticle.id,
        ]);

        queryClient.setQueryData(["article", id], (oldArticle: any) => {
          return {
            ...oldArticle,
            newArticle,
          };
        });
        return { previosArticle, newArticle };
      },
      onError: (err: any) => {
        toast({
          title: err || "Ocorreu um erro",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(["article", id]);
        toast({
          title: "Informações editadas com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        window.location.reload();
        onClose();
        reset();
      },
    }
  );

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (values: CreateArticleForm) => {
    mutateAsync({ id: data?.id, data: values });
    if (isSuccess) reset();
  };

  useEffect(() => {
    reset({
      title: data?.title,
      newsSite: data?.newsSite,
      summary: data?.summary,
      url: data?.url,
      imageUrl: data?.imageUrl,
    });
  }, [
    data?.imageUrl,
    data?.newsSite,
    data?.summary,
    data?.title,
    data?.url,
    reset,
  ]);

  return (
    <>
      <Button onClick={onOpen}>Editar artigo</Button>

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
                Editar
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

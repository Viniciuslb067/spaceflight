import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  useDisclosure,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../../../lib/react-query";
import { removeArticle } from "../../api";

type RemoveArticleDialogProps = {
  id?: number;
};

export const RemoveArticleDialog = ({ id }: RemoveArticleDialogProps) => {
  const toast = useToast();
  const navigate = useNavigate();
  const cancelRef = useRef<HTMLElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutateAsync } = useMutation("remove-article", removeArticle, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("articles");
      onClose();
      navigate(-1);
      toast({
        title: "Artigo excluido com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Excluir
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir Artigo
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza? Você não pode desfazer esta ação depois.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef as any} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  mutateAsync({ id });
                }}
                ml={3}
              >
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

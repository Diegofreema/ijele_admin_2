'use client';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { CustomButton } from 'components/ui/CustomButton';
import { Title } from 'components/ui/Title';
import { ProductType } from '../../../../../types';
import { Link } from 'next-view-transitions';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductModal } from 'components/modals/ProductModal';
import { useCallback, useState } from 'react';
import { createClient } from '../../../../../util/supabase/client';
import { FileRejection } from 'react-dropzone';
import {
  createProduct,
  deleteProduct,
} from '../../../../../actions/data.actions';

interface Props {
  products: ProductType[];
  count: number;
}

export const Goods = ({ count, products }: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [image, setImage] = useState('');
  const supabase = createClient();
  const searchParams = useSearchParams();
  const toast = useToast();
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [values, setValues] = useState({
    productName: '',
    price: '0',
    inStock: '0',
    description: '',
    category: '',
  });
  const currentPage = Number(searchParams.get('page')) || 1;
  const productsHasNextPage = count > 10 * currentPage;
  const onDropAccepted = useCallback(
    async (acceptedFiles: File[]) => {
      console.log(acceptedFiles[0].name);
      setUploading(true);
      try {
        const file = acceptedFiles[0];
        const filePath = `/products/${file?.name}`;
        const { data, error } = await supabase.storage
          .from('files')
          .upload(filePath, file);
        if (error) {
          console.log(error);
          setUploading(false);
          toast({
            title: 'Error',
            description: error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          return;
        }

        console.log(data);

        setImage(
          `https://eqywbgkagvejgblbjpwm.supabase.co/storage/v1/object/public/files/${data?.path}`,
        );
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Something went wrong, please try again',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setUploading(false);
      }
    },
    [supabase.storage, toast],
  );
  const onDropRejected = useCallback(
    (rejectedFiles: FileRejection[]) => {
      toast({
        title: 'Error',
        description: `${rejectedFiles[0]?.file?.type} is not a valid file`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
    [toast],
  );
  const onSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const { message, error } = await createProduct({
        image_url: image,
        description: values.description,
        number_in_stock: +values.inStock,
        price: +values.price,
        product_name: values?.productName,
        category: values?.category,
      });

      if (error) {
        setIsSubmitting(false);
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          isClosable: true,
        });
      }

      if (!error) {
        onClose();
        toast({
          title: 'Success',
          description: 'Product created successfully',
          status: 'success',
          isClosable: true,
        });
        setImage('');
        setValues({
          productName: '',
          price: '',
          inStock: '',
          description: '',
          category: '',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again',
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [image, toast, onClose, values]);
  return (
    <>
      <ProductModal
        isOpen={isOpen}
        onClose={onClose}
        onDropAccepted={onDropAccepted}
        accepted={{}}
        onDropRejected={onDropRejected}
        onSubmit={onSubmit}
        setImage={setImage}
        setValues={setValues}
        values={values}
        submitting={isSubmitting}
        uploading={uploading}
        imgUrl={image}
      />
      <Box>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Title title="Shop" />
          <CustomButton title="Add Product" onClick={onOpen} />
        </Flex>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={{ base: 5, md: 10 }}
          mt={{ base: 5, md: 10 }}
        >
          {products?.length > 0 &&
            products?.map((item) => <ProductCard key={item.id} {...item} />)}
        </SimpleGrid>
        <Flex
          justifyContent={'center'}
          mt={5}
          height={'100%'}
          alignItems={'center'}
        >
          {products?.length === 0 && <Title title="No products yet" />}
        </Flex>
        {productsHasNextPage && (
          <Flex justifyContent={'center'} mt={5}>
            <Link href={`/site/shop?page=${currentPage + 1}`} passHref>
              <CustomButton title="Load more" onClick={() => {}} />
            </Link>
          </Flex>
        )}
      </Box>
    </>
  );
};

const ProductCard = ({
  id,
  number_in_stock,
  image_url,
  price,
  product_name,
  description,
}: ProductType) => {
  const [deleting, setDeleting] = useState(false);
  const [toDelete, setToDelete] = useState(false);
  const toast = useToast();
  const formatText = (text: string) => {
    if (text.length > 20) {
      return text.substring(0, 20) + '...';
    }

    return text;
  };
  const deleteProductFn = async () => {
    setDeleting(true);
    try {
      const { error } = await deleteProduct(id);
      if (error) {
        setDeleting(false);
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }

      if (!error) {
        toast({
          title: 'Deleted',
          description: 'Product has been deleted',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Card minHeight={400}>
      <Link href={`/site/shop/${id}`} passHref>
        <Image
          alt="image"
          src={image_url}
          width={'100%'}
          height={250}
          objectFit={'cover'}
          fallbackSrc="https://via.placeholder.com/150"
        />
        <CardBody>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'} fontSize={'sm'}>
              {product_name}
            </Text>
            <Text fontWeight={'bold'} fontSize={'sm'}>
              Price: ₦{price}
            </Text>
          </Flex>

          <Text fontWeight={'400'} fontSize={'md'}>
            In stock: {number_in_stock}
          </Text>
          <Text fontWeight={'bold'} fontSize={'lg'}>
            {formatText(description)}
          </Text>
        </CardBody>
      </Link>
      <CardFooter>
        {!toDelete ? (
          <CustomButton
            title="Delete product"
            onClick={() => setToDelete(true)}
            flex={1}
          />
        ) : (
          <Flex gap={5} width={'100%'}>
            <CustomButton
              title="Cancel"
              onClick={() => setToDelete(false)}
              flex={1}
            />
            <CustomButton
              loading={deleting}
              title="Delete"
              onClick={deleteProductFn}
              flex={1}
            />
          </Flex>
        )}
      </CardFooter>
    </Card>
  );
};

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Input from 'components/shared/Input/Input';
import Select from 'components/shared/Select/Select';
import { useAppDispatch } from 'lib/hooks/useAppDispatch';
import { useToast } from 'lib/providers/toast-provider';
import { registerSchema } from 'lib/schema/formSchema';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { GET_PRODUCTS } from '@/lib/redux/types';
import { Product } from '@/lib/redux/types/product.type';
import { ProductServices } from '@/lib/repo/product.repo';
import { category, colors, size } from '@/utils/index';

type ModalAddProductProps = {
  product?: Product;
};

const ModalAddProduct = ({ product }: ModalAddProductProps) => {
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      title: product?.title,
      image01: product?.image01,
      image02: product?.image02,
      price: product?.price,
      slug: product?.slug,
      categorySlug: product?.categorySlug,
      size: product?.size,
      colors: product?.colors,
      description: product?.description,
      stock: product?.stock,
      discount: product?.discount,
    },
  });
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [img1, setImg1] = useState(product?.image01 || '');
  const [img2, setImg2] = useState(product?.image02 || '');
  const editorContent = watch('description');

  useEffect(() => {
    register('description');
  }, [register]);

  const onEditorStateChange = (editorState: any) => {
    setValue('description', String(editorState));
  };

  const formSubmit = (data: Product) => {
    if (product)
      return toast.promise(
        'Cập nhật sản phẩm thành công',
        ProductServices.updateProduct({
          ...data,
          _id: product._id,
        }).then(() => {
          dispatch({ type: GET_PRODUCTS });
        }),
        'Cập nhật sản phẩm thất bại',
      );
    return toast.promise(
      'Thêm sản phẩm thành công',
      ProductServices.createProduct(data).then(() => {
        dispatch({ type: GET_PRODUCTS });
      }),
      'Thêm sản phẩm thất bại',
    );
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      {product ? <h1>Cập nhật sản phẩm</h1> : <h1>Thêm sản phẩm</h1>}
      <Input
        {...register('title')}
        error={errors.title?.message}
        label='title'
        name='title'
        placeholder='Tên sản phẩm'
        type='text'
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1.5rem',
          gap: '12px',
        }}
      >
        <div style={{ width: '50%' }}>
          <Input
            {...register('image01')}
            error={errors.image01?.message}
            label='image01'
            name='image01'
            onChange={(e) => {
              setImg1(e.target.value);
            }}
            placeholder='Ảnh sản phẩm'
            type='text'
          />
          <img alt='image01' src={img1} />
        </div>
        <div style={{ width: '50%' }}>
          <Input
            {...register('image02')}
            error={errors.image02?.message}
            label='image02'
            name='image02'
            onChange={(e) => {
              setImg2(e.target.value);
            }}
            placeholder='Ảnh sản phẩm'
            type='text'
          />
          <img alt='image02' src={img2} />
        </div>
      </div>
      <Input
        {...register('stock')}
        error={errors.stock?.message}
        label='stock'
        name='stock'
        placeholder='Số lượng'
        type='number'
      />
      <Input
        {...register('price')}
        error={errors.price?.message}
        label='price'
        name='price'
        placeholder='Giá sản phẩm'
        type='number'
      />
      <Input
        {...register('discount')}
        error={errors.discount?.message}
        label='discount'
        name='discount'
        placeholder='Phần trăm giảm giá'
        type='number'
      />
      <Input
        error={errors.description?.message}
        label='editor'
        onChange={onEditorStateChange}
        placeholder='Mô tả sản phẩm'
        type='editor'
        value={editorContent}
      />
      <Select
        {...register('categorySlug')}
        defaultValue={product?.categorySlug || ''}
        error={errors.categorySlug?.message}
        label='CategorySlug'
      >
        {category.map((item) => (
          <MenuItem key={item.categorySlug} value={item.categorySlug}>
            {item.display}
          </MenuItem>
        ))}
      </Select>
      <Select
        {...register('size')}
        defaultValue={product?.size || []}
        error={errors.size?.message}
        label='Size'
        multiple
      >
        {size.map((size) => (
          <MenuItem key={size.size} value={size.size}>
            {size.display}
          </MenuItem>
        ))}
      </Select>
      <Select
        {...register('colors')}
        defaultValue={product?.size || []}
        error={errors.colors?.message}
        label='Colors'
        multiple
      >
        {colors.map((color) => (
          <MenuItem key={color.color} value={color.color}>
            {color.display}
          </MenuItem>
        ))}
      </Select>
      <Button style={{ width: '100%', marginTop: '20px' }} type='submit' variant='contained'>
        {product ? 'Cập nhật' : 'Thêm sản phẩm'}
      </Button>
    </form>
  );
};

export default ModalAddProduct;

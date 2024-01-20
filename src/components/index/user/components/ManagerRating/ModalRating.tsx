import { Rating as RatingMUI } from '@mui/material';
import { useState } from 'react';

import Input from '@/components/shared/Input/Input';
import { useToast } from '@/lib/providers/toast-provider';
import { Rating } from '@/lib/redux/types/rating.type';
import { RatingServices } from '@/lib/repo/rating.repo';

type ModalRatingProps = {
  selectedRating: Rating | null;
};

const ModalRating = ({ selectedRating }: ModalRatingProps) => {
  const toast = useToast();
  const [rating, setRating] = useState<number | null>(1);
  const [comment, setComment] = useState<string>('');
  const onEditorStateChange = (editorState: any) => {
    setComment(editorState);
  };
  const [idDisabled, setIdDisabled] = useState<boolean>(false);

  const handleRating = () => {
    if (rating === null || comment === '' || !selectedRating?._id) return;
    toast.promise(
      'Gửi đánh giá thành công',
      RatingServices.updateRatingById(selectedRating?._id, rating, comment).then(() =>
        setIdDisabled(true)
      ),
      'Gửi đánh giá thất bại'
    );
  };

  return (
    <>
      <p>{selectedRating?.idProduct.title}</p>
      <RatingMUI
        name='simple-controlled'
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
        value={rating}
      />
      <Input
        onChange={onEditorStateChange}
        placeholder='Nhập nội dụng comment'
        type='editor'
        value={comment}
      />
      <button
        className='bg-main mt-3 cursor-pointer rounded border-none px-2 py-1'
        disabled={idDisabled}
        onClick={handleRating}
        type='button'
      >
        Gửi đánh giá
      </button>
    </>
  );
};

export default ModalRating;

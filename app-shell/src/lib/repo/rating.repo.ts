import { get, put } from '../axios/requests';

export class RatingRepository {
  async getRatingByIdAuth(idAuth: string) {
    const res = await get(`/rating/getRatingByIdAuth/${idAuth}`);
    return res;
  }
  async getRatingByIdProduct(idProduct: string) {
    const res = await get(`/rating/getRatingByIdProduct/${idProduct}`);
    return res;
  }
  async updateRatingById(idRating: string, rating: number, comment: string) {
    const res = await put(`/rating/updateRatingById/${idRating}`, {
      rating,
      comment
    });
    return res;
  }
}
export const RatingServices = new RatingRepository();

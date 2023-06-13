/* selectors */
export const getAllCategories = ({ categories }) => categories;
export const getCount = ({ categories }) => categories.length;
export const getCategoryById = ({ categories }, categoryId) =>
  categories.find(category => category.id === categoryId);

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}

/* selectors */
export const getAllBlogPosts = ({ blog }) => blog.blogPosts;
export const getRecentPosts = ({ blog }) => blog.blogPosts.slice(-4);
export const getBlogPostById = ({ blog }, id) =>
  blog.blogPosts.find(blogPost => blogPost.id === id);
export const getBlogFilters = ({ blog }) => blog.blogFilter;

/* actions */
const createActionName = actionName => `app/blog/${actionName}`;
const UPDATE_BLOG_FILTER = createActionName('UPDATE_BLOG_FILTER');
const REMOVE_BLOG_FILTER = createActionName('REMOVE_BLOG_FILTER');

/* action creators */
export const updateBlogFilter = payload => ({
  type: UPDATE_BLOG_FILTER,
  payload,
});

export const removeBlogFilter = payload => ({
  type: REMOVE_BLOG_FILTER,
  payload,
});

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case UPDATE_BLOG_FILTER: {
      return {
        ...statePart,
        blogFilter: [action.payload],
      };
    }
    case REMOVE_BLOG_FILTER: {
      return {
        ...statePart,
        blogFilter: [],
      };
    }
    default:
      return statePart;
  }
}

import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { API_URL } from 'constants/index';
import useLocalStorage from 'hooks/useLocalStorage';
import { LoginType, PostType, ResPostType, UserType } from 'types';

function getOccurrence(array: PostType[], value: string) {
  let count = 0;
  array.forEach((item) => item.from_id === value && count++);
  return count;
}

const usePosts = () => {
  const navigate = useNavigate();

  const [user] = useLocalStorage<LoginType | null>('user', null);

  const {
    data: dataPosts,
    isError,
    refetch,
    isFetching,
  } = useQuery<PostType[]>(
    ['content'],
    () =>
      fetch(`${API_URL}/posts?sl_token=${user ? user?.sl_token : ''}`)
        .then((res) => {
          if (res.status !== 200) {
            navigate('/auth');
          }
          return res.json();
        })
        .then((resData: ResPostType) => resData.data.posts),
    {
      staleTime: Infinity,
      enabled: !!user,
    },
  );

  const getUsersArray = () => {
    const users: UserType[] = [];

    dataPosts?.forEach((elem, index) => {
      const findedIndex = users.findIndex(
        (item) => item?.from_id === dataPosts[index]?.from_id,
      );
      if (users.length === 0 || findedIndex === -1) {
        const count = getOccurrence(dataPosts, dataPosts[index].from_id);
        users.push({
          from_name: dataPosts[index].from_name,
          from_id: dataPosts[index].from_id,
          count: count,
        });
      }
    });

    return users.sort((itemA, itemB) => {
      if (itemA.from_name < itemB.from_name) {
        return -1;
      }
      if (itemA.from_name > itemB.from_name) {
        return 1;
      }
      return 0;
    });
  };

  const users = getUsersArray();

  return {
    dataPosts,
    refetch,
    isError,
    isFetching,
    user,
    users,
  };
};

export default usePosts;

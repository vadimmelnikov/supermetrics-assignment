import { useEffect, useMemo, useState } from 'react';

import cn from 'classnames';
import { Navigate, useSearchParams } from 'react-router-dom';

import Button from 'components/Button';
import Input from 'components/Input';
import TextCard from 'components/TextCard';
import UserCard from 'components/UserCard';
import useDebounce from 'hooks/useDebounce';
import usePosts from 'hooks/usePosts';

import s from './Home.module.scss';

const Home = () => {
  const { dataPosts, isError, isFetching, refetch, user, users } = usePosts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeUser, setActiveUser] = useState<string>(
    searchParams.get('user_id') || '',
  );
  const [sort, setSort] = useState<string>(searchParams.get('sort') || '');

  const [searchUser, setSearchUser] = useState<string>('');
  const debouncedSearchUser = useDebounce<string>(searchUser, 300);

  const [searchPost, setSearchPost] = useState<string>('');
  const debouncedSearchPost = useDebounce<string>(searchPost, 300);

  const contentPostsArray = activeUser
    ? dataPosts?.filter((item) => item.from_id === activeUser)
    : null;

  useEffect(() => {
    void refetch();
  }, []);

  useEffect(() => {
    if (activeUser) {
      setSearchParams(
        {
          user_id: activeUser,
          sort: sort ? sort : '',
        },
        { replace: true },
      );
    }
  }, [activeUser, sort]);

  const fiteredUsers = useMemo(() => {
    if (debouncedSearchUser) {
      return users.filter((item) =>
        item.from_name.toLowerCase().includes(debouncedSearchUser),
      );
    }
    return users;
  }, [users, debouncedSearchUser]);

  const fiteredPosts = useMemo(() => {
    const filteredArray = contentPostsArray?.filter((item) =>
      item.message.toLowerCase().includes(debouncedSearchPost),
    );
    if (sort === 'up') {
      return filteredArray?.sort(
        (itemA, itemB) =>
          new Date(itemA.created_time).valueOf() -
          new Date(itemB.created_time).valueOf(),
      );
    }

    if (sort === 'down') {
      return filteredArray?.sort(
        (itemA, itemB) =>
          new Date(itemB.created_time).valueOf() -
          new Date(itemA.created_time).valueOf(),
      );
    }
    return filteredArray;
  }, [contentPostsArray, debouncedSearchPost]);

  if (isFetching) {
    return <p>Loading</p>;
  }

  if (isError || !user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className={s.root}>
      <div className="container">
        <h1>Home</h1>
        <div className={s.row}>
          <aside className={s.sidebar}>
            <div className={s.nav}>
              <Input
                placeholder="Search users"
                className={s.input}
                value={searchUser}
                onChange={(event) =>
                  setSearchUser(event.target.value.toLowerCase())
                }
              />
            </div>
            {fiteredUsers.map((item) => (
              <UserCard
                title={item.from_name}
                count={item.count}
                key={item.from_id}
                isActive={item.from_id === activeUser}
                onClick={() => setActiveUser(item.from_id)}
              />
            ))}
          </aside>

          <div className={s.cell}>
            <div className={s.nav}>
              <Button
                className={cn(s.button, { [s.active]: sort === 'up' })}
                onClick={() => setSort('up')}
              >
                ↑
              </Button>
              <Button
                className={cn(s.button, { [s.active]: sort === 'down' })}
                onClick={() => setSort('down')}
              >
                ↓
              </Button>
              <Input
                placeholder="Search posts"
                className={s.inputRight}
                value={searchPost}
                onChange={(event) =>
                  setSearchPost(event.target.value.toLowerCase())
                }
              />
            </div>

            {activeUser && fiteredPosts ? (
              <>
                {fiteredPosts.map((item) => (
                  <TextCard
                    date={new Date(item.created_time)}
                    description={item.message}
                    key={item.id}
                  />
                ))}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

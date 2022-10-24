import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import Input from 'components/Input';
import { API_URL, CLIENT_ID } from 'constants/index';
import useLocalStorage from 'hooks/useLocalStorage';
import { LoginType, ResLoginType } from 'types';

import s from './Auth.module.scss';

const Auth = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');

  const [email, setEmail] = useState<string>('');

  const [, setUser] = useLocalStorage<LoginType | null>('user', null);

  const { refetch, isFetching, isError } = useQuery<LoginType>(
    ['user'],
    () =>
      fetch(`${API_URL}/register`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          client_id: CLIENT_ID,
          email: email,
          name: name,
        }),
      })
        .then((res) => res.json())
        .then((resData: ResLoginType) => resData.data),
    {
      enabled: false,
      onSuccess: (data) => {
        setUser(data);
        navigate('/');
      },
    },
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email && name) {
      void refetch();
    }
  };

  const disabledSubmit = !name || !email;

  return (
    <div className={s.root}>
      <section className={s.content}>
        <h1 className={s.title}>Login</h1>
        <form className={s.form} onSubmit={handleSubmit} data-testid="form">
          <label className={s.label}>
            Name
            <Input
              type="text"
              onChange={(event) => setName(event.target.value)}
              value={name}
              // pattern="[a-zA-Z]+"
              disabled={isFetching}
            />
          </label>

          <label className={s.label}>
            Email
            <Input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              disabled={isFetching}
            />
          </label>

          <div className={s.submit}>
            <Button
              type="submit"
              disabled={disabledSubmit || isFetching}
              data-testid="submit"
            >
              GO
            </Button>
          </div>
        </form>
        {isError ? <h5>Error</h5> : null}
      </section>
    </div>
  );
};

export default Auth;

export type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

export type SeriesSearch = {
  movie: {
    id: number;
    countries: {
      name: string | null;
    }[];
    releaseYears: {
      start: string | null;
      end: string | null;
    }[];
    title: {
      russian?: string;
      original: string | null;
    };
    gallery: {
      posters: {
        vertical: {
          avatarsUrl: string;
        };
      };
    };
  };
};

export type PostType = {
  id: string;
  from_name: string;
  from_id: string;
  message: string;
  type: string;
  created_time: string;
};

export type ResPostType = {
  data: {
    meta: {
      equest_id: string;
    };
    posts: PostType[];
  };
};

export type UserType = {
  from_name: string;
  from_id: string;
  count: number;
};

export type LoginType = {
  client_id: string;
  email: string;
  sl_token: string;
};

export type ResLoginType = {
  meta: {
    equest_id: string;
  };
  data: LoginType;
};

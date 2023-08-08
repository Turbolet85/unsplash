import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useAppContext } from '../../app/context';
import styles from './gallery.module.css';

interface SimplifiedData {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  alt_description: string;
}

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const { searchTerm } = useAppContext();

  const response = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      const res = await axios.get(`${url}&query=${searchTerm}`);
      return res.data;
    },
  });
  if (response.isLoading) {
    return (
      <section className={styles.imageContainer}>
        <h4>...Loading</h4>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className={styles.imageContainer}>
        <h4>There was an error...</h4>
      </section>
    );
  }

  const results = response.data.results;

  if (results.length < 1) {
    return (
      <section className={styles.imageContainer}>
        <h4>No results found...</h4>
      </section>
    );
  }

  return (
    <section className={styles.imageContainer}>
      {results.map((item: SimplifiedData) => {
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            alt={item.alt_description}
            key={item.id}
            className={styles.img}
          />
        );
      })}
    </section>
  );
};

export default Gallery;

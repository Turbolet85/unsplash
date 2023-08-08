import React, { useState } from 'react';

import { useAppContext } from '../../app/context';
import styles from './seachForm.module.css';

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('');
  const { setSearchTerm } = useAppContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue) return;
    setSearchTerm(searchValue);
    setSearchValue('');
  };

  return (
    <section>
      <h1 className={'title'}>Unsplash images</h1>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={`form-input ${styles.searchInput}`}
          name={'search'}
          placeholder={'cat'}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type={'submit'} className={`btn ${styles.btn}`}>
          search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;

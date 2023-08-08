import Gallery from '../features/gallery/Gallery';
import SearchForm from '../features/searchForm/SearchForm';
import ThemeToggle from '../features/themeToggle/ThemeToggle';
// import styles from './app.module.css';

const App = () => {
  return (
    <main>
      <ThemeToggle />
      <SearchForm />
      <Gallery />
    </main>
  );
};

export default App;

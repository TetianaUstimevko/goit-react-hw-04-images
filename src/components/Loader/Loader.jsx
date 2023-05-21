import MoonLoader from 'react-spinners/MoonLoader';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <div className={s.overlay}>
      <MoonLoader size={250} color={'#0c3c94de'} className={s.loader} />
    </div>
  );
}
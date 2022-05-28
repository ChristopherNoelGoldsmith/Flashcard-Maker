import styles from './Module.module.css';
import { moduleActions } from '../../store/module';
import { useDispatch } from 'react-redux';
import Card from './Card';

const Module = (props) => {
  const dispatch = useDispatch();
  const hideModule = () => {
    return dispatch(moduleActions.hide());
  };

  return (
    <div
      onClick={hideModule}
      className={`row justify-content-center align-items-center ${
        styles[`${props.className}`]
      } ${styles.module}`}
    >
      <Card className={`row justify-content-center align-items-center`}>
        <p>{props.message}</p>
      </Card>
    </div>
  );
};

export default Module;

import { store } from '../../store';
import styles from './Counter.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { decrement, increment } from './CounterSlice';

function Counter() {
    const dispatch = useDispatch<typeof store.dispatch>();
    const count = useSelector((state: any) => state.counter.value)
    return ( 
        <>
            <div className={styles.row}>
                <button className={styles.button}
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
                <span className={styles.value}>
                    {count}
                </span>

                <button className={styles.button}
                    onClick={() => dispatch((increment()))}
                >
                    +
                </button>
            </div>
        </>
     );
}

export default Counter;
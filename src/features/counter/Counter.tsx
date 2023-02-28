import { store } from '../../store';
import styles from './Counter.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { decrement, increment, incrementAsync, incrementByAmount } from './CounterSlice';
import { useState } from 'react';

function Counter() {
    const dispatch = useDispatch<typeof store.dispatch>();
    const count = useSelector((state: any) => state.counter.value);

    const [incrementAmount, setIncrementAmount] = useState('2');
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

                <div className={styles.row}>
                    <input className={styles.textbox}
                        value={incrementAmount}
                        onChange={(e) => setIncrementAmount(e.target.value)}
                    />
                    <button>
                        <span className={styles.button}
                            onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
                        >
                            Add Amount</span>
                    </button>
                    <button className={styles.button}
                        onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
                    >
                        Add Async
                    </button>
                </div>
            </div>
        </>
     );
}

export default Counter;
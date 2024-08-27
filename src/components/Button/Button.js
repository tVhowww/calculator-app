import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { ACTIONS } from '~/App';

const cx = classNames.bind(styles);

function Button({ operatorBasic, operatorAdvance, special, children, className, dispatch, ...passProps }) {
    const classes = cx('wrapper', {
        [className]: className,
        operatorBasic,
        operatorAdvance,
        special,
    });

    const handleClick = () => {
        if (special) {
            // Handle special button actions
            if (children === '␡') {
                // Handle delete button action
                dispatch({ type: ACTIONS.DELETE_DIGIT });
            } else if (children === 'C') {
                // Handle clear button action
                dispatch({ type: ACTIONS.CLEAR });
            }
        } else if (operatorBasic || operatorAdvance) {
            if (children === '=') {
                dispatch({ type: ACTIONS.EVALUATE });
            }
            // Handle operator button actions
            else {
                dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { children } });
            }
        } else {
            // Handle digit button actions
            dispatch({ type: ACTIONS.ADD_DIGIT, payload: { children } });
        }
    };

    return (
        <button className={classes} {...passProps} onClick={handleClick}>
            {children}
        </button>
    );
}

export default Button;

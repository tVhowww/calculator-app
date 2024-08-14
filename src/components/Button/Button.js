import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ operatorBasic, operatorAdvance, special, children, className, onClick, ...passProps }) {
    const classes = cx('wrapper', {
        [className]: className,
        operatorBasic,
        operatorAdvance,
        special,
    });
    return (
        <button className={classes} {...passProps}>
            {children}
        </button>
    );
}

export default Button;

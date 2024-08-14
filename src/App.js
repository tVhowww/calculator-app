import Button from './components/Button';
import classNames from 'classnames/bind';
import styles from './components/GlobalStyles/GlobalStyles.scss';
const cx = classNames.bind(styles);
function App() {
    return (
        <div className={cx('wrapper')}>
            <h1 style={{ color: 'red' }}>Calculator App</h1>
            <div className="calculator-app">
                <div id="status-container" className={cx('section', 'group')}>
                    <div id="status" className={cx('col', 'span-5-of-5')}>
                        1666
                    </div>
                </div>
                <div id="display-container" className={cx('section', 'group')}>
                    <div
                        id="display"
                        className={cx('col', 'span-5-of-5')}
                        contentEditable="true"
                        suppressContentEditableWarning={true}
                    >
                        999
                    </div>
                </div>
                <div id="button-container">
                    <div className={cx('section', 'group')}>
                        <Button className={cx('col', 'span-1-of-5')}>(</Button>
                        <Button className={cx('col', 'span-1-of-5')}>)</Button>
                        <Button special className={cx('col', 'span-1-of-5', 'delete-btn')}>
                            ␡
                        </Button>
                        <Button operatorAdvance className={cx('col', 'span-1-of-5')}>
                            ₓ²
                        </Button>
                        <Button operatorAdvance className={cx('col', 'span-1-of-5')}>
                            ⅟ₓ
                        </Button>
                    </div>
                    <div className={cx('section', 'group')}>
                        <Button className={cx('col', 'span-1-of-5')}>7</Button>
                        <Button className={cx('col', 'span-1-of-5')}>8</Button>
                        <Button className={cx('col', 'span-1-of-5')}>9</Button>
                        <Button operatorBasic className={cx('col', 'span-1-of-5')}>
                            ÷
                        </Button>
                        <Button operatorAdvance className={cx('col', 'span-1-of-5')}>
                            ±
                        </Button>
                    </div>
                    <div className={cx('section', 'group')}>
                        <Button className={cx('col', 'span-1-of-5')}>4</Button>
                        <Button className={cx('col', 'span-1-of-5')}>5</Button>
                        <Button className={cx('col', 'span-1-of-5')}>6</Button>
                        <Button operatorBasic className={cx('col', 'span-1-of-5')}>
                            ×
                        </Button>
                        <Button operatorAdvance className={cx('col', 'span-1-of-5')}>
                            √
                        </Button>
                    </div>
                    <div className={cx('section', 'group')}>
                        <Button className={cx('col', 'span-1-of-5')}>1</Button>
                        <Button className={cx('col', 'span-1-of-5')}>2</Button>
                        <Button className={cx('col', 'span-1-of-5')}>3</Button>
                        <Button operatorBasic className={cx('col', 'span-1-of-5')}>
                            -
                        </Button>
                        <Button operatorBasic className={cx('col', 'span-1-of-5')}>
                            %
                        </Button>
                    </div>
                    <div className={cx('section', 'group')}>
                        <Button className={cx('col', 'span-1-of-5')}>0</Button>
                        <Button className={cx('col', 'span-1-of-5')}>.</Button>
                        <Button special className={cx('col', 'span-1-of-5')}>
                            C
                        </Button>
                        <Button operatorBasic className={cx('col', 'span-1-of-5')}>
                            +
                        </Button>
                        <Button operatorBasic className={cx('col', 'span-1-of-5')}>
                            =
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

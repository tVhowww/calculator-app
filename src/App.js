import { useReducer } from 'react';
import classNames from 'classnames/bind';
import Button from './components/Button';
import styles from './components/GlobalStyles/GlobalStyles.scss';

const cx = classNames.bind(styles);

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate',
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (payload.children === '0' && state.currOperand === '0') {
                return state;
            }

            if (state.currOperand === '0' && payload.children === '.') {
                return {
                    ...state,
                    currOperand: `0${payload.children}`,
                };
            }

            if (state.currOperand === '0' && payload.children !== '0') {
                return {
                    ...state,
                    currOperand: payload.children,
                };
            }

            if (payload.children === '.' && !state.currOperand) {
                return {
                    ...state,
                    currOperand: `0${payload.children}`,
                };
            }
            if (payload.children === '.' && state.currOperand.includes('.')) {
                return state;
            }

            return {
                ...state,
                currOperand: `${state.currOperand || ''}${payload.children}`,
            };
        case ACTIONS.CHOOSE_OPERATION:
            if (state.prevOperand == null) {
                return {
                    ...state,
                    currOperand: null,
                    prevOperand: state.currOperand || '0',
                    operation: payload.children,
                };
            }

            if (state.prevOperand.slice(-1) === '=') {
                return {
                    ...state,
                    prevOperand: state.result,
                    operation: payload.children,
                };
            }

            if (state.currOperand == null) {
                return {
                    ...state,
                    operation: payload.children,
                };
            }

            return {
                ...state,
                prevOperand: state.prevOperand + state.operation + state.currOperand,
                operation: payload.children,
                currOperand: null,
                result: evaluate(state),
            };
        case ACTIONS.CLEAR:
            return {};
        case ACTIONS.DELETE_DIGIT:
            if (state.currOperand == null) {
                return state;
            }

            if (state.currOperand.length === 1) {
                return {
                    ...state,
                    currOperand: '0',
                };
            }

            return {
                ...state,
                currOperand: state.currOperand.slice(0, -1),
            };
        case ACTIONS.EVALUATE:
            if (state.currOperand == null && state.prevOperand == null) {
                return state;
            }

            if (state.operation && !state.currOperand) {
                state.currOperand = evaluate(state);
            }

            if (state.prevOperand.slice(-1) === '=') {
                return state;
            }

            return {
                ...state,
                prevOperand: state.prevOperand + state.operation + state.currOperand + '=',
                operation: null,
                currOperand: null,
                result: evaluate(state),
            };

        default:
            throw new Error('Invalid action');
    }
};

const evaluate = ({ currOperand, prevOperand, operation, result }) => {
    let expression = result != null ? result : prevOperand;

    if (currOperand != null) {
        expression += operation + currOperand;
    }

    expression = expression.replace(/--/g, '+').replace(/×/g, '*').replace(/÷/g, '/');

    try {
        const newResult = eval(expression);

        if (newResult === Infinity) {
            return 'Cannot divide by 0';
        }

        if (Number.isInteger(newResult)) {
            return newResult.toString();
        }

        return parseFloat(newResult.toPrecision(12)).toString();
    } catch (error) {
        return 'Error';
    }
};

function App() {
    const [{ currOperand = '0', prevOperand, operation, result }, dispatch] = useReducer(reducer, {});

    return (
        <div className={cx('wrapper')}>
            <h1 style={{ color: 'red' }}>Calculator App</h1>
            <div className="calculator-app">
                <div id="status-container" className={cx('section', 'group')}>
                    <div id="status" className={cx('col', 'span-5-of-5')}>
                        {prevOperand}
                        {operation}
                    </div>
                </div>
                <div id="display-container" className={cx('section', 'group')}>
                    <input id="display" className={cx('col', 'span-5-of-5')} value={currOperand || result} />
                </div>
                <div id="button-container">
                    <div className={cx('section', 'group')}>
                        <Button dispatch={dispatch} className={cx('col', 'span-1-of-5')}>
                            (
                        </Button>
                        <Button dispatch={dispatch} className={cx('col', 'span-1-of-5')}>
                            )
                        </Button>
                        <Button dispatch={dispatch} special className={cx('col', 'span-1-of-5', 'delete-btn')}>
                            ␡
                        </Button>
                        <Button dispatch={dispatch} operatorAdvance className={cx('col', 'span-1-of-5')}>
                            ₓ²
                        </Button>
                        <Button dispatch={dispatch} operatorAdvance className={cx('col', 'span-1-of-5')}>
                            ⅟ₓ
                        </Button>
                    </div>
                    <div className={cx('section', 'group')}>
                        <Button dispatch={dispatch} className={cx('col', 'span-1-of-5')}>
                            7
                        </Button>
                        <Button dispatch={dispatch} className={cx('col', 'span-1-of-5')}>
                            8
                        </Button>
                        <Button dispatch={dispatch} className={cx('col', 'span-1-of-5')}>
                            9
                        </Button>
                        <Button dispatch={dispatch} operatorBasic className={cx('col', 'span-1-of-5')}>
                            ÷
                        </Button>
                        <Button dispatch={dispatch} operatorAdvance className={cx('col', 'span-1-of-5')}>
                            ±
                        </Button>
                    </div>
                    <div className={cx('section', 'group')}>
                        <Button dispatch={dispatch} className={cx('col', 'span-1-of-5')}>
                            4
                        </Button>
                        <Button dispatch={dispatch} className={cx('col', 'span-1-of-5')}>
                            5
                        </Button>
                        <Button dispatch={dispatch} className={cx('col', 'span-1-of-5')}>
                            6
                        </Button>
                        <Button dispatch={dispatch} operatorBasic className={cx('col', 'span-1-of-5')}>
                            ×
                        </Button>
                        <Button dispatch={dispatch} operatorAdvance className={cx('col', 'span-1-of-5')}>
                            √
                        </Button>
                    </div>
                    <div className={cx('section', 'group')}>
                        <Button dispatch={dispatch} className={cx('col', 'span-1-of-5')}>
                            1
                        </Button>
                        <Button dispatch={dispatch} className={cx('col', 'span-1-of-5')}>
                            2
                        </Button>
                        <Button dispatch={dispatch} className={cx('col', 'span-1-of-5')}>
                            3
                        </Button>
                        <Button dispatch={dispatch} operatorBasic className={cx('col', 'span-1-of-5')}>
                            -
                        </Button>
                        <Button dispatch={dispatch} operatorBasic className={cx('col', 'span-1-of-5')}>
                            %
                        </Button>
                    </div>
                    <div className={cx('section', 'group')}>
                        <Button dispatch={dispatch} className={cx('col', 'span-1-of-5')}>
                            0
                        </Button>
                        <Button dispatch={dispatch} className={cx('col', 'span-1-of-5')}>
                            .
                        </Button>
                        <Button dispatch={dispatch} special className={cx('col', 'span-1-of-5')}>
                            C
                        </Button>
                        <Button dispatch={dispatch} operatorBasic className={cx('col', 'span-1-of-5')}>
                            +
                        </Button>
                        <Button dispatch={dispatch} operatorBasic className={cx('col', 'span-1-of-5')}>
                            =
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

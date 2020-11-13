import { renderComponent } from '../react-dom/diff'

const setStateQueue = []; // 保存组件stateChange的队列
const renderQueue = []; // 保存

// 异步执行
function defer(fn) {
    return Promise.resolve().then(fn);
};

// 用一个队列来保存每次的setState
export function enqueueSetState(stateChange, component) {
    // 第一次setState的时候
    if (setStateQueue.length === 0) {
        defer(flush);
    };
    // 把组件和组件这一次的setState入队列
    setStateQueue.push({
        stateChange,
        component
    });

    if (!renderQueue.some(item => item === component)) {
        renderQueue.push(component);
    };
};
// 清空队列并渲染组件
// stateChange1---component
// stateChange2---component
// stateChange3---component
// setState出队列，component出队列，更新component上的state/如果是函数的话（解决异步导致view更新了视觉上数据还没更新）还更新setState

function flush() {
    let item, component;
    // 遍历保存了组件setState的队列
    while(item = setStateQueue.shift()) { // 出队列
        const { stateChange, component } = item; // 组件改变的state和组件实例

        // 如果没有prevState，则将当前的state作为初始的prevState
        if (!component.prevState) {
            component.prevState = Object.assign({}, component.state);
        };

        // 如果stateChange是一个方法，也就是setState的第二种形式解决因为异步导致的视觉上没有直接更新数据
        if (typeof stateChange === 'function') {
            Object.assign(component.state, stateChange(component.prevState, component.props));
        } else {
            // 如果stateChange是一个对象，则直接合并到setState中
            Object.assign(component.state, stateChange);
        };

        component.prevState = component.state;
    };

    // 组件队列中的组件出队列
    while(component = renderQueue.shift()) {
        renderComponent(component);
    };
};
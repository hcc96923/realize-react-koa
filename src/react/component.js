import { enqueueSetState } from './set-state-queue'
;
class Component {
    // 通过继承React.Component的props和state。子组件拥有了自己私有的state，同时可以通过this.props获取父组件传入的数据
    // 所以在Component类中初始化state和props
    constructor(props = {}) {
        this.state = {};
        this.props = props;
    }
    // 组件通过调用继承自Component的setState来触发组件的更新
    setState(stateChange) {
        // Object.assign( this.state, stateChange );
        // renderComponent( this );
        
        // 对setState的异步优化
        // this当前类的实例
        enqueueSetState( stateChange, this );
    }
}
export default Component;
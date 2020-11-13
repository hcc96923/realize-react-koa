/* 
    createElement方法会将JSX代码转译为一个对象
    tag标签名
    attrs一个包含了所有属性的对象
    children所有子节点的对象
*/
/**
 * @example
 * <h1> hello world </h1>
 * 可以通过jsx被转化为
 * createElement('h1', {id: 'greet'}, 'hello world')
 */
function createElement (tag, attrs, ...children) {
    attrs = attrs || {};
    return {
        tag,
        attrs,
        children,
        key: attrs.key || null
    }
};

export default createElement;
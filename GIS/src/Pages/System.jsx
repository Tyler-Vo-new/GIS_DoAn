import React from 'react';
import { Handle } from 'reactflow';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';


const CustomNode = ({ data }) => {
    return (
        <div
            style={{
                padding: 10,
                border: '1px solid #ddd',
                borderRadius: 5,
                background: '#fff',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                cursor: 'pointer',
            }}
            title={`Thông tin: ${data.label}`} // Tooltip khi hover
            onClick={() => alert(`Bạn vừa click vào: ${data.label}`)}
        >
            ⚙️ {data.label}
            <Handle type="source" position="bottom" />
            <Handle type="target" position="top" />
        </div>
    );
};


const nodeTypes = {
    custom: CustomNode,
};

const nodes = [
    { id: 'P101', data: { label: 'P101' }, position: { x: 50, y: 50 }, type: 'custom' },
    { id: 'P102', data: { label: 'P102' }, position: { x: 200, y: 50 }, type: 'custom' },
    { id: 'electric', data: { label: '⚡ Điện' }, position: { x: 125, y: 200 }, type: 'custom' },
];

const edges = [
    { id: 'e1', source: 'electric', target: 'P101', animated: true, style: { stroke: 'red' } },
    { id: 'e2', source: 'electric', target: 'P102', animated: true, style: { stroke: 'green' } },
];

const System = () => {
    return (
        <div style={{ height: 400 }}>
            <h3>Sơ đồ Hệ thống</h3>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
                <Background />
            </ReactFlow>
        </div>
    );
};

export default System;

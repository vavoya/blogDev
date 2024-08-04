import React from 'react';

const ModalLoader = () => (
    <div style={{
        position: "fixed",
        zIndex: "9999",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <span style={{
            fontSize: '2rem',
            color: 'white'
        }}>
            불러오는 중...
        </span>
    </div>
);

export default ModalLoader;

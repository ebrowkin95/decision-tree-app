import React from 'react';
import { DecisionTree } from './components/DecisionTree';

export default function App() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', backgroundColor: '#000', margin:0, padding:0 }}>
            <DecisionTree />
        </div>
    );
}
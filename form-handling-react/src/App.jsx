import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm.jsx';
import FormikForm from './components/formikForm.js';

export default function App() {
  const [mode, setMode] = useState('controlled'); // 'controlled' | 'formik'
  return (
    <div>
      <div style={{ maxWidth: 420, margin: '1rem auto', display: 'flex', gap: 8 }}>
        <button onClick={() => setMode('controlled')}>Controlled</button>
        <button onClick={() => setMode('formik')}>Formik</button>
      </div>
      {mode === 'controlled' ? <RegistrationForm /> : <FormikForm />}
    </div>
  );
}

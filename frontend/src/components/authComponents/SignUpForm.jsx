import { useState } from 'react';
import axios from 'axios';

function SignUpForm() {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });




}
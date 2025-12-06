import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, ArrowRight, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const email = location.state?.email;

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        if (!email) {
            navigate('/signup');
            return;
        }

        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [email, navigate]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        const newOtp = pastedData.split('');
        setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');

        if (otpString.length !== 6) {
            toast.error('Please enter complete OTP');
            return;
        }

        setLoading(true);

        try {
            const response = await authService.verifyOTP({ email, otp: otpString });

            login(response.data.token, response.data.user);
            toast.success('Email verified successfully! 🎉');
            navigate('/dashboard');
        } catch (error) {
            const message = error.response?.data?.message || 'OTP verification failed';
            toast.error(message);
            setOtp(['', '', '', '', '', '']);
            document.getElementById('otp-0').focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setResending(true);

        try {
            await authService.resendOTP(email);
            toast.success('OTP sent to your email');
            setTimer(60);
            setOtp(['', '', '', '', '', '']);
            document.getElementById('otp-0').focus();
        } catch (error) {
            toast.error('Failed to resend OTP');
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">


            {/* Animated Background */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 dark:bg-green-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                <div className="card">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                            Verify Email
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                            Enter the 6-digit code sent to
                        </p>
                        <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                            {email}
                        </p>
                    </div>

                    {/* OTP Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-center gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 h-14 text-center text-2xl font-bold bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                                    required
                                />
                            ))}
                        </div>

                        {/* Timer */}
                        <div className="text-center">
                            {timer > 0 ? (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Resend OTP in <span className="font-semibold text-primary-600">{timer}s</span>
                                </p>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResendOTP}
                                    disabled={resending}
                                    className="text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 flex items-center gap-2 mx-auto transition-colors disabled:opacity-50"
                                >
                                    <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
                                    Resend OTP
                                </button>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader />
                            ) : (
                                <>
                                    <span>Verify & Continue</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;

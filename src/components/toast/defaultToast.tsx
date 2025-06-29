import { ToastContainer } from 'react-toastify';

const DefaultToast = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={2000}
            limit={5}
            hideProgressBar={false}
            newestOnTop
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            theme="dark"
        />
    );
}

export default DefaultToast